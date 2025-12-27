import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Bot } from "lucide-react";
import { NexLogo, NexBrandLogo } from "@/components/NexLogo";

export default function LoginPage({ onGuestLogin }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestContinue = async () => {
    setIsLoading(true);
    // Simulate brief loading for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    onGuestLogin();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Header with Logo */}
      <header className="relative z-10 p-6">
        <Link to="/" className="inline-block">
          <NexBrandLogo size={36} className="hover:opacity-90 transition-opacity" />
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                <NexLogo size={80} />
              </div>
              <CardTitle className="font-heading text-2xl text-foreground">
                Welcome to Nex.Ai
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base mt-2">
                Your intelligent AI assistant, ready to help with anything
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-4">
              {/* Features list */}
              <div className="space-y-3">
                <FeatureItem 
                  icon={<Zap className="w-4 h-4" />}
                  text="Instant, intelligent responses"
                />
                <FeatureItem 
                  icon={<Shield className="w-4 h-4" />}
                  text="Private & secure conversations"
                />
                <FeatureItem 
                  icon={<Bot className="w-4 h-4" />}
                  text="Powered by OpenAI GPT"
                />
              </div>

              {/* Guest button */}
              <Button 
                onClick={handleGuestContinue}
                disabled={isLoading}
                className="w-full h-12 gradient-brand text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity glow-primary-soft"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Starting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Continue as Guest
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              {/* Info text */}
              <p className="text-xs text-muted-foreground text-center">
                No account needed. Your session data is temporary and will be cleared when you close the browser.
              </p>
            </CardContent>
          </Card>

          {/* Legal links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms
              </Link>
              {" "}and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );
}
