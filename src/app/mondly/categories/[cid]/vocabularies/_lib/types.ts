export interface Dictionary {
  raw: string;
  translations: Array<{
    type: string;
    text: string;
    phonetic: string | null;
  }>;
}

export interface Solution {
  key: string;
  text: string;
  phonetic?: string;
  dictionary: Dictionary[];
}
export interface CategoryRow {
  id: number
  customIndex: number
  progressType: number
  uiModifiers: string
  modifiers: any
  name: string
  countLesson: number
  countDialogue: number
  countVocabulary: number
  countOxfordtest: number
  countReviewLesson: number
  disabled: boolean
  countDone: number
  time: number
  lessons: string
  dialogues: string
  vocabularies: string
  oxfordTests: string
  reviewLessons: string
}
export interface VocabularyRow {
  id: number;
  index: number;
  category: number;
  categoryID: number;
  isCourse?: boolean;
  name: string | null;
  disabled: boolean;
  done: boolean;
  stars: number | boolean;
  countItem: number;
  countWords: number;
  countPhrases: number;
  countDone: number;
  vItems: number[];
}
export interface QuizWord { //Vocabulary item  (the 'vItemData' column json data from 'Item' table)
  id: number;
  vocabulary: number;
  wordID: number;
  key: string;
  sols: Solution[];
  audio_updated_at: number;
}


export interface Question {
  id: string;
  type: 'audio-to-text' | 'text-to-text' | 'urdu-to-arabic' | 'arabic-to-urdu';
  word: QuizWord;
  question: string;
  correctAnswer: string;
  options: string[];
  audioUrl?: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  answers: Record<string, string>;
  completed: boolean;
  startTime: Date | null;
}