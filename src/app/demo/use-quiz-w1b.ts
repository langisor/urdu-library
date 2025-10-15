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
  };
  correctAnswer: {
    image: string;
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
  };
  const correctAnswer: ConvertW1bReturn["correctAnswer"] = {
    image: getImageUrl(quiz.sols[1].image!),
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
  const [readyToConfirm, setReadyToConfirm] = React.useState(false);

  const checkAnswer = () => {};
 
  const resetQuiz = () => {};
  return {
    actions: {
      getPrompt: quizState.prompt.get(),
    },
    quizInfo:quizState.get()
  };
}
