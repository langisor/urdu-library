"use client";
import * as Quizzes from "./quizzes";
import { JsonViewerComponent } from "@/components/json-viewer";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuizzer } from "../_hooks/use-quizzer";
import { ResultScreen } from "./result-screen";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  // if last quiz is completed, show result screen
  if (currentQuizIndex === quizzesIDs.length - 1) {
    return <ResultScreen score={quiz.score} />;
  }
  const renderProgress = () => {
    return (
      <div className="flex justify-around my-4  mx-4">
        <Button onClick={handlePreviousQuiz} disabled={currentQuizIndex === 0}>
          Previous Quiz
        </Button>
        <div>
          <h2 className="text-xl font-bold mb-4">
            Quiz {currentQuizIndex + 1} of {quizzesIDs.length} -{" "}
            <Badge className="ml-2" variant="default">
              {quiz.type}
            </Badge>
          </h2>
        </div>
        <Button
          onClick={handleNextQuiz}
          disabled={currentQuizIndex === quizzesIDs.length - 1}
        >
          Next Quiz
        </Button>
      </div>
    );
  };
  const renderQuiz = () => {
    switch (quiz.type) {
      case "D":
        return (
          <Quizzes.QuizD quizItem={quiz} handleNextQuiz={handleNextQuiz} />
        );
      case "T1":
        return (
          <Quizzes.QuizT1 quizItem={quiz} handleNextQuiz={handleNextQuiz} />
        );
      case "T2":
        return (
          <Quizzes.QuizT2 quizItem={quiz} handleNextQuiz={handleNextQuiz} />
        );
      case "Qb":
        return (
          <Quizzes.QuizQb quizItem={quiz} handleNextQuiz={handleNextQuiz} />
        );

      default:
        return (
          <Card>
            <CardContent>
              <p>not ready - {quiz.type}</p>
            </CardContent>
          </Card>
        );
    }
  };
  return (
    <div>
      <JsonViewerComponent data={quiz} />
      {renderProgress()}
    </div>
  );
}
