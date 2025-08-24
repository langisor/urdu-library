import { shuffleArray, getImageUrl, getAudioUrl } from "../helpers";
export type QuizT2Item = {
  id: number;
  sols: Array<{
    key: string;
    text: string;
    phonetic?: string;
    dictionary?: Array<{
      raw: string;
      translations: Array<{
        text?: string;
        type: string;
        phonetic: any;
        id?: number;
        conj?: {
          fu: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
          pa: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
          pr: Array<{
            m: {
              text: string;
            };
            t: {
              key: string;
              text: string;
              phonetic: string;
              audio_updated_at: number;
            };
          }>;
        };
        name?: {
          m: string;
          t: string;
          phonetic: string;
        };
        tenseNames?: {
          fu: string;
          pa: string;
          pr: string;
        };
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
    phonetic_tokens?: Array<{
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
    audio_updated_at: number;
  }>;
  type: string;
  lesson: number;
  wordID: number;
  modifiers: number;
  alternates: Array<any>;
};
export interface Question {
  audioUrl: string;
  phonetic: string;
  text: string; // sols[1].text -> arabic
  phraseType?: number;
  options: string[]; //
  correctAnswer: string; // sols[0].text -> urdu
}

export function convertToQuestion(quizItem: QuizT2Item): Question {
  return {
    audioUrl: getAudioUrl(quizItem.sols[0].key),
    phonetic: quizItem.sols[0].phonetic!,
    text: quizItem.sols[1].text,
    phraseType: quizItem.sols[0].phraseType,
    options: shuffleArray(quizItem.sols[0].dictionary?.map((sol) => sol.raw) || []),
    correctAnswer: quizItem.sols[0].text,
  };
}
