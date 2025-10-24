"use client";
import * as React from "react";
import { Quizzer } from "./quizzer";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { QuizData } from "./types";
import vocsData from "../_data/vocs-data.json";

function getQuizData(vocId: string): QuizData {
  const result = vocsData.find((v) => v.id === vocId);

  return result as QuizData;
}

export function QuizzerSheet({ vocId }: { vocId: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button>Quizzer</Button>
      </SheetTrigger>
      <SheetTitle className="hidden"> </SheetTitle>
      <SheetDescription className="hidden"> </SheetDescription>
      <SheetContent
        side="top"
        className="flex flex-col items-center justify-center w-full h-full sm:w-screen sm:h-screen p-2 overflow-auto"
      >
        <Quizzer data={getQuizData(vocId)} onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
