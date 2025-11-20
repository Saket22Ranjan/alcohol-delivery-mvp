import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Chrome, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    google: any;
  }
}

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const mode = searchParams.get("mode") || "login";

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState({ email: false, phone: false });

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      toast({
        title: "Google Login",
        description: "Successfully logged in with Google",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const handleSendEmailCode = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email required",
        description: "Please enter your email address",
      });
      return;
    }
    setLoading(true);
    // Simulate sending email code
    setTimeout(() => {
      setCodeSent({ ...codeSent, email: true });
      setLoading(false);
      toast({
        title: "Code sent",
        description: "Verification code sent to your email",
      });
    }, 1000);
  };

  const handleVerifyEmail = async () => {
    if (!emailCode) {
      toast({
        variant: "destructive",
        title: "Code required",
        description: "Please enter the verification code",
      });
      return;
    }
    setLoading(true);
    // Simulate email verification
    setTimeout(() => {
      toast({
        title: "Email verified",
        description: "Successfully logged in",
      });
      navigate("/dashboard");
    }, 1000);
  };

  const handleSendSMSCode = async () => {
    if (!phone) {
      toast({
        variant: "destructive",
        title: "Phone required",
        description: "Please enter your phone number",
      });
      return;
    }
    setLoading(true);
    // Simulate sending SMS code
    setTimeout(() => {
      setCodeSent({ ...codeSent, phone: true });
      setLoading(false);
      toast({
        title: "Code sent",
        description: "Verification code sent to your phone",
      });
    }, 1000);
  };

  const handleVerifySMS = async () => {
    if (!smsCode) {
      toast({
        variant: "destructive",
        title: "Code required",
        description: "Please enter the verification code",
      });
      return;
    }
    setLoading(true);
    // Simulate SMS verification
    setTimeout(() => {
      toast({
        title: "Phone verified",
        description: "Successfully logged in",
      });
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8 bg-gradient-card border-border/50 animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            {mode === "signup" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "signup"
              ? "Sign up to start ordering verified alcohol delivery"
              : "Log in to your Liquor Lane account"}
          </p>
        </div>

        <Tabs defaultValue="google" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>

          {/* Google Login */}
          <TabsContent value="google" className="space-y-4">
            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              variant="outline"
              className="w-full h-12"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Chrome className="w-5 h-5 mr-2" />
                  {mode === "signup" ? "Sign up with Google" : "Log in with Google"}
                </>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Fast, secure authentication with your Google account
            </p>
          </TabsContent>

          {/* Email Login */}
          <TabsContent value="email" className="space-y-4">
            {!codeSent.email ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleSendEmailCode}
                  disabled={loading}
                  className="w-full"
                  variant="hero"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Send Verification Code
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="emailCode">Verification Code</Label>
                  <Input
                    id="emailCode"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <Button
                  onClick={handleVerifyEmail}
                  disabled={loading}
                  className="w-full"
                  variant="hero"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Login"}
                </Button>
                <Button
                  onClick={() => setCodeSent({ ...codeSent, email: false })}
                  variant="ghost"
                  className="w-full"
                >
                  Use different email
                </Button>
              </>
            )}
            <p className="text-xs text-center text-muted-foreground">
              We'll send a verification code to your email
            </p>
          </TabsContent>

          {/* Phone Login */}
          <TabsContent value="phone" className="space-y-4">
            {!codeSent.phone ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleSendSMSCode}
                  disabled={loading}
                  className="w-full"
                  variant="hero"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Phone className="w-5 h-5 mr-2" />
                      Send SMS Code
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="smsCode">SMS Code</Label>
                  <Input
                    id="smsCode"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <Button
                  onClick={handleVerifySMS}
                  disabled={loading}
                  className="w-full"
                  variant="hero"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Login"}
                </Button>
                <Button
                  onClick={() => setCodeSent({ ...codeSent, phone: false })}
                  variant="ghost"
                  className="w-full"
                >
                  Use different phone
                </Button>
              </>
            )}
            <p className="text-xs text-center text-muted-foreground">
              We'll send an SMS verification code to your phone
            </p>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm">
          {mode === "signup" ? (
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <a href="/auth" className="text-primary hover:underline font-medium">
                Log in
              </a>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <a href="/auth?mode=signup" className="text-primary hover:underline font-medium">
                Sign up
              </a>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
