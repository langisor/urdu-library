"use client";
import {Button as ButtonComponent} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}
export function Button({children, className, ...props}: ButtonProps) {
  return (
    <ButtonComponent className={cn("mx-2 my-2 px-4 py-3 text-lg font-bold text-white transition-all duration-300 transform rounded-xl shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50", className)} {...props}>
      {children}
    </ButtonComponent>
  );
}