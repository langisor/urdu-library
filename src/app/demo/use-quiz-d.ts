"use client";
import * as React from "react";
import { QuizDItem } from "./definitions";
import {
  getRandomUrduAlphabets,
  getAudioUrl,
  getImageUrl,
  shuffleArray,
} from "./helpers-types";
import { useHookstate } from "@hookstate/core";

type ConvertDQuestion = {
  prompt: {
    text: string;
    audioFile: string;
    correctOptionId: string;
  };
  options: {
    id: string;
    text: string;
    image: string;
  }[];
};

const convertD = (quiz: QuizDItem): ConvertDQuestion[] => {
  const _questions: ConvertDQuestion[] = [];
  for (let i = 0; i < quiz.alts.length; i++) {
    _questions.push({
      prompt: {
        text: quiz.alts[i].text,
        audioFile: getAudioUrl(quiz.sols[i].key),
        correctOptionId: quiz.sols[i].key,
      },
      options: quiz.sols.map((sol, index) => {
        return {
          id: sol.key,
          text: sol.text,
          image: getImageUrl(quiz.alts[index].image),
        };
      }),
    });
  }
  const questions = shuffleArray(_questions);
  return questions;
};

export function useQuizD(quizData: QuizDItem) {
  const questions = useHookstate(convertD(quizData));

  const currentQuestionIndex = useHookstate(0);

  const currentQuestion = questions[currentQuestionIndex.get()];
  const nextQuestion = () => {
    currentQuestionIndex.set(currentQuestionIndex.get() + 1);
  };
  const checkAnswer = (selectedOptionId: string) => {
    const isCorrect =
      selectedOptionId === currentQuestion.prompt.correctOptionId.get();
    return isCorrect;
  };

  return {
    actions: {
      checkAnswer: checkAnswer,
      nextQuestion: nextQuestion,
      getCurrentQuestionIndex: currentQuestionIndex.get(),
    },
    questions: questions.get(),
  };
}
