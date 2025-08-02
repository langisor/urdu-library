"use client";
import clsx from "clsx";
import "./styles.css";
type Variants = "en" | "ro" | "ur" | "ar"; // english text, romanized text, urdu text, arabic text
type Sizes = "sm" | "md" | "lg" | "xl"; // small, medium, large fonts

interface TextBoxProps {
  variant: Variants;
  size: Sizes;
  children: React.ReactNode | string;
}

const TextBox = ({ variant, size, children }: TextBoxProps) => {
  const cn = clsx(
    "",
    variant === "en" && "text-english text-left",
    variant === "ro" && "text-romanized text-left",
    variant === "ur" && "text-urdu text-right",
    variant === "ar" && "text-arabic text-right",
    size === "sm" && "text-sm",
    size === "md" && "text-md",
    size === "lg" && "text-lg",
    size === "xl" && "text-xl"
  );
  return <span className={cn}>{children}</span>;
};
