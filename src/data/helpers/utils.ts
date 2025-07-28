import DB from "@/data/db.json";

/**
 * @file utils.ts
 * @description This file contains TypeScript type definitions and service functions
 * for interacting with the media directory tree data.
 * It defines the shape of audio files, directories, and provides utility functions
 * to fetch and navigate the data.
 */

// --- Type Definitions ---

/**
 * Interface for an individual audio file.
 */
export interface AudioFile {
  type: "file";
  name: string;
  type_audio?: "Exercise" | "Vocabulary"; // Indicates if the audio is for an exercise or vocabulary
  number?: string; // The exercise or vocabulary number (e.g., "01", "14")
  figure?: string; // Optional figure number for exercises (e.g., "01", "Questions")
  sub_chapter_title?: string; // Optional title for vocabulary sub-chapters
}

/**
 * Interface for a directory within the media tree.
 * A directory can contain other directories or audio files.
 */
export interface Directory {
  type: "directory";
  name: string; // Short name of the directory (e.g., "Lesson1", "Unit1", "Chapter1")
  long_name?: string; // Full descriptive name (e.g., "Lesson 1: Sounds Similar to English")
  page_number?: number; // Corresponding page number in the book
  contents: (AudioFile | Directory)[]; // Contents can be files or nested directories
}

/**
 * Type alias for the root of the media directory tree, which is an array of Directories.
 */
export type MediaDirectoryTree = Directory[];

// --- Service Functions ---

/**
 * Simulates fetching the media directory tree data.
 * In a real application, this would typically involve an
 * API call (e.g., using fetch).
 * For this example, it returns the hardcoded JSON data.
 * @returns A Promise that resolves to the MediaDirectoryTree.
 */
export function fetchMediaData() {
  // In a real application, you would fetch this from an API endpoint:
  return DB as MediaDirectoryTree;
}

/**
 * Finds a specific lesson directory within the media tree.
 * @param tree The root MediaDirectoryTree.
 * @param lessonName The name of the lesson directory (e.g., "Lesson1").
 * @returns The found Directory or undefined if not found.
 */
export function getLessonDetails(
  tree: MediaDirectoryTree,
  lessonName: string
): Directory | undefined {
  const sslDir = tree
    .find((dir) => dir.name === "/media/audio-all")
    ?.contents?.find(
      (content) => content.type === "directory" && content.name === "ssl"
    ) as Directory | undefined;
  if (sslDir) {
    return sslDir.contents.find(
      (content) => content.type === "directory" && content.name === lessonName
    ) as Directory | undefined;
  }
  return undefined;
}

/**
 * Finds a specific unit directory within the media tree.
 * @param tree The root MediaDirectoryTree.
 * @param unitName The name of the unit directory (e.g., "Unit1").
 * @returns The found Directory or undefined if not found.
 */
export function getUnitDetails(
  tree: MediaDirectoryTree,
  unitName: string
): Directory | undefined {
  const audioAllDir = tree.find((dir) => dir.name === "/media/audio-all") as
    | Directory
    | undefined;
  if (audioAllDir) {
    return audioAllDir.contents.find(
      (content) => content.type === "directory" && content.name === unitName
    ) as Directory | undefined;
  }
  return undefined;
}

/**
 * Finds a specific chapter directory within a given unit directory.
 * @param unitDirectory The parent unit directory.
 * @param chapterName The name of the chapter directory (e.g., "Chapter1").
 * @returns The found Directory or undefined if not found.
 */
export function getChapterDetails(
  unitDirectory: Directory,
  chapterName: string
): Directory | undefined {
  return unitDirectory.contents.find(
    (content) => content.type === "directory" && content.name === chapterName
  ) as Directory | undefined;
}

/**
 * Finds a specific audio file within a given chapter directory.
 * @param chapterDirectory The parent chapter directory.
 * @param fileName The name of the audio file (e.g., "Pien7788_U04Ch21V01.mp3").
 * @returns The found AudioFile or undefined if not found.
 */
