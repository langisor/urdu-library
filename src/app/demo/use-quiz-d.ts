"use client";
import * as React from "react";
import { QuizDItem } from "./definitions";
import {
  getRandomUrduAlphabets,
  getAudioUrl,
  getImageUrl,
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
  const questions: ConvertDQuestion[] = [];
  let alt_index=0;
  Array.from({ length: 4 }, () => {
    questions.push({
      prompt: {
        text: quiz.alts[alt_index].text,
        audioFile: getAudioUrl(quiz.sols[0].key),
        correctOptionId: quiz.sols[0].key,
      },
      options: quiz.sols.map((sol, index) => {
        return {
          id: sol.key,
          text: sol.text,
          image: getImageUrl(quiz.alts[index].image),
        };
      }),
    });
    alt_index++;
  });
  return questions;
};

export function useQuizD(quizData: QuizDItem) {
  const questions = useHookstate(convertD(quizData));

  const currentQuestionIndex = useHookstate(0);

  const currentQuestion = questions[currentQuestionIndex.get()];
  
  const checkAnswer = (selectedOptionId: string) => {
    const isCorrect =
      selectedOptionId === currentQuestion.prompt.correctOptionId.get();
    return isCorrect;
  };

  return {
    actions: {
      checkAnswer: checkAnswer,
    },
    currentQuestion: currentQuestion.get({ noproxy: true }),
  };
}
