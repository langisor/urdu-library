"use client";
import * as React from "react";
import { QuizDItem } from "./definitions";
import {
  getRandomUrduAlphabets,
  getAudioUrl,
  getImageUrl,
} from "./helpers-types";
import { useHookstate } from "@hookstate/core";

type ConvertDReturn = {
  //  return 4 questions objects
};

const convertD = (quiz: QuizDItem): ConvertDReturn => {
  return {};
};

export function useQuizD(quizData: QuizDItem) {}
