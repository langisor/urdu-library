"use client";
import * as React from "react";
import { QuizC1bItem } from "../mondly/category/quizzer/_components/definitions";
import { shuffleArray } from "../mondly/category/quizzer/_components/helpers-types";
import { useHookstate } from "@hookstate/core";
type Word = {
  text: string;
  isCompleteToken: boolean;
};

function convertC1b(quizData: QuizC1bItem) {
  const targetList = new Map<string, Word>();
  const wordsList = new Map<string, Word>();
  const completeToken = quizData.completeToken;
  const placeHolderToken = "_____";
  const completeIndex = quizData.ord.findIndex(
    (ordKey) => ordKey === completeToken
  );
  // move blank token to the end of wordsList

  // targetList
  const allTokens = new Map<string, Word>();
  //  fill allTokens
  quizData.tokens.forEach((token) => {
    allTokens.set(token.key, {
      text: token.raw.text,
      isCompleteToken: token.key === completeToken,
    });
  });

  // remove '_____' from allTokens
  const blankKey = allTokens
    .keys()
    .find((key) => allTokens.get(key)?.text === placeHolderToken);
  if (blankKey) {
    allTokens.delete(blankKey);
  }
  // fill up targetList
  Array.from(allTokens.keys()).forEach((key) => {
    if (quizData.ord.includes(key)) {
      targetList.set(key, allTokens.get(key)!);
    }
  });
  // remove isCompleteToken from targetList
  targetList.forEach((word, key) => {
    if (word.isCompleteToken) {
      targetList.delete(key);
    }
  });
  // fill up wordsList
  Array.from(allTokens.keys()).forEach((key) => {
    wordsList.set(key, allTokens.get(key)!);
  });

  // remove duplicate
  targetList.keys().forEach((key) => {
    wordsList.delete(key);
  });

  return {
    targetList,
    wordsList,
    completeIndex,
    completeToken,
  };
}

export function useC1b(quizData: QuizC1bItem) {
  const { targetList, wordsList, completeIndex, completeToken } =
    convertC1b(quizData);

  const handleWordClick = (word: Word, key: string) => {
    console.log("Clicked Word: ", word, "Key: ", key);
    
  };
  const reset = () => {
    console.log("Quiz Reset....");
  };

  return {
    words: {
      targetList,
      wordsList,
    },
    actions: {
      handleWordClick,
      reset,
    },
    completeIndex,
    completeToken,
  };
}
