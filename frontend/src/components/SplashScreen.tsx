import { useEffect, useState } from "react";
import { Wine, Truck } from "lucide-react";
import { Button } from "./ui/button";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showBottle, setShowBottle] = useState(false);

  useEffect(() => {
    // Start bottle animation after a brief delay
    const bottleTimer = setTimeout(() => {
      setShowBottle(true);
    }, 300);

    // Hide splash screen after animation completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3500);

    return () => {
      clearTimeout(bottleTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero animate-fade-in">
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated bottle with delivery message */}
        <div
          className={`transform transition-all duration-800 ${
            showBottle ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" }}
        >
          <div className="relative">
            {/* Bottle icon with glow effect */}
            <div className="flex items-end justify-center h-48 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-primary rounded-full blur-3xl opacity-30 animate-pulse"></div>
              </div>
              <Wine className="w-24 h-40 text-primary relative z-10 drop-shadow-2xl" strokeWidth={1.5} />
            </div>

            {/* Speech bubble with delivery message */}
            <div
              className={`absolute -right-16 top-12 transform transition-all delay-300 ${
                showBottle ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <div className="bg-card border-2 border-primary/30 rounded-2xl px-6 py-4 shadow-glow-amber relative">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary" />
                  <p className="text-sm font-bold text-foreground whitespace-nowrap">
                    Deliver at doorstep
                  </p>
                </div>
                {/* Speech bubble arrow */}
                <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-primary/30"></div>
              </div>
            </div>
          </div>

          {/* Brand name */}
          <div
            className={`mt-12 text-center transform transition-all delay-500 ${
              showBottle ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Liquor Lane
            </h1>
            <p className="text-muted-foreground text-sm">Premium verified delivery</p>
          </div>
        </div>

        {/* Skip button */}
        <Button
          onClick={() => {
            setIsVisible(false);
            onComplete();
          }}
          variant="ghost"
          size="sm"
          className={`absolute bottom-8 text-muted-foreground hover:text-foreground transform transition-all delay-700 ${
            showBottle ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Skip
        </Button>
      </div>
    </div>
  );
};
