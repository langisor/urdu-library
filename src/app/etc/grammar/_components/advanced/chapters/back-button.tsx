"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export const BackButton = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  return (
    <Button variant="outline" onClick={() => navigateTo("toc")} className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-300">
      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Table of Contents
    </Button>
  );
 }