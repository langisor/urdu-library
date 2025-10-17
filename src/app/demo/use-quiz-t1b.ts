"use client";
import * as React from "react";
import { QuizT1bItem } from "./definitions";
import {
  getRandomUrduAlphabets,
  getAudioUrl,
  getImageUrl,
  shuffleArray,
} from "./helpers-types";
import { useHookstate } from "@hookstate/core";

export type ConvertT1bQuestion = {
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

// const convertT1b = (quiz: QuizT1bItem): ConvertT1bQuestion[] => {
 
// };

export function useQuizT1b(quizData: QuizT1bItem) {
   
}
