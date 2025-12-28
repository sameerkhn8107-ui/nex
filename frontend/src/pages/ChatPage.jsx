import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { NexLogo, NexBrandLogo } from "@/components/NexLogo";
import { 
  Send, 
  Plus, 
  Trash2, 
  LogOut, 
  Menu, 
  X, 
  User, 
  Bot,
  MessageSquare,
  FileText,
  Shield
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function ChatPage({ onLogout }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState([{ id: 1, title: "New Chat", active: true }]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getAIResponse = async (conversationHistory) => {
    setIsTyping(true);
    
    try {
      const response = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          model: 'gpt-4o-mini'
        }),
      });

   const data = await response.json(); 


if (!response.ok) {
  throw new Error(data?.detail || "Failed to get AI response");
}
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: "assistant",
        content: data.content,
        timestamp: new Date()
      }]);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error(error.message || 'Failed to get AI response. Please try again.');
      
      // Add error message to chat
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: "assistant",
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isTyping) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmedInput,
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    
    // Update conversation title if first message
    if (messages.length === 0) {
      const title = trimmedInput.length > 30 
        ? trimmedInput.substring(0, 30) + "..." 
        : trimmedInput;
      setConversations(prev => prev.map(c => 
        c.active ? { ...c, title } : c
      ));
    }
    
    // Get AI response
    await getAIResponse(newMessages);
  };

  const handleSuggestionClick = async (suggestion) => {
    if (isTyping) return;
    
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: suggestion,
      timestamp: new Date()
    };
    
    const newMessages = [userMessage];
    setMessages(newMessages);
    
    // Update conversation title
    const title = suggestion.length > 30 
      ? suggestion.substring(0, 30) + "..." 
      : suggestion;
    setConversations(prev => prev.map(c => 
      c.active ? { ...c, title } : c
    ));
    
    // Get AI response
    await getAIResponse(newMessages);
  };

  const handleNewChat = () => {
    const newConv = {
      id: Date.now(),
      title: "New Chat",
      active: true
    };
    setConversations(prev => [
      newConv,
      ...prev.map(c => ({ ...c, active: false }))
    ]);
    setMessages([]);
    setSidebarOpen(false);
    toast.success("New conversation started");
  };

  const handleClearChat = () => {
    setMessages([]);
    setConversations(prev => prev.map(c => 
      c.active ? { ...c, title: "New Chat" } : c
    ));
    toast.success("Chat cleared");
  };

  const handleLogout = () => {
    onLogout();
    toast.success("Logged out successfully");
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-72 bg-card border-r border-border
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar header with Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <Link to="/">
              <NexBrandLogo size={32} className="hover:opacity-90 transition-opacity" />
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* New chat button */}
        <div className="p-3">
          <Button 
            onClick={handleNewChat}
            className="w-full justify-start gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        {/* Conversations list */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 pb-4">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className={`
                  w-full text-left px-3 py-2.5 rounded-lg text-sm
                  flex items-center gap-2 transition-colors
                  ${conv.active 
                    ? 'bg-primary/10 text-foreground' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }
                `}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span className="truncate">{conv.title}</span>
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Sidebar footer */}
        <div className="p-3 border-t border-border space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={handleClearChat}
          >
            <Trash2 className="w-4 h-4" />
            Clear Chat
          </Button>
          <Link to="/terms">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            >
              <FileText className="w-4 h-4" />
              Terms & Conditions
            </Button>
          </Link>
          <Link to="/privacy">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            >
              <Shield className="w-4 h-4" />
              Privacy Policy
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header with Logo */}
        <header className="h-14 border-b border-border flex items-center px-4 gap-3 bg-card/50">
          <Button 
            variant="ghost" 
            size="icon"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="lg:hidden">
              <NexLogo size={28} />
            </div>
            <h1 className="font-heading font-medium text-foreground">
              {conversations.find(c => c.active)?.title || "New Chat"}
            </h1>
          </div>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div className="max-w-3xl mx-auto p-4 space-y-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-border p-4 bg-card/30">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message Nex.Ai..."
                disabled={isTyping}
                className="pr-12 h-12 bg-secondary border-border/50 focus:border-primary/50 rounded-xl text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-1.5 h-9 w-9 rounded-lg gradient-brand text-primary-foreground disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Nex.Ai can make mistakes. Consider checking important information.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

// Empty state component
function EmptyState({ onSuggestionClick }) {
  const suggestions = [
    "Explain quantum computing in simple terms",
    "Write a haiku about programming",
    "What are the best practices for React?",
    "Help me brainstorm business ideas"
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-20 h-20 flex items-center justify-center animate-pulse-glow">
          <NexLogo size={80} />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
            How can I help you today?
          </h2>
          <p className="text-muted-foreground">
            Start a conversation or try one of these suggestions
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="p-3 text-left text-sm bg-secondary hover:bg-secondary/80 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Message bubble component
function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 animate-fade-in-up ${isUser ? 'flex-row-reverse' : ''}`}>
      <Avatar className={`w-8 h-8 shrink-0 ${isUser ? 'bg-secondary' : ''}`}>
        {isUser ? (
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="w-4 h-4" />
          </AvatarFallback>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <NexLogo size={32} />
          </div>
        )}
      </Avatar>
      <div className={`
        max-w-[80%] rounded-2xl px-4 py-3
        ${isUser 
          ? 'surface-message-user text-foreground' 
          : 'surface-message-ai text-foreground'
        }
        ${message.isError ? 'border border-destructive/30' : ''}
      `}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
}

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in-up">
      <Avatar className="w-8 h-8 shrink-0">
        <div className="w-full h-full flex items-center justify-center">
          <NexLogo size={32} />
        </div>
      </Avatar>
      <div className="surface-message-ai rounded-2xl px-4 py-3">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce-dot" />
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce-dot animation-delay-200" />
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce-dot animation-delay-400" />
        </div>
      </div>
    </div>
  );
}
