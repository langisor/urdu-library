export interface Question {
  id: number;
  audioFile: string;
  text: string; //question
  correctAnswer: string; //sols
  phonetic?: string;
  isAnswered: boolean;
  options: Option[] | string[];
}
export interface Option {
  image: string;
  text: string;
  phonetic: string;
}

export type Feedback = {
  isAnswered:boolean;
  isCorrect:boolean | null;
  message: string;
};

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function mergeElements<T>(arr: T[], str: string): (T | string)[] {
  return [...arr, str];
}
export function getAudioUrl(key: string): string {
 return `/media/mondly/audios/${key}`;
}

export function getImageUrl(image: string): string {
 return `/media/mondly/images/${image}`;
}

