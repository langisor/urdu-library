// --- Type Definitions for the Data and Components ---

// Defines the structure of a single 'solution' or 'alternate' word in the data
export interface ISolution {
  key: string;
  text: string;
  phonetic?: string;
  dictionary: {
    raw: string;
    translations: {
      type: string;
      text: string;
      phonetic: string | null;
    }[];
  }[];
}

// Defines the main structure of a vocabulary item
export interface IVocabulary {
  id: number;
  vocabulary: number;
  wordID: number;
  key: string;
  sols: [ISolution, ISolution]; // Tuple to ensure there are exactly two elements
  audio_updated_at: number;
}

// Defines the props for the VocsTable component
export interface VocsTableProps {
  vocs: IVocabulary[];
}

// Defines the structure of a single quiz question
export interface IQuestion {
  type: 'audioToText' | 'textToText';
  question: string;
  options: string[];
  correctAnswer: string;
}

// Defines the props for the Quiz component
export interface QuizProps {
  vocs: IVocabulary[];
  onFinish: (finalScore: number, finalTotal: number) => void;
}