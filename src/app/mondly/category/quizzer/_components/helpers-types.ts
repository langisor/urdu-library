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

/**
 * Removes all occurrences of values found in the 'valuesToRemove' array
 * from the 'sourceArray'.
 *
 * @template T The type of the elements in the arrays.
 * @param {T[]} sourceArray The array from which elements will be removed.
 * @param {T[]} valuesToRemove The array containing the values to remove from the source array.
 * @returns {T[]} A new array containing elements from the sourceArray that are not present in valuesToRemove.
 */
export function removeValues<T>(sourceArray: T[], valuesToRemove: T[]): T[] {
  // 1. Create a Set of the values to remove for efficient O(1) lookup.
  const valuesToRemoveSet = new Set(valuesToRemove);

  // 2. Use the filter method to create a new array.
  // The filter keeps an element if it is NOT present in the valuesToRemoveSet.
  return sourceArray.filter(item => !valuesToRemoveSet.has(item));
}