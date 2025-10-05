"use client";
import * as React from "react";
import { QuizC1bItem } from "../mondly/category/quizzer/_components/definitions";
import {
  shuffleArray,
  getAudioUrl,
} from "../mondly/category/quizzer/_components/helpers-types";
import { useHookstate, State } from "@hookstate/core";
import { convertC1b } from "./convertC1b";

type ConvertC1bReturn = {
  wordsList: string[];
  targetWordList: (string | undefined)[];
  correctWord: string | undefined;
  completeIndex: number;
  audioFile: string;
  questionText: string;
  correctText: string;
};
export function useC1b(quizData: QuizC1bItem) {


  const selectedWord = useHookstate<string>("______");
  const isAnswered = useHookstate<boolean>(false);
  const isCorrect = useHookstate<boolean | null>(null);

  const {
    wordsList,
    targetWordList,
    correctWord,
    completeIndex,
    audioFile,
    questionText,
    correctText,
  } = React.useMemo(() => convertC1b(quizData), [quizData]);
  // replace correctText in targetWordList
  const targetWordListWithSelectedWord = targetWordList.map((word, index) => {
    if (index === completeIndex) {
      return selectedWord.value;
    }
    return word;
  });

  // functin to reset convertC1b quiz
  const reset = () => {
    selectedWord.set("______");
    isAnswered.set(false);
    isCorrect.set(null);
  };

  const handleWordClick = (word: string) => {
    console.log("handleWordClick", word);

    if (!isAnswered.value) {
      selectedWord.set(word);
      isAnswered.set(true);
    } else {
      isAnswered.set(true);
      const oldWord = selectedWord.value;
      selectedWord.set(word);
      // remove from wordsList
      wordsList.splice(wordsList.indexOf(oldWord), 1);
    }
  };

  console.log("useC1b quizData invoked ...");
  return {
    interactiveData: {
      wordsList,
      targetWordList: targetWordListWithSelectedWord,
    },
    staticData: {
      audioFile,
      questionText,
      correctText,
      correctWord,
      completeIndex,
    },
    actions: {
      handleWordClick,
      reset,
      isAnswered: isAnswered.get(),
      isCorrect: isCorrect.get(),
    },
  };
}
