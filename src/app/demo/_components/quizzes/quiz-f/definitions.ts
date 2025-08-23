
export type QuizFItem = {
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

export interface Question {
  id: number; // audio_updated_at
  audioFile: string;
  text: string;
  image: string;
  phonetic: string;
  correctAnswer: string;
  options: Array<string>; // sols
}
export type QuizDState = {
  currentQuestionIndex: number
  questions: Array<Question>
  score: number
  isComplete: boolean
}
import { getAudioUrl, getImageUrl, shuffleArray } from "../helpers";
export function convertToQuestions(quizItem: QuizFItem): Question[] {
  const questions = quizItem.alts!.map((alt, index) => ({
    id: alt.audio_updated_at,
    audioFile: getAudioUrl(alt.key),
    text: alt.text,
    image: getImageUrl(alt.image),
    phonetic: alt.phonetic,
    correctAnswer: quizItem.sols[index].text,
    options: shuffleArray(quizItem.sols.map((sol) => sol.text)),
  }));

  return questions;
}