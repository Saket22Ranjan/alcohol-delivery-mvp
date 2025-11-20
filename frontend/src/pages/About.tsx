import { Card } from "@/components/ui/card";
import { Shield, Users, Code, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Liquor Lane</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building the future of compliant alcohol delivery
          </p>
        </div>

        <Card className="p-8 bg-gradient-card border-border/50 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Liquor Lane is a verified alcohol delivery platform designed to ensure compliance, safety, and convenience for all users. We connect consumers with local liquor stores while maintaining the highest standards of age verification and regulatory compliance.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to modernize alcohol retail by leveraging technology to create a seamless, secure, and responsible delivery experience that benefits both consumers and retailers.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Compliance First</h3>
            <p className="text-sm text-muted-foreground">
              Multi-layer age verification with human review ensures we meet and exceed all regulatory requirements for alcohol delivery.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">User-Centric Design</h3>
            <p className="text-sm text-muted-foreground">
              We prioritize user experience with intuitive interfaces, multiple authentication options, and seamless checkout flows.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Modern Technology</h3>
            <p className="text-sm text-muted-foreground">
              Built with React, TypeScript, and Node.js, our platform leverages cutting-edge web technologies for performance and reliability.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Fast & Reliable</h3>
            <p className="text-sm text-muted-foreground">
              Optimized delivery routes, real-time tracking, and partnerships with trusted local stores ensure quick and reliable service.
            </p>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-card border-border/50">
          <h2 className="text-2xl font-bold text-foreground mb-4">System Architecture</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-bold text-foreground mb-2">Frontend</h3>
              <p className="text-sm">
                React with TypeScript, Tailwind CSS for styling, React Router for navigation, and state management for seamless user experience.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Backend</h3>
              <p className="text-sm">
                Node.js with Express, PostgreSQL database, Redis for caching, and JWT-based authentication with secure session management.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Verification Pipeline</h3>
              <p className="text-sm">
                Multi-step verification with automated age checks, secure ID storage with encryption, human review workflows, and compliance logging.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Security</h3>
              <p className="text-sm">
                End-to-end encryption, secure API endpoints, rate limiting, and comprehensive audit trails for all verification activities.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
