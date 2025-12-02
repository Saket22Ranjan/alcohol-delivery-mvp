import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, Loader2, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const [role, setRole] = useState("user"); // "user" | "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (role === "admin") {
        // Admin login via API
        const response = await fetch("http://localhost:4000/api/admin-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Set user in context
          login({
            id: data.admin.id,
            email: data.admin.email,
            role: data.admin.role
          });

          toast({
            title: "Admin login successful",
            description: "Welcome back, admin. Redirecting to admin panel.",
          });
          navigate("/admin");
        } else {
          throw new Error(data.error || "Invalid admin credentials");
        }
      } else {
        // User login - redirect to Auth page for OTP verification
        navigate("/auth");
        return;
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description:
          error?.message || "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050509] text-[#F5F5F5] px-4">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute -top-40 -left-20 w-80 h-80 bg-[#F5A623]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7B1E3A]/30 blur-3xl" />
      </div>

      <Card className="relative z-10 w-full max-w-md bg-white/5 border border-white/15 backdrop-blur-xl p-6 rounded-3xl">
        <div className="mb-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#A3A3A3] mb-1">
            Liquor Lane
          </p>
          <h1 className="text-xl font-semibold mb-1">Sign in to continue</h1>
          <p className="text-xs text-[#A3A3A3]">
            Verified alcohol delivery · Age-restricted access
          </p>
        </div>

        <Tabs
          defaultValue="user"
          onValueChange={(value) => setRole(value)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-xs">User Login</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="text-xs">Admin Login</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A3A3]" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-9 text-sm bg-black/30 border-white/15"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-xs">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A3A3]" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-9 text-sm bg-black/30 border-white/15"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-2 bg-[#F5A623] text-black hover:bg-[#f7b244]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="text-sm">
                    Continue as {role === "admin" ? "Admin" : "User"}
                  </span>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="admin">
            {/* Same form, just uses role="admin" from state */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="admin-email" className="text-xs">
                  Admin Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A3A3]" />
                  <Input
                    id="admin-email"
                    type="email"
                    className="pl-9 text-sm bg-black/30 border-white/15"
                    placeholder="admin@liquorlane.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="admin-password" className="text-xs">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A3A3]" />
                  <Input
                    id="admin-password"
                    type="password"
                    className="pl-9 text-sm bg-black/30 border-white/15"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-2 bg-[#F5A623] text-black hover:bg-[#f7b244]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="text-sm">Continue as Admin</span>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
