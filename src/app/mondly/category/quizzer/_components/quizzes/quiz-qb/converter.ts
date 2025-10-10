"use client";

import { QuizQbItem } from "../../definitions";
import {
  shuffleArray,
  getAudioUrl,
  getImageUrl,
  Feedback,
} from "../../helpers-types";
 
 export function convertQb(quizData: QuizQbItem) {
  const _questions = [];
  for (let i = 0; i < quizData.sols.length; i++) {
    _questions.push({
      id: quizData.sols[i].key,
      audioFile: getAudioUrl(quizData.sols[i].key),
      text: quizData.sols[i].text,
      isAnswer: false,
      options: quizData.alts.map((alt) => {
        return {
          id: alt.key,
          text: alt.text,
        };
      }),
    });
  }
  return shuffleArray(_questions);
}