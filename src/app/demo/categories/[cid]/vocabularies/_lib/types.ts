export type QuestionType = "audio-ur" | "ar-ur";

export interface WordItem {
  wordID: number;
  urdu: string;
  arabic: string;
  audioFile: string;
}

export interface Question {
    id:number;
  // audio-ar : user see urdu word and hears audio and has to choose the correct arabic  option
  // ar-ur: user see arabic word and has to choose the correct urdu option
  type: QuestionType;
  question:string;
  text:string;
  options:string[];
  correctAnswer: string;
  audioFile?:string;
}

 export interface Quiz{
    id:number | string;
    question:Question;
 }
export interface VocabularyItem {
  id: number;
  vocabulary: number;
  wordID: number;
  key: string;
  sols: Sol[];
  audio_updated_at: number;
}

interface Sol {
  key: string;
  text: string;
  dictionary: Dictionary[];
  phonetic?: string;
}

interface Dictionary {
  raw: string;
  translations: Translation[];
}

interface Translation {
  type: string;
  text: string;
  phonetic: any;
}
