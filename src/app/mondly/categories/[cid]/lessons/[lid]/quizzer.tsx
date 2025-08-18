"use client";
import { Quiz } from "@/app/mondly/_types/data-services";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as QUIZZES from "./[qid]/_components/quizzes";
import * as React from "react";

import { ResultCard } from "./[qid]/_components/cards/result-card";
import { Button } from "@/components/ui/button";

import { useHookstate } from "@hookstate/core";
import { Badge } from "@/components/ui/badge";
import { quizzerStore } from "./[qid]/_components/quizzer-store";

export default function Quizzer({ quizzes }: { quizzes: Quiz[] }) {
  // hooks
  const globalQuizzerStore = useHookstate(quizzerStore);

  //  effects
  React.useEffect(() => {
    globalQuizzerStore.totalQuizzes.set(quizzes.length);
  }, [globalQuizzerStore.totalQuizzes, quizzes.length]);
  function handleNext() {
    if (globalQuizzerStore.currentQuizIndex.get() >= quizzes.length - 1) {
      globalQuizzerStore.completed.set(true);
      return <ResultCard />;
    }
    globalQuizzerStore.currentQuizIndex.set(
      globalQuizzerStore.currentQuizIndex.get() + 1
    );
  }
  function handlePrevious() {
    if (globalQuizzerStore.currentQuizIndex.get() > 0) {
      globalQuizzerStore.currentQuizIndex.set(
        globalQuizzerStore.currentQuizIndex.get() - 1
      );
    }
  }
  const renderQuiz = () => {
    return (
      <QuizzerSteps quiz={quizzes[globalQuizzerStore.currentQuizIndex.value]} />
    );
  };
  return (
    <>
      <Sheet>
        <div className="flex justify-center">
          <SheetTrigger asChild className="">
            <Badge>Start Quiz</Badge>
          </SheetTrigger>
        </div>
        <SheetContent side="bottom" className="h-full w-full overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              <div className="flex flex-row gap-2">
                <Badge className="fixed top-20 text-lg right-5 bg-amber-900 text-white">
                  Type {quizzes[globalQuizzerStore.currentQuizIndex.value].type}
                </Badge>
                <Badge>
                  Quiz {globalQuizzerStore.currentQuizIndex.value + 1} of{" "}
                  {globalQuizzerStore.totalQuizzes.value}
                </Badge>
                <Badge>Score: {globalQuizzerStore.score.value}</Badge>
                <Badge>
                  Earned Marks: {globalQuizzerStore.earnedMarks.value}
                </Badge>

                <Button onClick={handleNext}>Next</Button>
                <Button onClick={handlePrevious}>Previous</Button>
              </div>
            </SheetTitle>
            <SheetDescription>
              Click Next when finish answering the question
            </SheetDescription>
          </SheetHeader>
          {renderQuiz()}
        </SheetContent>
      </Sheet>
    </>
  );
}

function QuizzerSteps({ quiz }: { quiz: Quiz }) {
  switch (quiz.type) {
    case "C1b":
      return <QUIZZES.QuizC1b quiz={quiz} />;
    case "C2b":
      return <QUIZZES.QuizC2b quiz={quiz} />;
    case "D":
      return <QUIZZES.QuizD quiz={quiz} />;
    case "F":
      return <QUIZZES.QuizF quiz={quiz} />;
    case "L1":
      return <QUIZZES.QuizL1 quiz={quiz} />;
    case "P":
      return <QUIZZES.QuizP quiz={quiz} />;
    case "Q":
      return <QUIZZES.QuizQ quiz={quiz} />;
    case "Qb":
      return <QUIZZES.QuizQb quiz={quiz} />;
    case "R":
      return <QUIZZES.QuizR quiz={quiz} />;
    case "T1":
      return <QUIZZES.QuizT1 quiz={quiz} />;
    case "T1b":
      return <QUIZZES.QuizT1b quiz={quiz} />;
    case "T2":
      return <QUIZZES.QuizT2 quiz={quiz} />;
    case "T2b":
      return <QUIZZES.QuizT2b quiz={quiz} />;
    case "W1b":
      return <QUIZZES.QuizW1b quiz={quiz} />;
    default:
      return <div>Unknown Quiz Type</div>;
  }
}
