"use client";
import * as React from "react";
import { QuizC1bItem } from "../mondly/category/quizzer/_components/definitions";
import {
  shuffleArray,
  getAudioUrl,
} from "../mondly/category/quizzer/_components/helpers-types";
import { useHookstate, State } from "@hookstate/core";
import { convertC1b } from "./convertC1b";

const PLACEHOLDER = "______";

export function useC1b(quizData: QuizC1bItem) {
  //  states
  const selectedWord = useHookstate<string>(PLACEHOLDER);

  const {
    wordsList,
    targetWordList,
    correctWord,
    completeIndex,
    audioFile,
    questionText,
    correctText,
  } = React.useMemo(() => convertC1b(quizData), [quizData]);

  // functions
  // replace correctText in targetWordList
  const targetWordListWithSelectedWord = targetWordList.map((word, index) => {
    if (index === completeIndex) {
      return selectedWord.value;
    }
    return word;
  });

  // functin to reset convertC1b quiz

  const handleSelectWord = (word: string) => {
    console.log("handleWordClick", word);
    if (selectedWord.value !== PLACEHOLDER) {
      //  save a copy
      const prevSelectedWord = selectedWord.value;
      selectedWord.set(word);
      // restore prevSelectedWord into wordsList
      const wordsListCopy = [...wordsList];
      wordsListCopy[completeIndex] = prevSelectedWord;
      selectedWord.set(wordsListCopy[completeIndex]);
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
      handleSelectWord,
    },
  };
}
