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
// The following types are imported from the previous Canvas document
// to ensure the functions are self-contained and runnable.

/**
 * Defines a single solution or alternate entry as a discriminated union.
 * It can be either a RegularSolution or a VerbSolution.
 */
export type SolutionOrAlternate = RegularSolution | VerbSolution;

/**
 * Defines the structure for a regular solution or alternate entry.
 */
export type RegularSolution = {
  key: string;
  text: string;
  audio_updated_at?: number;
  text_tokens?: QuizToken[];
  phonetic?: string;
  dictionary?: DictionaryEntry[];
  type?: string; // This is now an optional property for non-verb items
};

/**
 * Defines the structure for a solution that is a verb.
 */
export type VerbSolution = {
  key: string;
  text: string;
  audio_updated_at?: number;
  text_tokens?: QuizToken[];
  phonetic?: string;
  dictionary?: DictionaryEntry[];
  type: "verb"; // This is the discriminant, specifically "verb"
};

/**
 * Defines a single dictionary entry within a solution.
 */
export type DictionaryEntry = {
  raw: string;
  translations?: Translation[];
};

/**
 * Defines a single translation within a dictionary entry.
 */
export type Translation = {
  type?: string;
  text: string;
  phonetic?: string | null;
  name?: {
    t: string;
    m: string;
    phonetic: string;
  };
  id?: number;
  tenseNames?: TenseNames;
  conj?: VerbConjugation;
};

/**
 * Defines the tense names for a conjugation.
 */
export type TenseNames = {
  pr: string;
  pa: string;
  fu: string;
};

/**
 * Defines the conjugation block for a verb.
 */
export type VerbConjugation = {
  pr?: ConjugationEntry[];
  pa?: ConjugationEntry[];
  fu?: ConjugationEntry[];
};

/**
 * Defines the structure for a verb conjugation entry.
 */
export type ConjugationEntry = {
  t: {
    key: string;
    text: string;
    phonetic: string;
    audio_updated_at: number;
  };
  m: {
    text: string;
  };
};

/**
 * Defines a single quiz item within a lesson.
 */
export type Quiz = {
  id: number;
  lesson: number;
  type: string;
  modifiers: number;
  wordID: number;
  alternates: number[];
  sols: SolutionOrAlternate[];
  alts: SolutionOrAlternate[];
  tokens?: QuizToken[];
  tokensEqualSize?: boolean;
  ord?: string[];
  phraseType?: number;
  text_tokens?: QuizToken[];
};

/**
 * Defines the structure for a single token in a quiz sentence.
 */
export type QuizToken = {
  key: string;
  text: string;
  raw: {
    text: string;
    location: number;
    length: number;
  };
  prefix: {
    text: string;
    location: number;
    length: number;
  };
  suffix: {
    text: string;
    location: number;
    length: number;
  };
  linker: {
    text: string;
    location: number;
    length: number;
  };
};

/**
 * Define  a single Lesson Item
 
 * 
 */
export type LessonItem = {
  id: number;
  index: number;
  unitNumber: number | null;
  unitType: number;
  unitStyle: number;
  unitScope: number;
  category: number;
  categoryID: number;
  name: string;
  isCourse: boolean;
  disabled: boolean;
  done: boolean;
  stars: number;
  difficulty: string;
  countQuiz: number;
  countWords: number;
  countPhrases: number;
  countDone: number;
  quizzes: number[];
};

/**
 * Defines the top-level 'lesson' object from files like 803.json.
 */
export type LessonData = {
  lesson: LessonItem;
  quizzes: Quiz[];
};

/**
 * Defines the top-level 'lesson' object from files like 803.json.
 */

export interface VocabularyItem {
  id: number;
  vocabulary: number;
  wordID: number;
  key: string;
  sols: Sol[];
  audio_updated_at: number;
}
export interface Sol {
  key: string;
  text: string;
  dictionary: Dictionary[];
  phonetic?: string;
}

export interface Dictionary {
  raw: string;
  translations: any[];
}

/**
 * Defines a single vocabulary itself, which represents a word or phrase.
 */
export type Vocabulary = {
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
};

/**
 * Defines the top-level 'vocabulary' object from files like 401.json.
 */
export type VocabularyData = {
  vocabulary: {
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
  };
  Items: VocabularyItem[];
};

/**
 * Defines the structure for a learning category.
 */
export type CategoryItem ={
  id: number;
  i: number;
  positionIndex: number;
  customIndex: number | null;
  progressType: number;
  uiModifiers: {
    learningUnitNamesAndIndex: boolean;
    vocabularyRecapSubtitle: boolean;
  };
  modifiers: number | null;
  name: string;
  countLesson: number;
  countDialogue: number;
  countVocabulary: number;
  countOxfordTest: number;
  countReviewLesson: number;
  lessons: number[];
  dialogues: number[];
  vocabularies: number[];
  oxfordTests: any[];
  reviewLessons: any[];
  disabled: boolean;
  countDone: number;
  time: number;
  words: number;
  phrases: number;
  stars?: number;
  done?: boolean;
};

/**
 * A helper function to find a specific lesson by its ID.
 * @param lessons An array of LessonData objects.
 * @param id The ID of the lesson to find.
 * @returns The LessonData object or undefined if not found.
 */
export function findLessonById(
  lessons: LessonData[],
  id: number
): LessonData | undefined {
  return lessons.find((lessonData) => lessonData.lesson.id === id);
}

/**
 * A helper function to find a specific quiz by its ID within a lesson.
 * @param lesson A LessonData object.
 * @param id The ID of the quiz to find.
 * @returns The Quiz object or undefined if not found.
 */
export function findQuizById(lesson: LessonData, id: number): Quiz | undefined {
  return lesson.quizzes.find((quiz) => quiz.id === id);
}

/**
 * A type guard function to check if a SolutionOrAlternate is a VerbSolution.
 * This function uses the 'type' property as a discriminant.
 * @param solution The solution to check.
 * @returns True if the solution is a VerbSolution, otherwise false.
 */
export function isVerbSolution(
  solution: SolutionOrAlternate
): solution is VerbSolution {
  return solution.type === "verb";
}

/**
 * A function to extract all regular solutions from a given vocabulary item.
 * This demonstrates how to use the discriminated union to filter for specific types.
 * @param vocabularyItem A VocabularyItem object.
 * @returns An array of RegularSolution objects.
 */
// export function getRegularSolutions(
//   vocabularyItem: VocabularyItem
// ): RegularSolution[] {
//   return vocabularyItem.sols?.filter(
//     (sol): sol is RegularSolution => !isVerbSolution(sol)
//   );
// }

/**
 * A function to find a specific vocabulary item by its ID.
 * @param vocabularyData An array of VocabularyData objects.
 * @param id The ID of the vocabulary item to find.
 * @returns The VocabularyData object or undefined if not found.
 */
export function findVocabularyById(
  vocabularyData: VocabularyData[],
  id: number
): VocabularyData | undefined {
  return vocabularyData.find((vocab) => vocab.vocabulary.id === id);
}

/**
 * A function to get all lessons belonging to a specific category.
 * @param category The CategoryItem object.
 * @param allLessons An array of all available LessonData objects.
 * @returns An array of LessonData objects for the category.
 */
export function getCategoryLessons(
  category: CategoryItem,
  allLessons: LessonData[]
): LessonData[] {
  const categoryLessons: LessonData[] = [];
  for (const lessonId of category.lessons) {
    const lesson = findLessonById(allLessons, lessonId);
    if (lesson) {
      categoryLessons.push(lesson);
    }
  }
  return categoryLessons;
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