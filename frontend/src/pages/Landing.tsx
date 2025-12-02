import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Truck, Shield, Clock, MapPin } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Age Verified • Legal Delivery
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Late-night bottles,
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              legally delivered.
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse verified local liquor stores, upload your ID once, and get your favorite drinks
            delivered to your doorstep. Fast, secure, and compliant.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                Get Started
              </Button>
            </Link>
            <Link to="/stores">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Browse Stores
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Liquor Lane?
            </h2>
            <p className="text-lg text-muted-foreground">
              The safest and most convenient way to get your drinks delivered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 bg-gradient-card border-border/50 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Age Verified</h3>
              <p className="text-muted-foreground">
                Strict age verification ensures only 21+ users can access the platform
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50 text-center">
              <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Same-day delivery from licensed stores in your area
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Local Stores</h3>
              <p className="text-muted-foreground">
                Support local businesses while getting premium selection
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50 text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">24/7 Service</h3>
              <p className="text-muted-foreground">
                Order anytime with our round-the-clock delivery service
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Verified Stores</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4.8</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of satisfied customers who trust Liquor Lane for their alcohol delivery needs
          </p>

          <Link to="/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              Create Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
