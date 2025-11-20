import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wine, Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isAuthenticated?: boolean;
  cartItemCount?: number;
}

export const Navbar = ({ isAuthenticated = false, cartItemCount = 0 }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/#features" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  const authLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Stores", path: "/stores" },
    { name: "Orders", path: "/orders" },
  ];

  const links = isAuthenticated ? authLinks : publicLinks;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Wine className="w-8 h-8 text-primary relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Liquor Lane
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button variant="hero">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-between">
                      Cart
                      {cartItemCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
                          {cartItemCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="hero" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
