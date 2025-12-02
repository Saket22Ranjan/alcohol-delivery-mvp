import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/login", { state: { from: location } });
    } else if (requireAdmin && user?.role !== "admin") {
      // Redirect to dashboard if user is not admin but trying to access admin routes
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, requireAdmin, navigate, location]);

  // Show loading or nothing while redirecting
  if (!isAuthenticated || (requireAdmin && user?.role !== "admin")) {
    return (
      <div className="min-h-screen bg-[#050509] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F5A623] mx-auto mb-4"></div>
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
