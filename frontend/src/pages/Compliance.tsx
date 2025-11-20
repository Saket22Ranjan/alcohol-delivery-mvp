import { Card } from "@/components/ui/card";
import { Shield, FileCheck, Lock, AlertTriangle } from "lucide-react";

export default function Compliance() {
  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Compliance & <span className="bg-gradient-primary bg-clip-text text-transparent">Safety</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our commitment to responsible alcohol delivery
          </p>
        </div>

        <Card className="p-8 bg-gradient-card border-border/50 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Age Verification</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every user must complete a comprehensive age verification process before making purchases. We verify that all users are 21 years or older through automated age checks and manual ID review by trained staff.
              </p>
            </div>
          </div>

          <div className="space-y-4 ml-16 text-muted-foreground">
            <div>
              <h3 className="font-bold text-foreground mb-2">Step 1: Date of Birth Verification</h3>
              <p className="text-sm">
                Users provide their date of birth which is instantly validated against legal drinking age requirements. Users under 21 are immediately blocked from proceeding.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Step 2: Government ID Upload</h3>
              <p className="text-sm">
                Users securely upload a photo of their government-issued ID (driver's license, passport, state ID, or military ID). All uploads are encrypted and stored securely.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Step 3: Human Review</h3>
              <p className="text-sm">
                Trained verification specialists manually review each ID submission to confirm authenticity, verify age, and detect fraudulent documents. This typically takes 1-2 business days.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-card border-border/50 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Regulatory Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                Liquor Lane operates in full compliance with federal and state alcohol delivery regulations, including ABC (Alcoholic Beverage Control) laws and e-commerce alcohol sales guidelines.
              </p>
            </div>
          </div>

          <div className="space-y-3 ml-16">
            {[
              "Licensed delivery partners with proper alcohol transportation permits",
              "Real-time compliance monitoring and audit trails",
              "Strict adherence to delivery time restrictions",
              "Age verification at point of delivery (ID check by driver)",
              "Clear labeling and packaging requirements",
              "Prohibition of sales to visibly intoxicated individuals",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 bg-gradient-card border-border/50 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Data Security & Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take the security and privacy of your personal information seriously. All ID documents and personal data are protected with industry-standard security measures.
              </p>
            </div>
          </div>

          <div className="space-y-3 ml-16">
            {[
              "End-to-end encryption for all sensitive data transmission",
              "Secure cloud storage with redundant backups",
              "Access controls and audit logging for all ID reviews",
              "Compliance with GDPR, CCPA, and other privacy regulations",
              "Regular security audits and penetration testing",
              "Data retention policies with automatic purging of old records",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 bg-destructive/10 border-destructive/20">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-foreground mb-2">Zero Tolerance Policy</h3>
              <p className="text-sm text-muted-foreground">
                We maintain a zero-tolerance policy for underage alcohol sales. Any attempt to circumvent our verification process results in immediate account termination and may be reported to law enforcement. We work closely with regulatory authorities to ensure the safety and legality of our platform.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
