"use client";
import { cn } from "@/lib/utils";

interface CustomLoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse" | "bars";
  className?: string;
}

export function CustomLoading({
  size = "md",
  variant = "spinner",
  className,
}: CustomLoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  if (variant === "spinner") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-orange-500 animate-spin" />
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-400 border-b-rose-400 border-l-amber-400 animate-spin animate-reverse animate-duration-700" />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        <div
          className={cn(
            "rounded-full bg-blue-500 animate-bounce",
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
          )}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={cn(
            "rounded-full bg-purple-500 animate-bounce",
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
          )}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={cn(
            "rounded-full bg-pink-500 animate-bounce",
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
          )}
          style={{ animationDelay: "300ms" }}
        />
        <div
          className={cn(
            "rounded-full bg-orange-500 animate-bounce",
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
          )}
          style={{ animationDelay: "450ms" }}
        />
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
        <div className="absolute inset-2 rounded-full bg-background" />
        <div className="absolute inset-3 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 animate-pulse animate-delay-300" />
      </div>
    );
  }

  if (variant === "bars") {
    return (
      <div className={cn("flex items-end space-x-1", className)}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "animate-pulse rounded-sm",
              size === "sm" ? "w-1" : size === "md" ? "w-1.5" : "w-2",
              size === "sm" ? "h-4" : size === "md" ? "h-6" : "h-8"
            )}
            style={{
              backgroundColor: [
                "#3b82f6",
                "#8b5cf6",
                "#ec4899",
                "#f97316",
                "#06b6d4",
              ][i],
              animationDelay: `${i * 100}ms`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
