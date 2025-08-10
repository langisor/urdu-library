import {
  VocabularyData,
  VItem,
  Vocabulary,
  Solution,
  DictionaryItem,
  Translation,
  TItemType,
} from "./voc-interfaces";

//  Global helpers
const courseImageBasePath = "/media/mondly/images/";
const courseAudioBasePath = "/media/mondly/audios/";

export const getCourseImage = (id: string | number) => {
  return courseImageBasePath + id;
};

export const getCourseAudio = (
  id: string | number,
  audio_updated_at: string | number
) => {
  return `${courseAudioBasePath}${id}`;
};

//  Vocabulary helpers

/**
 * Defines the shape of the data for each value in the mapped object.
 * This structure is based on the user's provided schema.
 */
type DataValueShape = {
  id: number;
  wordId: number;
  wordType: "dictionary" | "verb";
  motherText: string;
  targetText: string;
  motherDictionary: DictionaryItem[];
  targetDictionary: DictionaryItem[];
  phonetic: string;
};

/**
 * Maps an array of VItem objects to a new object where keys are audio file paths
 * and values are the corresponding VItem data in the DataValueShape.
 *
 * @param vItems The array of VItem objects to process.
 * @returns A new object with keys as audio paths and values as DataValueShape objects.
 */
export function mapVItemsToAudioData(vItems: VItem[]): {
  [key: string]: DataValueShape;
} {
  // Use a reduce function to iterate over the array and build the new object.
  return vItems.reduce((acc, item) => {
    // Generate the key using the getCourseAudio function.
    const key = getCourseAudio(item.id, item.audio_updated_at || "");

    // Extract the necessary values to create the DataValueShape object.
    // The phonetic and targetText are assumed to be from the second solution (sols[1]),
    // and motherText is from the first solution (sols[0]), as per the request.

    //  get the type from the first solution

    const value: DataValueShape = {
      id: item.id,
      wordId: item.wordID,
      wordType:
        item.sols[0]?.dictionary[0].translations[0]?.type === undefined
          ? "dictionary"
          : "verb",
      motherText: item.sols[0]?.text || "",
      targetText: item.sols[1]?.text || "",

      motherDictionary: item.sols[0]?.dictionary || [],
      targetDictionary: item.sols[1]?.dictionary || [],

      phonetic: item.sols[1]?.phonetic || "",
    };

    // Add the new key-value pair to the accumulator object.
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: DataValueShape });
}
