from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging first
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# OpenAI API configuration
# Set OPENAI_API_KEY in .env file with your OpenAI API key
# e.g., OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')
OPENAI_API_URL = os.environ.get('OPENAI_API_URL', 'https://api.openai.com/v1/chat/completions')

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Chat models
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: str = "gpt-4o-mini"

class ChatResponse(BaseModel):
    content: str
    role: str = "assistant"

# Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/chat", response_model=ChatResponse)
async def chat_completion(request: ChatRequest):
    """Send a message to OpenAI and get a response"""
    
    if not OPENAI_API_KEY:
        raise HTTPException(
            status_code=500, 
            detail="OpenAI API key not configured. Please set OPENAI_API_KEY environment variable."
        )
    
    try:
        # Prepare messages for OpenAI API
        messages = [
            {"role": "system", "content": "You are Nex.Ai, a helpful, friendly, and knowledgeable AI assistant. Provide clear, concise, and accurate responses. Be conversational but professional."}
        ]
        
        # Add conversation history
        for msg in request.messages:
            messages.append({"role": msg.role, "content": msg.content})
        
        logger.info(f"Sending chat request with model: {request.model}")
        
        # Call OpenAI API
        async with httpx.AsyncClient(timeout=60.0) as http_client:
            response = await http_client.post(
                OPENAI_API_URL,
                headers={
                    "Authorization": f"Bearer {OPENAI_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": request.model,
                    "messages": messages,
                    "max_tokens": 1024,
                    "temperature": 0.7
                }
            )
            
            logger.info(f"Response status: {response.status_code}")
            
            if response.status_code != 200:
                error_text = response.text
                logger.error(f"API error response: {error_text}")
                try:
                    error_json = response.json()
                    error_detail = error_json.get("error", {}).get("message", error_text)
                except:
                    error_detail = error_text
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"AI service error: {error_detail}"
                )
            
            result = response.json()
            assistant_message = result["choices"][0]["message"]["content"]
            logger.info("Chat completion successful")
            
            return ChatResponse(content=assistant_message)
            
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request to AI service timed out")
    except httpx.RequestError as e:
        logger.error(f"Request error: {str(e)}")
        raise HTTPException(status_code=502, detail=f"Error connecting to AI service: {str(e)}")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Chat completion error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
