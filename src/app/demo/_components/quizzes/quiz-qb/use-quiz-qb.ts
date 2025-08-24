"use client";
import * as React from "react";
import { QuizQBItem, QuizQBState } from "./definitions";
import { convertToQuestions } from "./definitions";
export function useQuizQB(quizItem: QuizQBItem) {
  const [quizState, setQuizState] = React.useState<QuizQBState>({
    questions: [],
    currentQuestionIndex: 0,
    isComplete: false,
    feedback: null,
  });
  React.useEffect(() => {
    setQuizState((q) => ({
      ...q,
      questions: convertToQuestions(quizItem),
    }));
  }, [quizItem]);
  const startQuiz = () => {
    setQuizState({
      ...quizState,
      isComplete: false,
    });
  };
  const nextQuestion = () => {
    setQuizState({
      ...quizState,
      currentQuestionIndex: quizState.currentQuestionIndex + 1,
    });
  };
  const checkSelection = (answer: string) => {
    const isCorrect =
      answer ===
      quizState.questions[quizState.currentQuestionIndex].correctAnswer;
    setQuizState({
      ...quizState,
      feedback: {
        isCorrect,
        text: isCorrect
          ? "Correct! ✅"
          : `Incorrect. The correct answer is: ${
              quizState.questions[quizState.currentQuestionIndex].correctAnswer
            } ❌`,
      },
    });
    setTimeout(() => {
      nextQuestion();
      setQuizState({
        ...quizState,
        feedback: null,
      });
    }, 1500);
  };
  const resetQuiz = () => {
    setQuizState({
      ...quizState,
      currentQuestionIndex: 0,
      isComplete: false,
      feedback: null,
    });
  };
  return {
    quizState,
    startQuiz,
    nextQuestion,
    checkSelection,
    resetQuiz,
  };
}
