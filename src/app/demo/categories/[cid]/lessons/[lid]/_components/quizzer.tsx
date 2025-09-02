"use client";
import * as Quizzes from "./quizzes";
import { JsonViewerComponent } from "@/components/json-viewer";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuizzer } from "../_hooks/use-quizzer";
import { ResultScreen } from "./result-screen";
import { Button } from "@/components/ui/button";

export function Quizzer({ quizzesIDs }: { quizzesIDs: number[] }) {
  const {
    quiz,
    isLoading,
    error,
    handleNextQuiz,
    handlePreviousQuiz,
    currentQuizIndex,
  } = useQuizzer({ quizzesIDs });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <pre>{JSON.stringify(quiz, null, 2)}</pre>
      <div className="flex justify-between  mx-4">
        <Button onClick={handlePreviousQuiz} disabled={currentQuizIndex === 0}>
          Previous Quiz
        </Button>
        <Button
          onClick={handleNextQuiz}
          disabled={currentQuizIndex === quizzesIDs.length - 1}
        >
          Next Quiz
        </Button>
      </div>
    </div>
  );
}
