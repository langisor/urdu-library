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

// styles
export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
  @font-face {
    font-family: 'Jameel-Noori-Nastaleeq';
    src: url('https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSansUrdu/NotoSansUrdu-Regular.ttf') format('truetype');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Jameel-Noori-Nastaleeq';
    src: url('https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSansUrdu/NotoSansUrdu-Bold.ttf') format('truetype');
    font-weight: 700;
  }
  body { font-family: 'Inter', sans-serif; }
  .min-h-screen { min-height: 100vh; }
  .bg-gray-50 { background-color: #f9fafb; }
  .font-sans { font-family: ui-sans-serif, system-ui, sans-serif; }
  .text-gray-800 { color: #1f2937; }
  .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  .p-4 { padding: 1rem; }
  .sm\:p-8 { padding: 2rem; }
  .max-w-7xl { max-width: 80rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .bg-white { background-color: #fff; }
  .rounded-2xl { border-radius: 1rem; }
  .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
  .p-8 { padding: 2rem; }
  .flex { display: flex; }
  .space-x-4 > * + * { margin-left: 1rem; }
  .border-b { border-bottom-width: 1px; }
  .border-gray-200 { border-color: #e5e7eb; }
  .font-medium { font-weight: 500; }
  .text-teal-700 { color: #0f766e; }
  .urdu-text { font-family: 'Jameel-Noori-Nastaleeq', 'Noto Sans Urdu', 'Noto Nastaliq Urdu', serif; }
  .urdu-text, .nastaliq-bold { font-weight: 700; }
  .roman { font-family: 'Inter', sans-serif; font-style: italic; font-weight: 400; }
  .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
  .font-bold { font-weight: 700; }
  .mb-4 { margin-bottom: 1rem; }
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-duration: 300ms;
  }
  .text-blue-500 { color: #3b82f6; }
  .hover\:text-blue-700:hover { color: #1d4ed8; }
  .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .space-y-2 > * + * { margin-top: 0.5rem; }
  .space-y-4 > * + * { margin-top: 1rem; }
  .space-y-8 > * + * { margin-top: 2rem; }
  .space-y-12 > * + * { margin-top: 3rem; }
  .mt-12 { margin-top: 3rem; }
  .bg-teal-50 { background-color: #f0fdfa; }
  .border { border-width: 1px; }
  .border-teal-200 { border-color: #99f6e4; }
  .rounded-lg { border-radius: 0.5rem; }
  .p-6 { padding: 1.5rem; }
  .text-teal-900 { color: #134e4a; }
  .list-disc { list-style-type: disc; }
  .list-inside { list-style-position: inside; }
  .font-bold { font-weight: bold; }
  .underline { text-decoration-line: underline; }
  .font-semibold { font-weight: 600; }
  .text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .text-gray-600 { color: #4b5563; }
  .border-t { border-top-width: 1px; }
  .container {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
    font-family: 'Inter', sans-serif;
  }
  .table-container {
    overflow-x: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }
  th, td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem;
    text-align: left;
  }
  th {
    background-color: #f3f4f6;
    font-weight: 600;
  }
  .urdu-roman {
    font-family: 'Inter', sans-serif;
  }
  .quiz-container {
    background-color: #f0fdfa;
    border: 1px solid #99f6e4;
    border-radius: 0.5rem;
    padding: 2rem;
    margin-top: 2rem;
  }
  .quiz-question {
    font-size: 1.125rem;
    font-weight: 600;
    color: #134e4a;
    margin-top: 1rem;
  }
  .quiz-options {
    list-style-type: none;
    padding-left: 0;
    margin-top: 0.5rem;
  }
  .quiz-options li {
    margin-bottom: 0.25rem;
  }
  .quiz-answers {
    margin-top: 1.5rem;
    font-weight: 500;
    color: #0f766e;
    background-color: #d1fae5;
    padding: 1rem;
    border-radius: 0.5rem;
  }
`;