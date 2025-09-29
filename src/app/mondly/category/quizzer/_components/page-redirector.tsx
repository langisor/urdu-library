"use client";

import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PageRecirectorProps {
  path: string;
  showSpinner: boolean;
  message: string;
}
export default function PageRecirector({
  path = "/",
  showSpinner = false,
  message = "",
}: PageRecirectorProps) {
  const router = useRouter();

  useEffect(() => {
    // Redirect after a short delay
    const timer = setTimeout(() => {
      router.push(path);
    }, 3000); // Redirects after 3 seconds
    return () => clearTimeout(timer); // Clean up the timer
  }, [router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {showSpinner && <Spinner className="text-blue-600" size={64} />}
      <h3 className="text-shadow-accent">{message ? message : ""}</h3>
    </div>
  );
}
