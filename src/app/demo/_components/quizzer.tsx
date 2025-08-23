"use client";
import * as Quizzes from "./quizzes";
import { JsonViewerComponent } from "@/components/json-viewer";
 
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuizzer } from "./use-quizzer";
 



interface QuizzerProps {
  quizzes:  any[]
}

export function Quizzer({ quizzes }: QuizzerProps) {
  const {
    currentQuizIndex,
    handleNextQuiz,
    handlePreviousQuiz,
  } = useQuizzer({ quizzes });
  const [quizOpen, setQuizOpen] = React.useState(false);
  const currentQuiz = quizzes[currentQuizIndex];
  const renderQuiz = () => {
    switch (currentQuiz.type) {
      case "D":
        return <Quizzes.QuizD key={currentQuizIndex} quizItem={currentQuiz} />;
      case "F":
        return <Quizzes.QuizF key={currentQuizIndex} quizItem={currentQuiz} />;
      case "T1":
        return <Quizzes.QuizT1 key={currentQuizIndex} quizItem={currentQuiz} handleNextQuiz={handleNextQuiz} />;
      default:
        return (
          <Card className="border border-red-500">
            <CardContent>
              <p>Unsupported quiz type: {currentQuiz.type}</p>
              <JsonViewerComponent data={currentQuiz} />
            </CardContent>
          </Card>
        );
    }
  };
  return (
    <Sheet open={quizOpen} onOpenChange={setQuizOpen}>
      <SheetTrigger asChild className="flex items-center justify-center">
        <Button variant="outline">start quizzes</Button>
      </SheetTrigger>
      <div className="flex items-center justify-center">
        النقاط: 0
      </div>
      <SheetContent
        side="bottom"
        className="w-full h-screen flex flex-col p-4 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>النقاط المكتسبة: 0</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Badge>
              Quiz {currentQuizIndex + 1} of {quizzes.length}
            </Badge>
             
          </div>
          <div className="flex justify-between">
            <Button
              onClick={handlePreviousQuiz}
              disabled={currentQuizIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuiz}
              disabled={currentQuizIndex === quizzes.length - 1}
            >
              Next
            </Button>
          </div>
          <div>{renderQuiz()}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
