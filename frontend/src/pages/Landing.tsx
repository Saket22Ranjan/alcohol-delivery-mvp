import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Clock,
  AlertTriangle,
  UserX,
  TrendingUp,
  Users,
  Smartphone,
  BadgeCheck,
  CheckCircle2,
  Mail,
  Phone,
  Search,
  ShoppingBag,
  CreditCard,
  Truck,
  Upload,
  FileCheck,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary animate-scale-in">
              <Shield className="w-4 h-4" />
              <span>Verified & Compliant Alcohol Delivery</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Liquor Lane
              </span>
              <br />
              <span className="text-foreground">Verified Delivery</span>
              <br />
              <span className="text-foreground">at Your Doorstep</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-100">
              A compliant, age-verified alcohol delivery platform. Order from your favorite local stores with confidence and convenience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-200">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Login
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground animate-fade-in delay-300">
              <Shield className="inline w-4 h-4 mr-1" />
              Only for age-verified users • Compliant and secure
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">The Problem</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Traditional alcohol purchasing faces critical challenges that put businesses and consumers at risk
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: "Wasted Time",
                description: "Limited store hours and long checkout lines waste valuable time",
              },
              {
                icon: AlertTriangle,
                title: "Inconsistent ID Checks",
                description: "Manual verification leads to human error and compliance risks",
              },
              {
                icon: UserX,
                title: "Underage Purchase Risk",
                description: "Inadequate verification systems enable underage access",
              },
              {
                icon: Truck,
                title: "No Verified Delivery",
                description: "Lack of trusted delivery options for alcohol purchases",
              },
            ].map((problem, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-amber group"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <problem.icon className="w-6 h-6 text-destructive" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground">{problem.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section id="why-now" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Now</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The market is ready for a verified alcohol delivery solution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Consumers Demand Delivery",
                description: "Modern consumers expect on-demand delivery for all purchases, including alcohol",
              },
              {
                icon: BadgeCheck,
                title: "New ID Laws",
                description: "Updated regulations require robust age verification for online alcohol sales",
              },
              {
                icon: Smartphone,
                title: "Proven Technology",
                description: "ID verification technology is mature, accurate, and widely accepted",
              },
              {
                icon: TrendingUp,
                title: "Market Accelerates",
                description: "Online alcohol delivery is experiencing rapid growth and adoption",
              },
            ].map((reason, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow-amber transition-all duration-300">
                    <reason.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Liquor Lane - The Verified Solution
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete platform for compliant alcohol delivery with multi-layer verification
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block"></div>

              {/* Steps */}
              <div className="space-y-12">
                {[
                  {
                    icon: CheckCircle2,
                    title: "Instant Age Gating",
                    description: "Users enter their date of birth. System instantly verifies legal drinking age before allowing access.",
                  },
                  {
                    icon: Upload,
                    title: "Secure ID Upload",
                    description: "Users securely upload government-issued ID. All data encrypted and stored with industry-standard security.",
                  },
                  {
                    icon: FileCheck,
                    title: "Human Review",
                    description: "Trained admins manually review each ID submission. Ensures accuracy and prevents fraud.",
                  },
                  {
                    icon: ShoppingBag,
                    title: "Effortless Shopping",
                    description: "Once verified, users browse stores, add items to cart, and checkout seamlessly with multiple payment options.",
                  },
                ].map((step, index) => (
                  <div key={index} className="relative flex items-start gap-6 group">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-card border-2 border-primary rounded-full flex items-center justify-center shadow-glow-amber group-hover:scale-110 transition-transform relative z-10">
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <Card className="flex-1 p-6 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                        <span className="text-3xl font-bold text-primary/20">0{index + 1}</span>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Key Features at a Glance</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need for a safe, convenient alcohol delivery experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Mail,
                title: "Quick Google Login",
                description: "Sign in instantly with your Google account. Fast, secure, and hassle-free authentication.",
              },
              {
                icon: Phone,
                title: "Secure Phone Login",
                description: "Verify your identity with SMS codes sent to your phone. Simple and secure.",
              },
              {
                icon: Mail,
                title: "Email Verification",
                description: "Receive verification codes via email for secure account access.",
              },
              {
                icon: Shield,
                title: "ID Verification",
                description: "Multi-step verification process ensures age compliance and prevents underage access.",
              },
              {
                icon: Search,
                title: "Store & Product Search",
                description: "Find local liquor stores and browse their inventory with powerful search and filters.",
              },
              {
                icon: CreditCard,
                title: "Seamless Checkout",
                description: "Only verified users can complete purchases. Safe, compliant, and convenient.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-gold group"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Sign up now to browse verified stores and get your favorite drinks delivered to your doorstep
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth?mode=signup">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/80">
            <Shield className="inline w-4 h-4 mr-1" />
            Secure • Compliant • Age-Verified
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Liquor Lane
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                Verified alcohol delivery platform ensuring compliance, safety, and convenience for all users.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/compliance" className="text-muted-foreground hover:text-primary transition-colors">
                    Compliance
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
            © 2025 Liquor Lane. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
