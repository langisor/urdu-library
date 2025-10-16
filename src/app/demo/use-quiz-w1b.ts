"use client";
import * as React from "react";
import { QuizW1bItem } from "./definitions";
import {
  getRandomUrduAlphabets,
  getAudioUrl,
  getImageUrl,
} from "./helpers-types";
import { useHookstate } from "@hookstate/core";

type ConvertW1bReturn = {
  correctOrd: string[];
  tokens: {
    id: string;
    text: string;
  }[];
  prompt: {
    audioFile: string;
    text: string;
    image: string;
  };
  correctAnswer: {
   
    text: string;
  };
};

const convertW1b = (quiz: QuizW1bItem): ConvertW1bReturn => {
  const correctOrd = quiz.ord;
  const tokens: ConvertW1bReturn["tokens"] = quiz.tokens.map((t) => {
    return {
      id: t.key,
      text: t.text,
    };
  });
  const prompt: ConvertW1bReturn["prompt"] = {
    audioFile: getAudioUrl(quiz.sols[0].key),
    text: quiz.sols[0].text,
    image: getImageUrl(quiz.sols[1].image!),
      };
  const correctAnswer: ConvertW1bReturn["correctAnswer"] = {
     
    text: quiz.sols[1].text,
  };
  return {
    correctOrd,
    tokens,
    prompt,
    correctAnswer,
  };
};

export function useQuizW1b(quizData: QuizW1bItem) {
  const quizState = useHookstate(convertW1b(quizData));

  const getTokenId = (text: string) => {
    const token = quizState.tokens.get().find((t) => t.text === text);
    return token?.id;
  };
  const checkAnswer = (inputText: string) => {
      const correctOrd = quizState.correctOrd.get();
       const inputOrd = inputText.split("").map((t) => getTokenId(t));
       const isCorrect = correctOrd.every((c, i) => c === inputOrd[i]);
       return isCorrect;
  };
 
  const resetQuiz = () => {
    quizState.set(convertW1b(quizData));
   
    };
  return {
    actions: {
      getPrompt: quizState.prompt.get(),
      getTokens: quizState.tokens.get(),
      checkAnswer,
      resetQuiz,
    },
    quizInfo:quizState.get(),

  };
}
