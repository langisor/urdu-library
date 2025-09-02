"use client";
import * as React from "react";
import { useQuiz } from "../_hooks/use-quiz";

export function useQuizzer({ quizzesIDs }: { quizzesIDs: number[] }) {
  const [currentQuizIndex, setCurrentQuizIndex] = React.useState(0);
  const { quiz, isLoading, error } = useQuiz({
    qid: quizzesIDs[currentQuizIndex],
  });
  const handleNextQuiz = () => {
    setCurrentQuizIndex(currentQuizIndex + 1);
  };
  const handlePreviousQuiz = () => {
    setCurrentQuizIndex(currentQuizIndex - 1);
  };
  return {
    quiz,
    isLoading,
    error,
    handleNextQuiz,
    handlePreviousQuiz,
    currentQuizIndex,
  };
}
