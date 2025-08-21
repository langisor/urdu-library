import { VocabularyItem, WordItem } from "./types";
 
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const getWords = (vocs: VocabularyItem[]) => {
  const words: WordItem[] = [];
  for (const voc of vocs) {
    words.push({
      wordID: voc.wordID,
      arabic: voc.sols[0].text,
      urdu: voc.sols[1].text,
      audioFile: voc.key,
    });
  }
  return words;
};


export const getAudioUrl = ( src:string): string => {
  return `media/mondly/audios/${src}`;
};
  