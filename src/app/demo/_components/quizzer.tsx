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
import { useQuizzer } from "../_hooks/use-quizzer";
import { useUserStore } from "../_store/user-store";
import { ResultScreen } from "./result-screen";
interface QuizzerProps {
  quizzes: any[];
}

export function Quizzer({ quizzes }: QuizzerProps) {
  const {
    currentQuizIndex,
    setCurrentQuizIndex,
    handleNextQuiz,
    handlePreviousQuiz,
    isQuizComplete,
  } = useQuizzer({
    quizzes,
  });

  const { getUserScore, resetScore } = useUserStore();

  const [quizOpen, setQuizOpen] = React.useState(false);
  const currentQuiz = quizzes[currentQuizIndex];

  /**
   * 
   *  @description `onOpenChange` callback is triggered whenever the Sheet's open state changes, including when users click the close icon, press Escape, or click outside the sheet.
   */
  const handleOpenChange = (open: boolean) => {
    
    setQuizOpen(open);
    // reset score and current quiz index when sheet is closed
    if (!open) {
      resetScore();
       setCurrentQuizIndex(0);
    }
   
      
  };
  const renderQuiz = () => {
    if (isQuizComplete) {
      return <ResultScreen score={getUserScore()} />;
    }
    switch (currentQuiz.type) {
      case "D":
        return <Quizzes.QuizD key={currentQuizIndex} quizItem={currentQuiz} />;
      case "T1":
        return (
          <Quizzes.QuizT1
            key={currentQuizIndex}
            quizItem={currentQuiz}
            handleNextQuiz={handleNextQuiz}
          />
        );
      case "T2":
        return (
          <Quizzes.QuizT2
            key={currentQuizIndex}
            quizItem={currentQuiz}
            handleNextQuiz={handleNextQuiz}
          />
        );
      case "Qb":
        return (
          <Quizzes.QuizQb
            key={currentQuizIndex}
            quizItem={currentQuiz}
            handleNextQuiz={handleNextQuiz}
          />
        );
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
    <Sheet open={quizOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild className="flex items-center justify-center">
        <Button variant="outline">start quizzes</Button>
      </SheetTrigger>
      <div className="flex items-center justify-center">
        النقاط الحالية: {getUserScore() || "Loading..."}
      </div>
      <SheetContent
        side="bottom"
        className="w-full h-screen flex flex-col p-4 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>
            النقاط المكتسبة: {getUserScore() || "Loading..."}
          </SheetTitle>
          <SheetDescription>
            تمرين {currentQuizIndex + 1} من {quizzes.length}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Badge>
              Quiz {currentQuizIndex + 1} of {quizzes.length}
            </Badge>
          </div>
          <div className="flex justify-between">
            <Button
              onClick={() => handlePreviousQuiz()}
              disabled={currentQuizIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => handleNextQuiz()}
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
