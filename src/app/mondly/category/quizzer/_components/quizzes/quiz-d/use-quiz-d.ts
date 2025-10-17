"use client";
import { QuizDItem } from "../../definitions";
import { useHookstate } from "@hookstate/core";
import { convertD } from "./converter";

export function useQuizD(quizData: QuizDItem) {
  const questions = useHookstate(convertD(quizData));

  const currentQuestionIndex = useHookstate(0);

  const currentQuestion = questions[currentQuestionIndex.get()];

  return {
    actions: {
      getCurrentQuestionIndex: currentQuestionIndex.get(),
      getCurrentQuestion: currentQuestion,
      goToNextQuestion: () => {
        currentQuestionIndex.set(currentQuestionIndex.get() + 1);
      },
      getQuestionsCount: () => {
        return questions.length;
      },
    },
  };
}
