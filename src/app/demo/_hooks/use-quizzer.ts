"use client";
import * as React from "react";

interface QuizzerState {
  quizzes: Array<any>;
}

/**
 * hook to manage showed quizzes
 * @param quizzes: Array<any> of quizzes (D,T1,T2,...)
 * @returns
 */
export function useQuizzer({ quizzes }: QuizzerState) {
  const [currentQuizIndex, setCurrentQuizIndex] = React.useState(0);
  const [isQuizComplete, setIsQuizComplete] = React.useState(false);
  const handleNextQuiz = () => {
    if (currentQuizIndex === quizzes.length - 1) {
      setIsQuizComplete(true);
      return;
    }
    setCurrentQuizIndex((prev) => prev + 1);
  };
  const handlePreviousQuiz = () => {
    if (currentQuizIndex === 0) return;
    setCurrentQuizIndex((prev) => prev - 1);
  };

  return {
    currentQuizIndex,
    setCurrentQuizIndex,
    handleNextQuiz,
    handlePreviousQuiz,
    isQuizComplete,
  };
}
