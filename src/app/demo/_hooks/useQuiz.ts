"use client";
import { useState, useEffect } from "react";
import { Question, WordItem, VocabularyItem, Quiz } from "../_lib/types";
import { shuffleArray, getWords } from "../_lib/helpers";

export function useQuiz(vocs: VocabularyItem[], count = 10) {
  const words: WordItem[] = getWords(vocs);

  const getUrduOptions = (w: WordItem) => {
    // create a list of all urdu values except the correct answer

    const urduOptions: string[] = [];
    for (const word of words) {
      if (word.wordID !== w.wordID) {
        urduOptions.push(word.urdu);
      }
    }
    const shuffled = shuffleArray(urduOptions);
    return [...shuffled.slice(0, 3), w.urdu];
  };

  // create a list of arabic options except the correct answer
  const getArabicOptions = (w: WordItem) => {
    const arabicOptions: string[] = [];
    for (const word of words) {
      if (word.wordID !== w.wordID) {
        arabicOptions.push(word.arabic);
      }
    }
    const shuffled = shuffleArray(arabicOptions);
    return [...shuffled.slice(0, 3), w.arabic];
  };

  // create  audio-ur questions
  const generateAudioUrQuestions = () => {
    const questions: Question[] = [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const options = getArabicOptions(word);
      const correctAnswer = word.arabic;
      const question: Question = {
        id: word.wordID,
        type: "audio-ur",
        queston: "اختر الترجمة الصحيحة: ",
        text: word.urdu,
        options: shuffleArray(options),
        correctAnswer: correctAnswer,
        audioFile: word.audioFile,
      };
      questions.push(question);
    }
    return questions;
  };

  const generateArUrQuestions = () => {
    const questions: Question[] = [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const options = getUrduOptions(word);
      const correctAnswer = word.urdu;
      const question: Question = {
        id: word.wordID,
        type: "ar-ur",
        queston: "اختر الكلمة المرادفة: ",
        text: word.arabic,
        options: shuffleArray(options),
        correctAnswer: correctAnswer,
        audioFile: word.audioFile,
      };
      questions.push(question);
    }
    return questions;
  };
  // return quizzes;
  const questions = [...generateAudioUrQuestions(), ...generateArUrQuestions()];
  const shuffledQuestions = shuffleArray(questions);
  const quizzes = shuffledQuestions.map((question, index) => {
    return {
      id: `${question.type}-${index}`,
      question: question,
    };
  });
  return quizzes;
}
