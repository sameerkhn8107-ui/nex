import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { NexBrandLogo } from "@/components/NexLogo";

export default function PrivacyPage() {
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
              Privacy Policy
            </CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: January 2025</p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-auto">
              <div className="prose prose-sm prose-invert max-w-none space-y-6 text-muted-foreground">
                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">1. Introduction</h3>
                  <p className="leading-relaxed">
                    Welcome to Nex.Ai. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your information when you use our service.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">2. Information We Collect</h3>
                  <p className="leading-relaxed">For guest users, we collect minimal information:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong className="text-foreground">Session Data:</strong> Temporary data stored in your browser session storage</li>
                    <li><strong className="text-foreground">Conversation Content:</strong> Messages exchanged during your session (not stored on our servers)</li>
                    <li><strong className="text-foreground">Usage Data:</strong> Basic analytics about how you interact with the service</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">3. How We Use Your Information</h3>
                  <p className="leading-relaxed">We use the information we collect to:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Provide and maintain our service</li>
                    <li>Improve and personalize user experience</li>
                    <li>Analyze usage patterns to enhance functionality</li>
                    <li>Ensure the security of our service</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">4. Data Storage and Security</h3>
                  <p className="leading-relaxed">
                    Guest session data is stored locally in your browser and is automatically cleared when you close your browser or end your session. We do not permanently store conversation data for guest users on our servers.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">5. Data Sharing</h3>
                  <p className="leading-relaxed">
                    We do not sell, trade, or otherwise transfer your information to third parties. We may share aggregated, anonymized data for analytical purposes, but this data cannot be used to identify individual users.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">6. Cookies and Tracking</h3>
                  <p className="leading-relaxed">
                    We use session storage to maintain your guest session. We do not use tracking cookies or third-party analytics that track individual users across websites.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">7. Your Rights</h3>
                  <p className="leading-relaxed">You have the right to:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Access information about what data we collect</li>
                    <li>Clear your session data at any time by closing your browser</li>
                    <li>Request information about our data practices</li>
                    <li>Opt out of any data collection by not using the service</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">8. Children&apos;s Privacy</h3>
                  <p className="leading-relaxed">
                    Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">9. Changes to This Policy</h3>
                  <p className="leading-relaxed">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page with an updated revision date.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">10. Contact Us</h3>
                  <p className="leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us through the service interface or the contact information provided on our website.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Footer links */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
          <span className="mx-2">•</span>
          <Link to="/" className="text-primary hover:underline">Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
