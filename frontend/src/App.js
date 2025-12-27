import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "@/pages/LoginPage";
import ChatPage from "@/pages/ChatPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import "@/App.css";

function App() {
  // Initialize state from sessionStorage
  const [isGuest, setIsGuest] = useState(() => {
    return sessionStorage.getItem('nex-ai-guest') === 'true';
  });

  const handleGuestLogin = () => {
    sessionStorage.setItem('nex-ai-guest', 'true');
    setIsGuest(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('nex-ai-guest');
    setIsGuest(false);
  };

  return (
    <div className="dark min-h-screen bg-background">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              isGuest ? 
                <Navigate to="/chat" replace /> : 
                <LoginPage onGuestLogin={handleGuestLogin} />
            } 
          />
          <Route 
            path="/chat" 
            element={
              isGuest ? 
                <ChatPage onLogout={handleLogout} /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
