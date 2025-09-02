"use client";
import * as React from "react";
import { QuizQbItem, QuizQbState } from "./definitions";
import { convertToQuestions } from "./definitions";
import { useTune } from "../use-tune";
export function useQuizQb(quizItem: QuizQbItem) {
  const [quizState, setQuizState] = React.useState<QuizQbState>({
    questions: convertToQuestions(quizItem),
    currentQuestionIndex: 0,
    isComplete: false,
    feedback: null,
  });
  const { playCorrectTune, playIncorrectTune } = useTune();

  const nextQuestion = () => {
    if (quizState.currentQuestionIndex === quizState.questions.length - 1) {
      setQuizState({
        ...quizState,
        isComplete: true,
      });
      return;
    }
    setQuizState({
      ...quizState,
      currentQuestionIndex: quizState.currentQuestionIndex + 1,
    });
  };
  const checkAnswer = (answer: string) => {
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
    nextQuestion,
    checkAnswer,
    resetQuiz,
  };
}
