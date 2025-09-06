"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollTopButtonProps {
  className?: string;
  showAfter?: number;
  smooth?: boolean;
}

export function ScrollTopButton({
  className,
  showAfter = 300,
  smooth = true,
}: ScrollTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={cn(
        "fixed bottom-4 right-4 z-50 rounded-full shadow-lg transition-opacity duration-300",
        "hover:shadow-xl",
        className
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-4 w-4" />
    </Button>
  );
}
