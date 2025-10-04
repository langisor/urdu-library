"use client";
import * as React from "react";
import { QuizC1bItem } from "../mondly/category/quizzer/_components/definitions";
import { shuffleArray } from "../mondly/category/quizzer/_components/helpers-types";
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
  quizData.ord.forEach((ordKey) => {
    const token = quizData.tokens.find((token) => token.key === ordKey);
    if (token) {
      targetList.set(ordKey, {
        text: token.key === completeToken ? placeHolderToken : token.raw.text,
        isCompleteToken: token.key === completeToken,
      });
    }
  });
  // wordsList
  quizData.tokens.forEach((token) => {
    const isTargetToken = targetList.has(token.key);
    if (!isTargetToken) {
      wordsList.set(token.key, {
        text: token.raw.text,
        isCompleteToken: token.key === completeToken,
      });
    }
  });
  // add complete token to the end of wordsList
  const completeWord = quizData.tokens.find(
    (token) => token.key === completeToken
  );
  if (completeWord) {
    wordsList.set(completeToken, {
      text: completeWord.raw.text,
      isCompleteToken: true,
    });
    //
  }
  // remove '_____' from wordsList

  wordsList.forEach((word, key) => {
    if (word.text === placeHolderToken) {
      wordsList.delete(key);
    }
  });

  return {
    targetList,
    wordsList,
    completeIndex,
    placeHolderToken,
  };
}

export function useC1b(quizData: QuizC1bItem) {
  const { targetList, wordsList, completeIndex } = convertC1b(quizData);

  const targetTokens = React.useMemo(() => {
    return Array.from(targetList.values());
  }, [targetList]);

  const wordsTokens = React.useMemo(() => {
    return shuffleArray(Array.from(wordsList.values()));
  }, [wordsList]);

  return {
    targetTokens,
    wordsTokens,
    completeIndex,
  };
}
