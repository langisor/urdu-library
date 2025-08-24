import { getAudioUrl, shuffleArray } from "../helpers";
export type QuizQBItem = {
  id: number;
  alts: Array<{
    key: string;
    text: string;
    phonetic: string;
    audio_updated_at: number;
  }>;
  sols: Array<{
    key: string;
    text: string;
    dictionary?: Array<{
      raw: string;
      translations: Array<{
        text: string;
        type: string;
        phonetic: string;
      }>;
    }>;
    phraseType?: number;
    text_tokens?: Array<{
      raw: {
        text: string;
        length: number;
        location: number;
      };
      linker: {
        text: string;
        length: number;
        location: number;
      };
      prefix: {
        text: string;
        length: number;
        location: number;
      };
      suffix: {
        text: string;
        length: number;
        location: number;
      };
    }>;
    audio_updated_at?: number;
  }>;
  type: string;
  lesson: number;
  wordID: number;
  modifiers: number;
  alternates: Array<number>;
};

export interface Question {
  id: number;
  audioFile: string;
  text: string; //question
  phonetic: string;
  correctAnswer: string; //sols
  options: string[];
}

export type QuizQBState = {
  questions: Question[];
  currentQuestionIndex: number;
  isComplete: boolean;
  feedback: { isCorrect: boolean; text: string } | null;
};

export function convertToQuestions(quizItem: QuizQBItem): Question[] {
  const questions = quizItem.alts.map((alt, index) => ({
    id: alt.audio_updated_at,
    audioFile: getAudioUrl(alt.key),
    text: alt.text,
    phonetic: alt.phonetic,
    correctAnswer: quizItem.sols[index].text,
    options: shuffleArray(quizItem.sols.map((sol) => sol.text)),
  }));
  return questions;
}
