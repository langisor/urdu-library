export interface Translation {
  type?: string;
  text?: string;
  phonetic?: string | null;
}

export interface DictionaryItem {
  raw: string;
  translations: Translation[];
}

export interface Solution {
  key: string;
  text: string;
  phonetic?: string;
  dictionary: DictionaryItem[];
  conj?: any;
}

export interface VItem {
  id: number;
  vocabulary: number;
  wordID: number;
  key: string;
  sols: Solution[];
  audio_updated_at?: number;
}

export interface Vocabulary {
  id: number;
  index: number;
  category: number;
  categoryID: number;
  isCourse: boolean;
  name: string | null;
  disabled: boolean;
  done: boolean;
  stars: number;
  countItem: number;
  countWords: number;
  countPhrases: number;
  countDone: number;
  vItems: number[];
}

export interface VocabularyData {
  vocabulary: Vocabulary;
  vItems: VItem[];
}

export type TItemType="dictionary" | "verb" ;