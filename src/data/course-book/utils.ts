import {
  IBookData,
  Unit,
  Appendix,
  Lesson,
  Chapter,
  Part,
  MediaExercise,
} from "./ts-definition";
import BookData from "./toc-and-media.json";

/**
 * Fetches the entire book data from a given URL.
 * @param url The URL of the JSON data.
 * @returns A Promise that resolves to the BookData object, or null if an error occurs.
 */
export async function fetchBookData(url?: string): Promise<IBookData | null> {
  return BookData as unknown as IBookData;
}

/**
 * Retrieves a specific unit from the book data by its unit number.
 * @param bookData The complete BookData object.
 * @param unitNumber The number of the unit to retrieve.
 * @returns The Unit object if found, otherwise undefined.
 */
export function getUnitByNumber(
  bookData: IBookData,
  unitNumber: number
): Unit | undefined {
  return bookData.units.find((unit) => unit.unitNumber === unitNumber);
}


/**
 * Retrieves a specific chapter from a given unit by its chapter number.
 * @param unit The Unit object to search within.
 * @param chapterNumber The number of the chapter to retrieve.
 * @returns The Chapter object if found, otherwise undefined.
 */
export function getChapterByNumber(
  unit: Unit,
  chapterNumber: number
): Chapter | undefined {
  return unit.chapters.find(
    (chapter) => chapter.chapterNumber === chapterNumber
  );
}

/**
 * Retrieves all audio files for vocabulary in a given chapter.
 * @param chapter The Chapter object.
 * @returns An array of audio file paths for vocabulary, or an empty array if none.
 */
export function getVocabularyAudioFiles(chapter: Chapter): string[] {
  return chapter.media?.vocabulary?.map((vocab) => vocab.audioFile) || [];
}

/**
 * Retrieves all audio files for exercises in a given chapter, including sub-exercises.
 * @param chapter The Chapter object.
 * @returns An array of audio file paths for exercises, or an empty array if none.
 */
export function getExerciseAudioFiles(chapter: Chapter): string[] {
  const audioFiles: string[] = [];
  chapter.media?.exercises?.forEach((exercise) => {
    audioFiles.push(exercise.audioFile);
    if (exercise.subExercises) {
      exercise.subExercises.forEach((subEx) => {
        audioFiles.push(subEx.audioFile);
      });
    }
    if (exercise.questions) {
      audioFiles.push(exercise.questions);
    }
  });
  return audioFiles;
}

/**
 * Retrieves a specific appendix by its number.
 * @param bookData The complete BookData object.
 * @param appendixNumber The number of the appendix to retrieve.
 * @returns The Appendix object if found, otherwise undefined.
 */
export function getAppendixByNumber(
  bookData: IBookData,
  appendixNumber: number
): Appendix | undefined {
  return bookData.appendices.find(
    (appendix) => appendix.appendixNumber === appendixNumber
  );
}

/**
 * Gets the base URL for media files.
 * @param bookData The complete BookData object.
 * @returns The base URL string.
 */
export function getMediaBaseUrl(bookData: IBookData): string {
  return bookData.media.baseUrl;
}

/**
 * Gets the alphabet audio file path.
 * @param bookData The complete BookData object.
 * @returns The alphabet audio file path.
 */
export function getAlphabetAudioFile(bookData: IBookData): string {
  return bookData.media.alphabetAudio;
}

/**
 * Sorts an array of Unit objects by their unitNumber in ascending order.
 * @param units The array of Unit objects to sort.
 * @returns A new array with the units sorted.
 */
export function sortUnitsByNumber(units: Unit[]): Unit[] {
  return [...units].sort((a, b) => a.unitNumber - b.unitNumber);
}

/**
 * Sorts an array of Chapter objects by their chapterNumber in ascending order.
 * @param chapters The array of Chapter objects to sort.
 * @returns A new array with the chapters sorted.
 */
export function sortChaptersByNumber(chapters: Chapter[]): Chapter[] {
  return [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
}

/**
 * Sorts an array of Lesson objects by their lessonNumber in ascending order.
 * @param lessons The array of Lesson objects to sort.
 * @returns A new array with the lessons sorted.
 */
export function sortLessonsByNumber(lessons: Lesson[]): Lesson[] {
  return [...lessons].sort((a, b) => a.lessonNumber - b.lessonNumber);
}

/**
 * Sorts an array of MediaExercise objects by their number in ascending order.
 * @param exercises The array of MediaExercise objects to sort.
 * @returns A new array with the exercises sorted.
 */
export function sortMediaExercisesByNumber(
  exercises: MediaExercise[]
): MediaExercise[] {
  return [...exercises].sort((a, b) => a.number - b.number);
}

/**
 * Sorts an array of Part objects by their partNumber in ascending order.
 * @param parts The array of Part objects to sort.
 * @returns A new array with the parts sorted.
 */
export function sortPartsByNumber(parts: Part[]): Part[] {
  return [...parts].sort((a, b) => a.partNumber - b.partNumber);
}

/**
 * Sorts an array of Appendix objects by their appendixNumber in ascending order.
 * @param appendices The array of Appendix objects to sort.
 * @returns A new array with the appendices sorted.
 */
export function sortAppendicesByNumber(appendices: Appendix[]): Appendix[] {
  return [...appendices].sort((a, b) => a.appendixNumber - b.appendixNumber);
}
