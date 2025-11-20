import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Store,
  ShoppingBag,
  Package,
  Shield,
  Upload,
  FileCheck,
  UserCheck,
} from "lucide-react";

export default function Dashboard() {
  // Mock verification status - in real app this would come from backend
  const verificationStatus = {
    ageCheck: "completed",
    idUpload: "completed",
    adminReview: "pending",
    verified: false,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Hi, <span className="bg-gradient-primary bg-clip-text text-transparent">John Doe</span>
          </h1>
          <p className="text-muted-foreground">
            Welcome to your Liquor Lane dashboard
          </p>
        </div>

        {/* Verification Status Card */}
        <Card className="mb-8 p-6 bg-gradient-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Verification Status</h2>
              <p className="text-muted-foreground">
                Complete verification to start shopping
              </p>
            </div>
            {verificationStatus.verified ? (
              <Badge className="bg-green-500 text-white border-0 text-lg px-4 py-2">
                <Shield className="w-5 h-5 mr-2" />
                Verified
              </Badge>
            ) : (
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                In Progress
              </Badge>
            )}
          </div>

          {/* Verification Steps */}
          <div className="space-y-4">
            {[
              {
                id: "ageCheck",
                icon: UserCheck,
                title: "Age Check",
                description: "Verify you're of legal drinking age",
                status: verificationStatus.ageCheck,
              },
              {
                id: "idUpload",
                icon: Upload,
                title: "ID Upload",
                description: "Upload your government-issued ID",
                status: verificationStatus.idUpload,
              },
              {
                id: "adminReview",
                icon: FileCheck,
                title: "Admin Review",
                description: "Our team reviews your submission",
                status: verificationStatus.adminReview,
              },
            ].map((step, index) => (
              <div
                key={step.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-card rounded-full flex items-center justify-center">
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <step.icon className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    {getStatusBadge(step.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-6">
            {!verificationStatus.verified && (
              <Link to="/verification">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  {verificationStatus.adminReview === "pending"
                    ? "View Verification Status"
                    : "Continue Verification"}
                </Button>
              </Link>
            )}
          </div>

          {/* Verification Info */}
          {verificationStatus.adminReview === "pending" && (
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-500 mb-1">
                    Review in Progress
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Our team is reviewing your ID submission. This typically takes 1-2 business days.
                    You'll receive a notification once the review is complete.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/stores" className="group">
              <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/50 hover:shadow-glow-amber transition-all duration-300 cursor-pointer">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Browse Stores</h3>
                <p className="text-sm text-muted-foreground">
                  Discover local liquor stores and their inventory
                </p>
              </Card>
            </Link>

            <Link to="/cart" className="group">
              <Card className="p-6 bg-gradient-card border-border/50 hover:border-secondary/50 hover:shadow-glow-gold transition-all duration-300 cursor-pointer">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">View Cart</h3>
                <p className="text-sm text-muted-foreground">
                  Review and checkout your selected items
                </p>
              </Card>
            </Link>

            <Link to="/orders" className="group">
              <Card className="p-6 bg-gradient-card border-border/50 hover:border-accent/50 hover:shadow-glow-wine transition-all duration-300 cursor-pointer">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">View Orders</h3>
                <p className="text-sm text-muted-foreground">
                  Track your order history and deliveries
                </p>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Activity / Notifications */}
        <Card className="p-6 bg-gradient-card border-border/50">
          <h2 className="text-2xl font-bold text-foreground mb-4">Notifications</h2>
          <div className="space-y-4">
            {verificationStatus.adminReview === "pending" ? (
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground mb-1">ID Verification Pending</p>
                  <p className="text-sm text-muted-foreground">
                    Your ID is being reviewed. We'll notify you once the process is complete.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No new notifications</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
