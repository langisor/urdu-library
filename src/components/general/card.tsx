import {
  Card as CardComponent,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
interface CardProps {
  children: React.ReactNode;
  className?: string;
  dir?: "ltr" | "rtl";
}
function Card({ children, className, dir="ltr", ...props }: CardProps) {
  return (
    <CardComponent
      className={cn(
        "px-8 py-3 text-lg font-bold text-white transition-all duration-300 transform rounded-md shadow-lg bg-gradient-to-r from-teal-800 to-blue-500 hover:scale-101 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50",
        dir === "rtl" ? "text-right" : "text-left",
        className
      )}
      dir={dir}
      {...props}
    >
      {children}
    </CardComponent>
  );
}

export { Card, CardContent, CardFooter, CardHeader, CardTitle };
