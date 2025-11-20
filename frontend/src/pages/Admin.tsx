import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle, Clock, Users, FileCheck, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock verification data
const mockVerifications = [
  {
    id: "VER-001",
    userId: "USR-123",
    userName: "John Doe",
    email: "john@example.com",
    age: 28,
    idImage: "🆔",
    submittedAt: "2024-01-20 14:30",
    status: "pending",
  },
  {
    id: "VER-002",
    userId: "USR-124",
    userName: "Jane Smith",
    email: "jane@example.com",
    age: 32,
    idImage: "🆔",
    submittedAt: "2024-01-20 15:45",
    status: "pending",
  },
  {
    id: "VER-003",
    userId: "USR-125",
    userName: "Bob Johnson",
    email: "bob@example.com",
    age: 25,
    idImage: "🆔",
    submittedAt: "2024-01-19 10:20",
    status: "approved",
  },
];

export default function Admin() {
  const { toast } = useToast();
  const [verifications, setVerifications] = useState(mockVerifications);
  const [selectedVerification, setSelectedVerification] = useState<typeof mockVerifications[0] | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const pendingCount = verifications.filter((v) => v.status === "pending").length;
  const approvedCount = verifications.filter((v) => v.status === "approved").length;
  const rejectedCount = verifications.filter((v) => v.status === "rejected").length;

  const filteredVerifications = verifications.filter(
    (v) =>
      v.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (id: string) => {
    setVerifications((verifications) =>
      verifications.map((v) => (v.id === id ? { ...v, status: "approved" } : v))
    );
    setSelectedVerification(null);
    toast({
      title: "Verification approved",
      description: "User has been verified successfully",
    });
  };

  const handleReject = (id: string) => {
    if (!rejectionReason) {
      toast({
        variant: "destructive",
        title: "Reason required",
        description: "Please provide a reason for rejection",
      });
      return;
    }
    setVerifications((verifications) =>
      verifications.map((v) => (v.id === id ? { ...v, status: "rejected" } : v))
    );
    setSelectedVerification(null);
    setRejectionReason("");
    toast({
      title: "Verification rejected",
      description: "User has been notified",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin <span className="bg-gradient-primary bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage ID verifications and user access
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Verifications</p>
                <p className="text-3xl font-bold text-foreground">{pendingCount}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approved Users</p>
                <p className="text-3xl font-bold text-foreground">{approvedCount}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rejected Users</p>
                <p className="text-3xl font-bold text-foreground">{rejectedCount}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search & Filters */}
        <Card className="p-6 bg-gradient-card border-border/50 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["All", "Pending", "Approved", "Rejected"].map((filter) => (
                <Badge
                  key={filter}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors"
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Verifications Table */}
        <Card className="bg-gradient-card border-border/50">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Verification ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVerifications.map((verification) => (
                  <TableRow key={verification.id}>
                    <TableCell className="font-medium">{verification.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{verification.userName}</p>
                        <p className="text-sm text-muted-foreground">{verification.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{verification.age}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {verification.submittedAt}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          verification.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : verification.status === "approved"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        {verification.status.charAt(0).toUpperCase() +
                          verification.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {verification.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedVerification(verification)}
                        >
                          Review
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredVerifications.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No verifications found</p>
            </div>
          )}
        </Card>
      </div>

      {/* Review Dialog */}
      <Dialog open={!!selectedVerification} onOpenChange={() => setSelectedVerification(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review ID Verification</DialogTitle>
            <DialogDescription>
              Review the submitted information and ID to approve or reject the verification
            </DialogDescription>
          </DialogHeader>

          {selectedVerification && (
            <div className="space-y-6">
              {/* User Info */}
              <Card className="p-4 bg-muted/30">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">User Name</p>
                    <p className="font-medium text-foreground">{selectedVerification.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium text-foreground">{selectedVerification.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Age</p>
                    <p className="font-medium text-foreground">{selectedVerification.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Submitted</p>
                    <p className="font-medium text-foreground">{selectedVerification.submittedAt}</p>
                  </div>
                </div>
              </Card>

              {/* ID Preview */}
              <div>
                <Label className="mb-2">Submitted ID</Label>
                <Card className="p-12 bg-muted/30 text-center">
                  <div className="text-6xl mb-4">{selectedVerification.idImage}</div>
                  <p className="text-sm text-muted-foreground">
                    ID image preview (actual image would display here)
                  </p>
                </Card>
              </div>

              {/* Rejection Reason */}
              <div>
                <Label htmlFor="reason">Rejection Reason (if rejecting)</Label>
                <Textarea
                  id="reason"
                  placeholder="Provide a clear reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={() => handleApprove(selectedVerification.id)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleReject(selectedVerification.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
