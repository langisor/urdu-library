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
export async function fetchMediaData(): Promise<MediaDirectoryTree> {
  // In a real application, you would fetch this from an API endpoint:
  // const response = await fetch('/api/media-data.json');
  // const data: MediaDirectoryTree = await response.json();
  // return data;

  // For demonstration, returning the hardcoded JSON structure from previous steps.
  // This should be replaced with actual data loading in a production environment.
  const data: MediaDirectoryTree = [
    {
      type: "directory",
      name: "/media/audio-all",
      contents: [
        {
          type: "file",
          name: "BegUrdu_Alphabet.mp3",
        },
        {
          type: "directory",
          name: "ssl",
          long_name: "Part I The Sound System of Urdu",
          contents: [
            {
              type: "directory",
              name: "Lesson1",
              long_name: "Lesson 1: Sounds Similar to English",
              page_number: 1,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL01Ex01.mp3",
                  type_audio: "Exercise",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL01Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL01Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson10",
              long_name: "Lesson 10: The $d\\bar{a}l$ and $re$ Series",
              page_number: 20,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL10Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL10Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL10Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL10Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson11",
              long_name: "Lesson 11: The $s\\bar{i}n$ and $su\\bar{a}d$ Series",
              page_number: 23,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL11Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL11Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL11Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL11Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson12",
              long_name:
                "Lesson 12: The Vowels $v\\bar{a}o$, $ch\\bar{o}t\\bar{i}$ $ye$, and $ba\\dot{r}\\bar{i}$ $ye$",
              page_number: 25,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL12Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL12Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL12Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL12Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson13",
              long_name:
                "Lesson 13: $fe$, $q\\bar{a}f$, $k\\bar{a}f$, $g\\bar{a}f$, and $l\\bar{a}m$",
              page_number: 28,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL13Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL13Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL13Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL13Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson14",
              long_name:
                "Lesson 14: $m\\bar{i}m$, $ch\\bar{o}t\\bar{i}$ $he$, $do$ $chashm\\bar{i}$ $he$, and $n\\bar{u}n$ $ghunna$",
              page_number: 30,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL14Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL14Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL14Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL14Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson15",
              long_name: "Lesson 15: The $to$ and $n\\bar{i}n$ Series",
              page_number: 34,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL15Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL15Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL15Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL15Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson16",
              long_name: "Lesson 16: Additional Signs",
              page_number: 37,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL16Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson2",
              long_name:
                "Lesson 2: The Consonants $r$, $l$, $v$, and the Vowels $e$ and $o$",
              page_number: 3,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL02Ex01.mp3",
                  type_audio: "Exercise",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL02Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL02Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL02Ex04.mp3",
                  type_audio: "Exercise",
                  number: "04",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL02Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL02Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL02Ex07.mp3",
                  type_audio: "Exercise",
                  number: "07",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson3",
              long_name: "Lesson 3: Aspirated and Unaspirated Consonants",
              page_number: 5,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL03Ex01.mp3",
                  type_audio: "Exercise",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL03Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL03Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL03Ex04.mp3",
                  type_audio: "Exercise",
                  number: "04",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson4",
              long_name: "Lesson 4: Dental and Retroflex Consonants",
              page_number: 6,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL04Ex01.mp3",
                  type_audio: "Exercise",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL04Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL04Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson5",
              long_name:
                "Lesson 5: The Consonants $r$ and $rh$ and the Vowels $ai$ and $au$",
              page_number: 7,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL05Ex01.mp3",
                  type_audio: "Exercise",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL05Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL05Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson6",
              long_name: "Lesson 6: The Consonants $q$, $x$, and $gh$",
              page_number: 8,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL06Ex01.mp3",
                  type_audio: "Exercise",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL06Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson7",
              long_name: "Lesson 7: Nasalized Vowels and Doubled Consonants",
              page_number: 9,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL07Ex01.mp3",
                  type_audio: "Exercise",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL07Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL07Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson8",
              long_name:
                "Lesson 8: Introduction to the Urdu Script: The $be$ Series",
              page_number: 11,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL08Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL08Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL08Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL08Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
            {
              type: "directory",
              name: "Lesson9",
              long_name:
                "Lesson 9: The $j\\bar{i}m$ Series, $suk\\bar{u}n$ and $tashd\\bar{i}d$",
              page_number: 17,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_SSL09Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL09Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL09Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_SSL09Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
          ],
        },
        {
          type: "directory",
          name: "Unit1",
          long_name: "Unit 1 Me and My School",
          contents: [
            {
              type: "directory",
              name: "Chapter1",
              long_name: "Chapter 1 Introductions",
              page_number: 47,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U01Ch01Ex01.mp3",
                  type_audio: "Exercise",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch01Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch01Ex07.mp3",
                  type_audio: "Exercise",
                  number: "07",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch01Ex08.mp3",
                  type_audio: "Exercise",
                  number: "08",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch01V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Meeting Somebody New",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch01V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Identifying Classroom Items",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch01V03.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Asking and Answering Questions",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch01V04.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Asking Yes-or-No Questions",
                  number: "04",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch01V05.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Greeting an Acquaintance",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch01V06.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Greeting an Acquaintance",
                  number: "06",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter2",
              long_name: "Chapter 2 Me and My Classmates",
              page_number: 65,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U01Ch02V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Exchanging Basic Personal Information",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter3",
              long_name: "Chapter 3 My Classroom",
              page_number: 75,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U01Ch03V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Listing Items: There Is and There Are",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter4",
              long_name: "Chapter 4 Describing Classroom Items",
              page_number: 85,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U01Ch04Ex04.mp3",
                  type_audio: "Exercise",
                  number: "04",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch04V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title:
                    "Describing Items by Their Qualities: Adjectives",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch04V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Adjectival Question Words",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter5",
              long_name: "Chapter 5 Giving Commands and Making Requests",
              page_number: 97,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U01Ch05Ex04.mp3",
                  type_audio: "Exercise",
                  number: "04",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch05V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Infinitive",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch05V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Imperative",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter6",
              long_name: "Chapter 6 Unit 1 Review Activities",
              page_number: 105,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U01Ch06Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch06Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U01Ch06Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
          ],
        },
        {
          type: "directory",
          name: "Unit2",
          long_name: "Unit 2 My Family and My Home",
          contents: [
            {
              type: "directory",
              name: "Chapter10",
              long_name: "Chapter 10 My Home, My Belongings",
              page_number: 169,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U02Ch10Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch10V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Features of One’s Home",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch10V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title:
                    "Expressing What One Has: Physical Possessions",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter11",
              long_name: "Chapter 11 Making Comparisons",
              page_number: 179,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U02Ch11Ex01.mp3",
                  type_audio: "Exercise",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch11Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch11V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Comparative Constructions",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter12",
              long_name: "Chapter 12 Unit 2 Review Activities",
              page_number: 189,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U02Ch12Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch12Ex04_01.mp3",
                  type_audio: "Exercise",
                  number: "04",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch12Ex04_02.mp3",
                  type_audio: "Exercise",
                  number: "04",
                  figure: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch12Ex07.mp3",
                  type_audio: "Exercise",
                  number: "07",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch12V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Review",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter7",
              long_name: "Chapter 7 Locating Places and Objects",
              page_number: 113,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U02Ch07Ex0x011.mp3",
                  type_audio: "Exercise",
                  number: "0x011",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch07Ex0x013.mp3",
                  type_audio: "Exercise",
                  number: "0x013",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch07Ex0x017.mp3",
                  type_audio: "Exercise",
                  number: "0x017",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch07Ex0x018.mp3",
                  type_audio: "Exercise",
                  number: "0x018",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch07Ex0x03.mp3",
                  type_audio: "Exercise",
                  number: "0x03",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch07Ex0x05.mp3",
                  type_audio: "Exercise",
                  number: "0x05",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch07V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Locating Places in the City",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch07V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Locating Places within Countries",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch07V03.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Locating Objects in the Home",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch07V04.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Using Postpositions: Oblique Forms",
                  number: "04",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter8",
              long_name: "Chapter 8 Identifying Family Members",
              page_number: 143,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U02Ch08Ex04.mp3",
                  type_audio: "Exercise",
                  number: "04",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch08Ex07.mp3",
                  type_audio: "Exercise",
                  number: "07",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch08V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title:
                    "Using the Possessive Postposition $k\\bar{a}$",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter9",
              long_name: "Chapter 9 Describing Family Members",
              page_number: 155,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U02Ch09Ex01.mp3",
                  type_audio: "Exercise",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch09Ex07.mp3",
                  type_audio: "Exercise",
                  number: "07",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch09V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title:
                    "Describing a Person’s Physical Appearance",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch09V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Stating a Person’s Age",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U02Ch09V03.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Oblique Adjectives",
                  number: "03",
                },
              ],
            },
          ],
        },
        {
          type: "directory",
          name: "Unit3",
          long_name: "Unit 3 Daily Life",
          contents: [
            {
              type: "directory",
              name: "Chapter13",
              long_name: "Chapter 13 My Daily Routine 1",
              page_number: 201,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U03Ch13Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch13Ex08_01.mp3",
                  type_audio: "Exercise",
                  number: "08",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch13Ex08_02.mp3",
                  type_audio: "Exercise",
                  number: "08",
                  figure: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch13V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Saying Where You Live and Work",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch13V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Describing Routine Activities",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch13V03.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Clock Time",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch13V04.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Using Postpositions with Verbs",
                  number: "04",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter14",
              long_name: "Chapter 14 My Daily Routine 2",
              page_number: 223,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U03Ch14Ex07.mp3",
                  type_audio: "Exercise",
                  number: "07",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch14V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Uses of the Infinitive",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch14V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Reflexive Pronouns",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter15",
              long_name: "Chapter 15 Describing Events in Progress",
              page_number: 233,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U03Ch15Ex03_01.mp3",
                  type_audio: "Exercise",
                  number: "03",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch15Ex03_02.mp3",
                  type_audio: "Exercise",
                  number: "03",
                  figure: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch15V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Present Continuous Verb Tense",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch15V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Conjunct Verbs",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter16",
              long_name: "Chapter 16 Weather and Climate",
              page_number: 247,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U03Ch16Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch16V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Describing the Weather",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch16V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Describing the Climate",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter17",
              long_name: "Chapter 17 Unit 3 Review Activities",
              page_number: 259,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U03Ch17Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U03Ch17Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
          ],
        },
        {
          type: "directory",
          name: "Unit4",
          long_name: "Unit 4 In the Market",
          contents: [
            {
              type: "directory",
              name: "Chapter18",
              long_name: "Chapter 18 Expressing Likes, Needs, and Desires",
              page_number: 267,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U04Ch18Ex014_01.mp3",
                  type_audio: "Exercise",
                  number: "14",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch18Ex014_02.mp3",
                  type_audio: "Exercise",
                  number: "14",
                  figure: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch18Ex04.mp3",
                  type_audio: "Exercise",
                  number: "04",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch18Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch18Ex09_01.mp3",
                  type_audio: "Exercise",
                  number: "09",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch18Ex09_02.mp3",
                  type_audio: "Exercise",
                  number: "09",
                  figure: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch18V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Expressing Likes and Needs",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch18V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Contracted $ko$ Pronoun Forms",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter19",
              long_name: "Chapter 19 Choosing Items and Expressing Measures",
              page_number: 295,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U04Ch19Ex010.mp3",
                  type_audio: "Exercise",
                  number: "10",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch19Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch19V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title:
                    "Using $v\\bar{a}l\\bar{a}$ to Indicate an Item",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch19V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Measures",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter20",
              long_name: "Chapter 20 Discussing Prices",
              page_number: 309,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U04Ch20Ex04.mp3",
                  type_audio: "Exercise",
                  number: "04",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch20V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Price Constructions",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter21",
              long_name: "Chapter 21 Unit 4 Review Activities",
              page_number: 321,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U04Ch21Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch21Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch21Ex09.mp3",
                  type_audio: "Exercise",
                  number: "09",
                },
                {
                  type: "file",
                  name: "Pien7788_U04Ch21V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Review",
                  number: "01",
                },
              ],
            },
          ],
        },
        {
          type: "directory",
          name: "Unit5",
          long_name: "Unit 5 My Childhood",
          contents: [
            {
              type: "directory",
              name: "Chapter22",
              long_name: "Chapter 22 My Childhood Home",
              page_number: 335,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U05Ch22Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
                {
                  type: "file",
                  name: "Pien7788_U05Ch22V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Describing Past Circumstances",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U05Ch22V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Past Habitual Verb Tense",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter23",
              long_name: "Chapter 23 Describing One’s Childhood",
              page_number: 345,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U05Ch23Ex04_01.mp3",
                  type_audio: "Exercise",
                  number: "04",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U05Ch23Ex04_02.mp3",
                  type_audio: "Exercise",
                  number: "04",
                  figure: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U05Ch23V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Past Habitual Verb Tense",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter24",
              long_name: "Chapter 24 Describing a Scene in the Past",
              page_number: 355,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U05Ch24Ex02.mp3",
                  type_audio: "Exercise",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U05Ch24Ex04.mp3",
                  type_audio: "Exercise",
                  number: "04",
                },
                {
                  type: "file",
                  name: "Pien7788_U05Ch24V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Past Continuous Verb Tense",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter26",
              long_name: "Chapter 26 Unit 5 Review Activities",
              page_number: 371,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U05Ch26Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U05Ch26Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
          ],
        },
        {
          type: "directory",
          name: "Unit6",
          long_name: "Unit 6 Rules and Responsibilities",
          contents: [
            {
              type: "directory",
              name: "Chapter27",
              long_name: "Chapter 27 Rules and Regulations",
              page_number: 379,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U06Ch27V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title:
                    "The Verb $sakn\\bar{a}$, ‘to Be Able to, Can’",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter28",
              long_name: "Chapter 28 Expressing Compulsion",
              page_number: 387,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U06Ch28Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U06Ch28V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Expressions of Compulsion",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter29",
              long_name: "Chapter 29 Giving and Following Instructions",
              page_number: 395,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U06Ch29Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_U06Ch29V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Subjunctive: Introduction",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter30",
              long_name: "Chapter 30 Unit 6 Review Activities",
              page_number: 405,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U06Ch30Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U06Ch30Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
              ],
            },
          ],
        },
        {
          type: "directory",
          name: "Unit7",
          long_name: "Unit 7 A Trip to South Asia",
          contents: [
            {
              type: "directory",
              name: "Chapter31",
              long_name: "Chapter 31 My Plans",
              page_number: 413,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U07Ch31Ex04_01.mp3",
                  type_audio: "Exercise",
                  number: "04",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch31Ex04_02.mp3",
                  type_audio: "Exercise",
                  number: "04",
                  figure: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch31Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch31V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Future Verb Tense",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter32",
              long_name: "Chapter 32 My Travel Plans: Definite and Possible",
              page_number: 425,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U07Ch32Ex07.mp3",
                  type_audio: "Exercise",
                  number: "07",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch32V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title:
                    "Using the Subjunctive with Subordinating Expressions",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter33",
              long_name: "Chapter 33 Arranging Transportation and Lodging",
              page_number: 439,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U07Ch33Ex05_01.mp3",
                  type_audio: "Exercise",
                  number: "05",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch33Ex05_02.mp3",
                  type_audio: "Exercise",
                  number: "05",
                  figure: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch33Ex06.mp3",
                  type_audio: "Exercise",
                  number: "06",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch33V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "How Long It Takes and How Much It Costs",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter34",
              long_name: "Chapter 34 Finding One’s Way",
              page_number: 449,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U07Ch34Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch34V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Giving and Following Directions",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter35",
              long_name: "Chapter 35 Seeking Information for Travel Plans",
              page_number: 457,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U07Ch35Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch35V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Conjunction $ki$",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch35V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Conjunction $ki$",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter36",
              long_name: "Chapter 36 Unit 7 Review Activities",
              page_number: 467,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U07Ch36Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch36Ex04_01.mp3",
                  type_audio: "Exercise",
                  number: "04",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch36Ex04_02.mp3",
                  type_audio: "Exercise",
                  number: "04",
                  figure: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch36Ex07_01.mp3",
                  type_audio: "Exercise",
                  number: "07",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch36Ex07_02.mp3",
                  type_audio: "Exercise",
                  number: "07",
                  figure: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch36Ex10_01.mp3",
                  type_audio: "Exercise",
                  number: "10",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U07Ch36Ex10_02.mp3",
                  type_audio: "Exercise",
                  number: "10",
                  figure: "02",
                },
              ],
            },
          ],
        },
        {
          type: "directory",
          name: "Unit8",
          long_name: "Unit 8 Past Events and Experiences",
          contents: [
            {
              type: "directory",
              name: "Chapter37",
              long_name: "Chapter 37 My Weekend",
              page_number: 485,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U08Ch37Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch37Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch37Ex07.mp3",
                  type_audio: "Exercise",
                  number: "07",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch37V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Perfective Verb Tense",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch37V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Transitive and Intransitive Verbs",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter38",
              long_name: "Chapter 38 Narrating a Story",
              page_number: 505,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U08Ch38Ex07.mp3",
                  type_audio: "Exercise",
                  number: "07",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch38V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Past Perfect",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter39",
              long_name: "Chapter 39 My Experience and Accomplishments",
              page_number: 517,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U08Ch39Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch39Ex05.mp3",
                  type_audio: "Exercise",
                  number: "05",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch39V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "The Present Perfect Verb Tense",
                  number: "01",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter40",
              long_name: "Chapter 40 At the Doctor",
              page_number: 529,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U08Ch40Ex04_01.mp3",
                  type_audio: "Exercise",
                  number: "04",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch40Ex04_02.mp3",
                  type_audio: "Exercise",
                  number: "04",
                  figure: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch40V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Ailments and Physical Conditions",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch40V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Expressing the Beginning of an Action",
                  number: "02",
                },
              ],
            },
            {
              type: "directory",
              name: "Chapter41",
              long_name: "Chapter 41 Unit 8 Review Activities",
              page_number: 543,
              contents: [
                {
                  type: "file",
                  name: "Pien7788_U08Ch41Ex03.mp3",
                  type_audio: "Exercise",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch41Ex08_01.mp3",
                  type_audio: "Exercise",
                  number: "08",
                  figure: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch41Ex08_Questions.mp3",
                  type_audio: "Exercise",
                  number: "08",
                  figure: "Questions",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch41V01.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Review",
                  number: "01",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch41V02.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Review",
                  number: "02",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch41V03.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Review",
                  number: "03",
                },
                {
                  type: "file",
                  name: "Pien7788_U08Ch41V04.mp3",
                  type_audio: "Vocabulary",
                  sub_chapter_title: "Review",
                  number: "04",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return data;
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
  const mediaTree = await fetchMediaData();
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
