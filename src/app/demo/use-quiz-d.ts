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

export type ConvertDQuestion = {
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
  // shuffle options
  questions.forEach((question) => {
    question.options = shuffleArray(question.options);
  });
  return questions;
};

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
    },
  };
}
