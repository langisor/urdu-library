/**
 * A type definition file for the Urdu Grammar Guide application.
 * This file contains interfaces and types for the main data structures
 * and functions used throughout the project.
 */

// An interface for a single entry in the Table of Contents.
// This is used for the `tocData` array.
export interface TableOfContentsEntry {
 // A unique string identifier for the chapter (e.g., "chapter1").
 id: string;
 // The display title of the chapter.
 title: string;
}

// A union type for all possible page strings in the application.
// This helps ensure that the `currentPage` state and `navigateTo` function
// only use valid page IDs.
export type ChapterPage =
 | "toc"
 | "chapter1"
 | "chapter2"
 | "chapter3"
 | "chapter4"
 | "chapter5"
 | "chapter6";

// A type for the navigation function.
// It takes a `ChapterPage` and returns `void` (nothing).
export type NavigateFunction = (page: ChapterPage) => void;

/**
* You can also define other types here as the project grows,
* for example, for quiz questions or glossary terms.
*/
  // The TOC data, extracted from the provided markdown file.
  // Each chapter has a 'title' and 'id' for navigation.
  export const tocData = [
    { id: "chapter1", title: "Chapter 1: The Building Blocks" },
    { id: "chapter2", title: "Chapter 2: Parts of Speech (Ajzaa-e-Kalaam)" },
    {
      id: "chapter3",
      title: "Chapter 3: Sentence Structure (Jumlon ki Saakht)",
    },
    {
      id: "chapter4",
      title: "Chapter 4: Verbs and Tenses (Fe'l aur Zamaanay)",
    },
    { id: "chapter5", title: "Chapter 5: Advanced Grammar & Stylistics" },
    { id: "chapter6", title: "Chapter 6: Practical Application" },
  ];
 