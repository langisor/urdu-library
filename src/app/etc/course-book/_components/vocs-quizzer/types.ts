// types.ts


export type LanguageKey = "English" | "Transliteration" | "Urdu" | "Arabic" | "Image";

export interface VocabItem {
  English: string;
  Transliteration: string;
  Urdu: string;
  Arabic: string;
  Image: string; // URL or empty string
}

export interface QuizData {
  unit: number;
  chapter: number;
  type: string;
  number: number;
  id: string;
  table: {
    header: Record<LanguageKey, string>;
    data: VocabItem[];
  };
}

export type QuizMode = 'English' | 'Urdu' | 'Arabic';

export interface QuizState {
  currentWordIndex: number;
  score: number;
  isAnswered: boolean;
  userInput: string;
  isCorrect: boolean | null;
  shuffledWords: VocabItem[];
  quizMode: QuizMode; // The language the user needs to provide
  promptLanguage: 'English' | 'Transliteration' | 'Urdu' | 'Arabic'; // The language shown as the prompt
}

export const getQuizData=(vId:string)=>{
   
}