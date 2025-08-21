"use client";
import { useState, useEffect } from "react";
import { Question, WordItem, VocabularyItem } from "../_lib/types";
import { shuffleArray } from "../_lib/helpers";

interface UseQuizProps {
  vocs: VocabularyItem[];
  length?: number;
}
const getWords = ({ vocs, length = 10 }: UseQuizProps): WordItem[] => {
  const words: WordItem[] = [];
  for (const voc of vocs) {
    words.push({
      wordID: voc.wordID,
      arabic: voc.sols[0].text,
      urdu: voc.sols[1].text,
      audioFile: voc.key,
    });
  }
  return words;
};
export function useQuiz({ vocs }: UseQuizProps) {
  const [words, setWords] = useState<WordItem[]>([]);

  useEffect(() => {
    const words = getWords({ vocs });
    setWords(words);
  }, [vocs]);

  // create a list of urdu optins except the correct answer
  const getUrduOptions = (w: WordItem) => {
    // create a list of all urdu values except the correct answer
    const words = getWords({ vocs });
    const urduOptions: string[] = [];
    for (const word of words) {
      if (word.wordID !== w.wordID) {
        urduOptions.push(word.urdu);
      }
    }
    return urduOptions;
  };

  // create a list of arabic options except the correct answer
  const getArabicOptions = (w: WordItem) => {
    // create a list of all arabic values except the correct answer
    const words = getWords({ vocs });
    const arabicOptions: string[] = [];
    for (const word of words) {
      if (word.wordID !== w.wordID) {
        arabicOptions.push(word.arabic);
      }
    }
    // return 3 random options
    return shuffleArray(arabicOptions).slice(0, 3);
  };

  // create  audio-ur questions
  const getAudioUrQuestions = () => {
    const questions: Question[] = [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      // get arabic options and shuffle them
      const arabicOptions = getArabicOptions(word);
      // add correct answer to options
      arabicOptions.push(word.arabic);
      // shuffle options
      const shuffledOptions = shuffleArray(arabicOptions);
      questions.push({
        id: i + 1,
        type: "audio-ur",
        queston: "اختر الترجمة الصحيحة: ",
        text: word.urdu,
        options: shuffledOptions,
        correctAnswer: word.arabic,
        audioFile: word.audioFile,
      });
    }
    // return half of length questions
    return questions.slice(0, Math.floor(length / 2));
  };

  // create  ar-ur questions
  const getArUrQuestions = () => {
    const questions: Question[] = [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      // get urdu options and shuffle them
      const urduOptions = getUrduOptions(word);
      // add correct answer to options
      urduOptions.push(word.urdu);
      // shuffle options
      const shuffledOptions = shuffleArray(urduOptions);
      questions.push({
        id: i + 1,
        type: "ar-ur",
        queston: "اختر الكلمة الصحيحة: ",
        text: word.arabic,
        options: shuffledOptions,
        correctAnswer: word.urdu,
      });
    }
    // return half of length questions
    return questions.slice(0, Math.floor(length / 2));
  };

  const questions = [...getAudioUrQuestions(), ...getArUrQuestions()];
  return {
    questions,
  };
}
