import { QuizFItem } from "../definitions";
import { convertF } from "./converters";
import { useHookstate } from "@hookstate/core";
import * as React from "react";

export default function useF(quizItem: QuizFItem) {
  const state = useHookstate(() => {
    return {
      questions: convertF(quizItem),
      currentQuestionIndex: 0,
      isComplete: false,
      feedback: null as { isCorrect: boolean; text: string } | null,
    };
  });
  const { questions, currentQuestionIndex, isComplete, feedback } = state;
  // actions
  const actions = {
    nextQuestion: () => {
      currentQuestionIndex.set(currentQuestionIndex.get() + 1);
    },
    prevQuestion: () => {
      currentQuestionIndex.set(currentQuestionIndex.get() - 1);
    },
    answerQuestion: (answer: string) => {
      const question = questions[currentQuestionIndex.value];

      if (question.correctAnswer.get() === answer) {
        state.feedback.set({
          isCorrect: true,
          text: "Correct!",
        });
      } else {
        state.feedback.set({
          isCorrect: false,
          text: "Wrong!",
        });
      }
    },
    reset: () => {
      currentQuestionIndex.set(0);
      isComplete.set(false);
      feedback.set(null);
    },
  };

  return {
    questions,
    currentQuestionIndex,
    isComplete,
    feedback,
    actions,
  };
}
