"use client";
import { QuizC1bItem } from "../../definitions";
import { shuffleArray, getAudioUrl, removeValues } from "../../helpers-types";
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



  // build targetWordList from ord and tokens
  const targetWordList = quizData.ord.map((ordKey) => {
    const token = quizData.tokens.find((token) => token.key === ordKey);
    return token?.raw.text;
  });

  const _correctText = quizData.sols[1].text;
  const _audioFile = getAudioUrl(quizData.sols[0].key);
  const _questionText = quizData.sols[0].text;

  // remove duplicate words from wordsList except correct word
  const wordsListWithoutDuplicate = removeValues(_wordsList, targetWordList);
  //  remove placeholder
  const wordsListWithoutPlaceholder = removeValues(_wordsList, [
    PLACEHOLDER,
  ]);
  // add correct word to wordsList
  const wordsListWithCorrectWord = [
    ...wordsListWithoutPlaceholder,
    _correctWord,
  ];
  console.log("wordsListWithCorrectWord", wordsListWithCorrectWord);
  return {
    wordsList: shuffleArray(wordsListWithCorrectWord),
    targetWordList: targetWordList,
    correctWord: _correctWord,
    completeIndex: _completeIndex,
    audioFile: _audioFile,
    questionText: _questionText,
    correctText: _correctText,
  };
}
