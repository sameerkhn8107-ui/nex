import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { NexBrandLogo } from "@/components/NexLogo";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/">
            <NexBrandLogo size={32} className="hover:opacity-90 transition-opacity" />
          </Link>
          <Link to="/">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-heading text-2xl text-foreground">
              Terms and Conditions
            </CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: January 2025</p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-auto">
              <div className="prose prose-sm prose-invert max-w-none space-y-6 text-muted-foreground">
                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">1. Acceptance of Terms</h3>
                  <p className="leading-relaxed">
                    By accessing and using Nex.Ai, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">2. Description of Service</h3>
                  <p className="leading-relaxed">
                    Nex.Ai provides an AI-powered conversational interface for informational and assistance purposes. The service is provided &quot;as is&quot; and we make no warranties regarding the accuracy, completeness, or reliability of any information provided.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">3. User Conduct</h3>
                  <p className="leading-relaxed">You agree not to use the service to:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Generate harmful, illegal, or inappropriate content</li>
                    <li>Attempt to circumvent any security measures</li>
                    <li>Impersonate others or misrepresent your affiliation</li>
                    <li>Interfere with the proper functioning of the service</li>
                    <li>Use the service for any unlawful purpose</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">4. Guest Sessions</h3>
                  <p className="leading-relaxed">
                    Guest sessions are temporary and all data associated with your session will be cleared when you close your browser or end your session. We do not store conversation history for guest users.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">5. Intellectual Property</h3>
                  <p className="leading-relaxed">
                    The Nex.Ai service, including its original content, features, and functionality, is owned by Nex.Ai and is protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">6. Disclaimer</h3>
                  <p className="leading-relaxed">
                    The information provided by Nex.Ai is for general informational purposes only. All information is provided in good faith, however, we make no representation or warranty of any kind regarding the accuracy, validity, or completeness of any information.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">7. Limitation of Liability</h3>
                  <p className="leading-relaxed">
                    In no event shall Nex.Ai be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or goodwill.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">8. Changes to Terms</h3>
                  <p className="leading-relaxed">
                    We reserve the right to modify or replace these terms at any time. It is your responsibility to review these terms periodically. Your continued use of the service following any changes constitutes acceptance of those changes.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">9. Contact Information</h3>
                  <p className="leading-relaxed">
                    If you have any questions about these Terms and Conditions, please contact us through the service interface.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Footer links */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          <span className="mx-2">•</span>
          <Link to="/" className="text-primary hover:underline">Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
