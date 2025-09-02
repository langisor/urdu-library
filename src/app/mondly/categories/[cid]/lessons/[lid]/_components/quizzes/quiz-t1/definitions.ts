import { shuffleArray ,getAudioUrl} from "../helpers";

export type QuizT1Item = {
  id: number;
  ord: Array<string>;
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
  alts?: Array<any>;
  type: string;
  lesson: number;
  tokens: Array<{
    key: string;
    raw: {
      text: string;
      length: number;
      location: number;
    };
    text: string;
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
  wordID: number;
  modifiers: number;
  alternates: Array<any>;
  tokensEqualSize: boolean;
};
export type Question = {
  id: number;
  audioFile: string;
  text: string;
  phonetic: string;
  correctAnswer: string;
  isAnswered: boolean;
  options: string[];
};
export function convertToQuestion(quizItem: QuizT1Item): Question {
  return {
    id: quizItem.id,
    audioFile: getAudioUrl(quizItem.sols[0].key),
    text: quizItem.sols[0].text,
    phonetic: quizItem.sols[0].phonetic!,
    correctAnswer: quizItem.sols[1].text,
    isAnswered: false,
    options: shuffleArray(quizItem.tokens.map((token) => token.text)),
  };
}
