"use client";
import * as React from "react";
import { QuizC1bItem } from "../../definitions";
import { shuffleArray, getAudioUrl } from "../../helpers-types";
import { useHookstate, State } from "@hookstate/core";
import { convertC1b } from "./convertC1b";
import { useTune } from "@/hooks/use-tone";

const PLACEHOLDER = "_____";

export function useC1b(quizData: QuizC1bItem) {
  //  states
  const selectedWord = useHookstate<string>(PLACEHOLDER);
  const { playCorrectTune, playIncorrectTune } = useTune();

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

  // remove placeholder from wordsList
  const wordsListWithoutPlaceholder = wordsList.filter(
    (word) => word !== PLACEHOLDER
  );
  console.log("useC1b quizData invoked ...");
  console.log("targetWordListWithSelectedWord", wordsListWithoutPlaceholder);


  // functions

  const checkAnswer = () => {
    console.log("checkAnswer()...");
    if (selectedWord.value === correctWord) {
      playCorrectTune();
      return true;
    } else {
      playIncorrectTune();
      return false;
    }
  };
  const handleSelectWord = (word: string) => {
    console.log("handleWordClick", word);
    if (selectedWord.value === PLACEHOLDER) {
      selectedWord.set(word);
    } else {
      //  save a copy
      const prevSelectedWord = selectedWord.value;
      selectedWord.set(word);
      // restore prevSelectedWord into wordsList
      const wordsListCopy = [...wordsList];
      wordsListCopy[completeIndex] = prevSelectedWord;
      selectedWord.set(wordsListCopy[completeIndex]);
    }
  };
  return {
    interactiveData: {
      wordsList: wordsListWithoutPlaceholder,
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
      checkAnswer,
    },
  };
}
