
export type QuizDItem = {
  id: number
  alts: Array<{
    key: string
    text: string
    image: string
    phonetic: string
    audio_updated_at: number
    image_updated_at: number
  }>
  sols: Array<{
    key: string
    text: string
    audio_updated_at: number
  }>
  type: string
  lesson: number
  wordID: number
  modifiers: number
  alternates: Array<number>
}

export interface Option {
  text: string;
  image: string;
  phonetic: string;
}


export interface Question {
  id: number; // audio_updated_at
  audioFile: string;
  text: string;
  correctAnswer: string;
  isAnswered: boolean;
  options: Array<Option>; // sols
}
export type QuizDState = {
  currentQuestionIndex: number
  questions: Array<Question>
  score: number
  isComplete: boolean
}
import { getAudioUrl, getImageUrl, shuffleArray } from "../helpers";
export function convertToQuestions(quizItem: QuizDItem): Question[] {
  const questions = quizItem.alts.map((alt, index) => ({
    id: alt.audio_updated_at,
    audioFile: getAudioUrl(alt.key),
    text: alt.text,
    correctAnswer: quizItem.sols[index].text,
    isAnswered: false,
    options: shuffleArray(getOptions(quizItem)),
  }));

  return shuffleArray(questions);
}

const getOptions = (quizItem: QuizDItem) => {
  return quizItem.alts.map((alt,index) => ({
    text: quizItem.sols[index].text,
    image: getImageUrl(alt.key),
    phonetic: alt.phonetic,
  }));
}