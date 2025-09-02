import { getAudioUrl, getImageUrl, shuffleArray } from "../helpers";

export type QuizFItem = {
  id: number;
  alts: Array<{
    key: string;
    text: string;
    image: string;
    phonetic: string;
    audio_updated_at: number;
    image_updated_at: number;
  }>;
  sols: Array<{
    key: string;
    text: string;
    audio_updated_at: number;
  }>;
  type: string;
  lesson: number;
  wordID: number;
  modifiers: number;
  alternates: Array<number>;
};
export interface Option {
  image: string;
  text: string;
  phonetic: string;
}

export interface Question {
  id: number;
  audioFile: string;
  text: string;
  correctAnswer: string;
  isAnswered: boolean;
  options: Array<Option>;
}

export function convertToQuestions(quizItem: QuizFItem): Question[] {
  const questions = quizItem.alts.map((alt, index) => ({
    id: alt.audio_updated_at,
    audioFile: getAudioUrl(alt.key),
    text: alt.text,
    correctAnswer: quizItem.sols[index].text,
    isAnswered: false,
    options: shuffleArray(getOptions(quizItem)),
  }));

  return questions;
}

const getOptions = (quizItem: QuizFItem) => {
  return quizItem.alts.map((alt, index) => ({
    text: quizItem.sols[index].text,
    image: getImageUrl(alt.image),
    phonetic: alt.phonetic,
  }));
};