export function getAudioFileDetails(
  chapterDirectory: Directory,
  fileName: string
): AudioFile | undefined {
  return chapterDirectory.contents.find(
    (content) => content.type === "file" && content.name === fileName
  ) as AudioFile | undefined;
}

/**
 * Parses the audio file name to extract type, number, and figure.
 * @param fileName The name of the audio file (e.g., "Pien7788_SSL04Ex02.mp3", "Pien7788_U04Ch18Ex014_01.mp3", "Pien7788_U04Ch21V01.mp3").
 * @returns An object containing type_audio, number, and figure (if applicable).
 */
export function parseAudioFileName(
  fileName: string
): Pick<AudioFile, "type_audio" | "number" | "figure"> {
  const parts = fileName.split("_");
  if (parts.length < 3) {
    return {}; // Not a recognized format
  }

  const typePart = parts[2]; // e.g., "SSL04Ex02", "U04Ch18Ex014", "U04Ch21V01"

  if (typePart.includes("Ex")) {
    const exMatch = typePart.match(/Ex(\d+)(_(\d+|Questions))?/);
    if (exMatch) {
      const number = exMatch[1];
      const figure = exMatch[3];
      return { type_audio: "Exercise", number, figure };
    }
  } else if (typePart.includes("V")) {
    const vMatch = typePart.match(/V(\d+)/);
    if (vMatch) {
      const number = vMatch[1];
      return { type_audio: "Vocabulary", number };
    }
  }
  return {};
}

// Example Usage (for testing purposes, can be removed in production)
/*
async function main() {
  const mediaTree : MediaDirectoryTree = fetchMediaData();
  console.log("Fetched Media Tree:", mediaTree);

  // Example: Get Lesson 4 details
  const lesson4 = getLessonDetails(mediaTree, "Lesson4");
  if (lesson4) {
    console.log("\nLesson 4 Details:", lesson4.long_name, "Page:", lesson4.page_number);
    const ex02 = lesson4.contents.find(f => f.name === "Pien7788_SSL04Ex02.mp3") as AudioFile;
    if (ex02) {
      console.log("  Audio File:", ex02.name, "Type:", ex02.type_audio, "Number:", ex02.number);
    }
  }

  // Example: Get Unit 4, Chapter 18 details
  const unit4 = getUnitDetails(mediaTree, "Unit4");
  if (unit4) {
    console.log("\nUnit 4 Details:", unit4.long_name);
    const chapter18 = getChapterDetails(unit4, "Chapter18");
    if (chapter18) {
      console.log("  Chapter 18 Details:", chapter18.long_name, "Page:", chapter18.page_number);
      const ex14_01 = getAudioFileDetails(chapter18, "Pien7788_U04Ch18Ex014_01.mp3");
      if (ex14_01) {
        console.log("    Audio File:", ex14_01.name, "Type:", ex14_01.type_audio, "Number:", ex14_01.number, "Figure:", ex14_01.figure);
      }
      const v01 = getAudioFileDetails(chapter18, "Pien7788_U04Ch18V01.mp3");
      if (v01) {
        console.log("    Audio File:", v01.name, "Type:", v01.type_audio, "Number:", v01.number, "Sub-chapter:", v01.sub_chapter_title);
      }
    }
  }

  // Test parseAudioFileName
  console.log("\nParsing Audio File Names:");
  console.log(parseAudioFileName("Pien7788_SSL04Ex02.mp3"));
  console.log(parseAudioFileName("Pien7788_U04Ch18Ex014_01.mp3"));
  console.log(parseAudioFileName("Pien7788_U08Ch41Ex08_Questions.mp3"));
  console.log(parseAudioFileName("Pien7788_U04Ch21V01.mp3"));
}

// Uncomment the line below to run the example usage when testing this file in a Node.js environment
// main();
*/
