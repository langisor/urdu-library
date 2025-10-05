"use client";
import { QuizC1bItem } from "../../definitions";
import {
  shuffleArray,
  getAudioUrl,
} from "../../helpers-types";
type Word = {
  text: string;
};
const PLACEHOLDER = "_____";

export function convertC1b(quizData: QuizC1bItem) {
  const _wordsList = quizData.tokens.map((token) => token.raw.text);
  const _correctWord = quizData.tokens.find(
    (token) => token.key === quizData.completeToken
  )?.raw.text;
  const _completeIndex = quizData.ord.findIndex(
    (ordKey) => ordKey === quizData.completeToken
  );
 
  // remove duplicate words
  const wordsList = _wordsList.filter(
    (word, index) => _wordsList.indexOf(word) === index
  );

  // build targetWordList from ord and tokens
  const targetWordList = quizData.ord.map((ordKey) => {
    const token = quizData.tokens.find((token) => token.key === ordKey);
    return token?.raw.text;
  });


  const _correctText = quizData.sols[1].text;
  const _audioFile = getAudioUrl(quizData.sols[0].key);
  const _questionText = quizData.sols[0].text;

  console.log("convertC1b quizData invoked ...");
  return {
    wordsList: wordsList,
    targetWordList: targetWordList,
    correctWord: _correctWord,
    completeIndex: _completeIndex,
    audioFile: _audioFile,
    questionText: _questionText,
    correctText: _correctText,
  };
}
