"use client";
import * as React from "react";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "outline" | "default";
  className?: string;
}
export const CustomButton = ({
  children,
  onClick,
  disabled,
  variant,
  className,
}: CustomButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:pointer-events-none
      ${
        variant === "outline"
          ? "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }
      ${className}
    `}
  >
    {children}
  </button>
);
