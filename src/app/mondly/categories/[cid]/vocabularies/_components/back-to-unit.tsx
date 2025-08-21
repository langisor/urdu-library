"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const BackToUnit = () => {
  const router = useRouter();

  const handleBackToUnit = () => {
    router.back();
  };
  return <Button onClick={handleBackToUnit} className="bg-blue-500 text-white hover:cursor-pointer">العودة للوحدة</Button>;
};
