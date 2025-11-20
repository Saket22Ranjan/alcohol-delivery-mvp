import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  Upload,
  FileCheck,
  Shield,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Step = "age" | "upload" | "status";

export default function Verification() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>("age");
  const [loading, setLoading] = useState(false);

  // Age check state
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [ageVerified, setAgeVerified] = useState(false);

  // ID upload state
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idUploaded, setIdUploaded] = useState(false);

  // Status state
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "approved" | "rejected"
  >("pending");

  const calculateAge = () => {
    if (!day || !month || !year) return 0;
    const today = new Date();
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAgeCheck = () => {
    const age = calculateAge();
    if (age < 21) {
      toast({
        variant: "destructive",
        title: "Age Requirement Not Met",
        description: "You must be 21 or older to use this service.",
      });
      return;
    }
    setAgeVerified(true);
    toast({
      title: "Age Verified",
      description: "You meet the age requirement. Please proceed to ID upload.",
    });
    setCurrentStep("upload");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
        });
        return;
      }
      setIdFile(file);
    }
  };

  const handleUploadID = () => {
    if (!idFile) {
      toast({
        variant: "destructive",
        title: "File required",
        description: "Please select an ID file to upload",
      });
      return;
    }

    setLoading(true);
    // Simulate upload
    setTimeout(() => {
      setIdUploaded(true);
      setLoading(false);
      toast({
        title: "ID Uploaded",
        description: "Your ID has been submitted for review",
      });
      setCurrentStep("status");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Age & ID Verification
          </h1>
          <p className="text-muted-foreground text-lg">
            Complete verification to start shopping on Liquor Lane
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 -z-10"></div>
            {[
              { id: "age", label: "Age Check", icon: CheckCircle2 },
              { id: "upload", label: "ID Upload", icon: Upload },
              { id: "status", label: "Review Status", icon: FileCheck },
            ].map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    currentStep === step.id
                      ? "bg-primary border-primary shadow-glow-amber"
                      : index < ["age", "upload", "status"].indexOf(currentStep)
                      ? "bg-green-500 border-green-500"
                      : "bg-card border-border"
                  }`}
                >
                  <step.icon
                    className={`w-6 h-6 ${
                      currentStep === step.id || index < ["age", "upload", "status"].indexOf(currentStep)
                        ? "text-white"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <p
                  className={`mt-2 text-sm font-medium ${
                    currentStep === step.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Age Check Step */}
        {currentStep === "age" && (
          <Card className="p-8 bg-gradient-card border-border/50 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Age Verification</h2>
                <p className="text-muted-foreground">Enter your date of birth</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="month">Month</Label>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {new Date(0, i).toLocaleString("default", { month: "long" })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="day">Day</Label>
                  <Input
                    id="day"
                    type="number"
                    placeholder="DD"
                    min="1"
                    max="31"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="YYYY"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    You must be 21 years or older to use Liquor Lane. Your date of birth is used solely for age verification.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleAgeCheck}
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!day || !month || !year}
              >
                Verify Age
              </Button>
            </div>
          </Card>
        )}

        {/* ID Upload Step */}
        {currentStep === "upload" && (
          <Card className="p-8 bg-gradient-card border-border/50 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">ID Upload</h2>
                <p className="text-muted-foreground">Upload your government-issued ID</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="id-upload"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="id-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  {idFile ? (
                    <div>
                      <p className="text-foreground font-medium mb-2">{idFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(idFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-foreground font-medium mb-2">
                        Drop your ID here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports: JPG, PNG, PDF (Max 5MB)
                      </p>
                    </>
                  )}
                </label>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Accepted IDs:</p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Driver's License</li>
                  <li>• Passport</li>
                  <li>• State ID Card</li>
                  <li>• Military ID</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    Your ID is encrypted and securely stored. We only use it for age verification and never share it with third parties.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleUploadID}
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!idFile || loading}
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading...</>
                ) : (
                  "Submit for Review"
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Status Step */}
        {currentStep === "status" && (
          <Card className="p-8 bg-gradient-card border-border/50 animate-fade-in">
            <div className="text-center mb-8">
              {verificationStatus === "pending" && (
                <>
                  <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileCheck className="w-10 h-10 text-yellow-500" />
                  </div>
                  <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 mb-4">
                    Pending Review
                  </Badge>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Your ID is Being Reviewed
                  </h2>
                  <p className="text-muted-foreground">
                    Our team is verifying your submission. This typically takes 1-2 business days.
                  </p>
                </>
              )}
              {verificationStatus === "approved" && (
                <>
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-green-500" />
                  </div>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 mb-4">
                    Verified
                  </Badge>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Verification Complete!
                  </h2>
                  <p className="text-muted-foreground">
                    Your account is now verified. You can start browsing and purchasing.
                  </p>
                </>
              )}
              {verificationStatus === "rejected" && (
                <>
                  <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-10 h-10 text-destructive" />
                  </div>
                  <Badge variant="destructive" className="mb-4">
                    Verification Failed
                  </Badge>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    ID Verification Rejected
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We couldn't verify your ID. Please upload a clearer image.
                  </p>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Submitted</span>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary w-2/3 animate-pulse"></div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="hero"
                  className="flex-1"
                >
                  Go to Dashboard
                </Button>
                {verificationStatus === "rejected" && (
                  <Button
                    onClick={() => {
                      setIdFile(null);
                      setCurrentStep("upload");
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Re-upload ID
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
