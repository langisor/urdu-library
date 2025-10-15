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

/**
 * Generates a string of random Urdu alphabets of a specified length, 
 * excluding characters provided in an array.
 *
 * NOTE: This function samples characters from a broad Unicode range 
 * (U+060C to U+06FF) that covers most of the Arabic script, 
 * including the core Urdu characters. Not every generated character 
 * will be a standard Urdu letter (e.g., punctuation may appear).
 *
 * @param len The desired length of the random string.
 * @param excludeArr An array of Urdu characters (strings) to exclude from the result.
 * @returns A string of random Urdu characters.
 */
 
export const getRandomUrduAlphabets = (len: number, excludeArr: string[]): string => {
    // 1. Define the Unicode Range for Arabic Script (which includes Urdu)
    // U+060C is '،' (Arabic Comma), U+06FF is 'ۿ' (Arabic Letter Dal with Inverted V)
    // This range covers the vast majority of Urdu characters.
    const START_CODE = 0x060C;
    const END_CODE = 0x06FF;

    // 2. Normalize the exclusion list for efficient lookup
    // Using a Set makes checking for exclusion O(1) instead of O(n).
    const excludeSet = new Set(excludeArr);

    let result = '';
    let counter = 0;

    // 3. Generate random characters until the desired length is reached
    while (counter < len) {
        // Generate a random code point within the defined range
        const randomCodePoint = Math.floor(Math.random() * (END_CODE - START_CODE + 1)) + START_CODE;

        // Convert the code point back to a character
        const char = String.fromCharCode(randomCodePoint);

        // Check if the character is in the exclusion set
        if (!excludeSet.has(char)) {
            result += char;
            counter++; // Only increment the counter if the character is NOT excluded
        }
    }

    return result;
};

// --- Example Usage ---

// 1. Specify characters to exclude (e.g., Urdu letters for 'Alif' and 'Noon')
// const excludedCharacters = ['ا', 'ن', 'ی']; // Exclude Alif, Noon, and Ya

// 2. Generate a random string of length 15, excluding the specified characters
// const randomString = getRandomUrduAlphabets(15, excludedCharacters);

// console.log(`Desired Length: 15`);
// console.log(`Excluded Chars: ${excludedCharacters.join(', ')}`);
// console.log(`Generated String: ${randomString}`);
// console.log(`Generated Length: ${randomString.length}`);

// --- End Example Usage ---