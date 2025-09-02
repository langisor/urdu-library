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
    handleNextQuiz,
    handlePreviousQuiz,
    isQuizComplete,
  } = useQuizzer({
    quizzes,
  });

  const { getUserScore, resetScore } = useUserStore();

  const [quizOpen, setQuizOpen] = React.useState(false);
  const currentQuiz = quizzes[currentQuizIndex];
 
  const renderQuiz = () => {
    if (isQuizComplete) {
      return <ResultScreen score={getUserScore()} />;
    }
    switch (currentQuiz.type) {
      case "D":
        console.log("Quiz D",currentQuiz);
        return <Quizzes.QuizD  quizItem={currentQuiz} handleNextQuiz={handleNextQuiz} />;
      case "T1":
        console.log("Quiz T1",currentQuiz);
        return (
          <Quizzes.QuizT1
            
            quizItem={currentQuiz}
            handleNextQuiz={handleNextQuiz}
          />
        );
      case "T2":
        console.log("Quiz T2",currentQuiz);
        return (
          <Quizzes.QuizT2
            
            quizItem={currentQuiz}
            handleNextQuiz={handleNextQuiz}
          />
        );
      case "Qb":
        console.log("Quiz Qb",currentQuiz);
        return (
          <Quizzes.QuizQb
         
            quizItem={currentQuiz}
            handleNextQuiz={handleNextQuiz}
          />
        );
      default:
        console.log("Unsupported quiz type: ",currentQuiz.type);
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
    <>
      <CountDown />
      <Sheet open={quizOpen} onOpenChange={setQuizOpen}>
        <SheetTrigger asChild className="flex items-center justify-center">
          <Button variant="outline" onClick={() => setQuizOpen(true)}>
            start quizzes
          </Button>
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
    </>
  );
}

function CountDown() {
  const [count, setCount] = React.useState(3);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Hide the component when countdown reaches 0
      setIsVisible(false);
    }
  }, [count]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-2xl">
        <div className="text-6xl font-bold text-center text-primary animate-pulse">
          {count}
        </div>
      </div>
    </div>
  );
}
