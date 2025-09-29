"use client";

import React, { useState } from "react";

// --- 1. RAW DATA INTERFACES (Full complexity, based on mockup) ---

interface RawTokenDetail {
  text: string;
  length: number;
  location: number;
}

interface RawTokenPart {
  key: string;
  raw: RawTokenDetail;
  text: string;
  linker: RawTokenDetail;
  prefix: RawTokenDetail;
  suffix: RawTokenDetail;
}

interface RawSolutionToken {
  raw: { text: string; length: number; location: number };
  linker: { text: string; length: number; location: number };
  prefix: { text: string; length: number; location: number };
  suffix: { text: string; length: number; location: number };
}

interface RawSolution {
  key: string;
  text: string;
  phonetic?: string;
  dictionary?: Array<{ raw: string; translations: any[] }>;
  phraseType?: number;
  text_tokens?: RawSolutionToken[];
  audio_updated_at: number;
}

interface RawLanguageData {
  id: number;
  ord: string[]; // Correct order of token keys
  sols: RawSolution[];
  type: string;
  lesson: number;
  tokens: RawTokenPart[]; // Word bank tokens in original script
  tokensPhonetic?: RawTokenPart[]; // Word bank tokens in phonetic script
  wordID: number;
  modifiers: number;
  alternates: number[];
  completeToken: string;
  tokensEqualSize: boolean;
}

// --- 2. SIMPLIFIED DATA INTERFACES (For application use) ---

export interface SimplifiedToken {
  key: string;
  text: string;
  type: "script" | "phonetic";
}

export interface SimplifiedData {
  id: number;
  type: string;
  lesson: number;
  // Assuming the first 'sols' is the primary language (Arabic in the mockup), and the second is the secondary (Urdu/Hindi)
  solutionPrimary: string;
  solutionSecondary: string;
  wordBank: SimplifiedToken[];
  correctOrderKeys: string[];
}

// --- 3. TYPESCRIPT SIMPLIFICATION FUNCTION ---

/**
 * Transforms the complex raw language data into a simplified, usable structure.
 * @param rawData The raw JSON object from the API.
 * @returns A simplified data object ready for use in the UI.
 */
function simplifyLanguageData(rawData: RawLanguageData): SimplifiedData {
  // 1. Extract solutions
  const solutionPrimary = rawData.sols[0]?.text || "N/A";
  const solutionSecondary =
    rawData.sols[1]?.text || rawData.sols[1]?.phonetic || "N/A";

  // 2. Extract and simplify word bank tokens
  const scriptTokens: SimplifiedToken[] = rawData.tokens.map((t) => ({
    key: t.key,
    text: t.text.replace(/،|۔|\.|,/g, ""), // Clean up common trailing punctuation for display
    type: "script",
  }));

  // Note: We could also include phonetic tokens if needed, but for simplicity, we focus on the main script tokens.
  // const phoneticTokens: SimplifiedToken[] = (rawData.tokensPhonetic || []).map(t => ({
  //   key: t.key,
  //   text: t.text.replace(/،|۔|\.|,/g, ''),
  //   type: 'phonetic',
  // }));

  // The simplified word bank is a unique combination of keys from the main tokens.
  const wordBank = scriptTokens;

  // 3. Construct the final simplified object
  return {
    id: rawData.id,
    type: rawData.type,
    lesson: rawData.lesson,
    solutionPrimary,
    solutionSecondary,
    wordBank,
    correctOrderKeys: rawData.ord,
  };
}

// --- 4. REACT COMPONENT FOR DISPLAY ---

// Mock data to demonstrate the component and function usage
const MOCK_RAW_DATA: RawLanguageData = {
  id: 640363,
  ord: ["t5Wttz-o34V", "tR37jkUQQFk", "tbBtG7ortiI", "taQPLpM5xtp"],
  sols: [
    {
      key: "rr4F-RQSFvcednSiF4LvBDvAHY52xr50",
      text: "هذه أمي.",
      dictionary: [],
      phraseType: 1,
      text_tokens: [],
      audio_updated_at: 1580702547,
    },
    {
      key: "rr4F-RQSFvcednSiF4LvBDvAHY52xr50",
      text: "یہ میری والدہ ہیں۔",
      phonetic: "Yeh mairi walida hain.",
      audio_updated_at: 1580702547,
    },
  ],
  type: "C1b",
  lesson: 101,
  tokens: [
    {
      key: "tj80WuhsKVY",
      raw: { text: "ہم", length: 2, location: 8 },
      text: "ہم",
      linker: { text: " ", length: 1, location: 7 },
      prefix: { text: "", length: 0, location: 8 },
      suffix: { text: "", length: 0, location: 10 },
    },
    {
      key: "tM0oXrz-3Si",
      raw: { text: "ہے", length: 2, location: 16 },
      text: "ہے،",
      linker: { text: " ", length: 1, location: 15 },
      prefix: { text: "", length: 0, location: 16 },
      suffix: { text: "،", length: 1, location: 18 },
    },
    {
      key: "touU7ynKwDM",
      raw: { text: "کمرہ", length: 4, location: 11 },
      text: "کمرہ",
      linker: { text: " ", length: 1, location: 10 },
      prefix: { text: "", length: 0, location: 11 },
      suffix: { text: "", length: 0, location: 15 },
    },
    {
      key: "trCgWtlWIVD",
      raw: { text: "_____", length: 5, location: 20 },
      text: "_____۔",
      linker: { text: " ", length: 1, location: 19 },
      prefix: { text: "", length: 0, location: 20 },
      suffix: { text: "۔", length: 1, location: 25 },
    },
    {
      key: "taQPLpM5xtp",
      raw: { text: "ہیں", length: 3, location: 14 },
      text: "ہیں۔",
      linker: { text: " ", length: 1, location: 13 },
      prefix: { text: "", length: 0, location: 14 },
      suffix: { text: "۔", length: 1, location: 17 },
    },
    {
      key: "tR37jkUQQFk",
      raw: { text: "میری", length: 4, location: 3 },
      text: "میری",
      linker: { text: " ", length: 1, location: 2 },
      prefix: { text: "", length: 0, location: 3 },
      suffix: { text: "", length: 0, location: 7 },
    },
    {
      key: "tbBtG7ortiI",
      raw: { text: "والدہ", length: 5, location: 8 },
      text: "والدہ",
      linker: { text: " ", length: 1, location: 7 },
      prefix: { text: "", length: 0, location: 8 },
      suffix: { text: "", length: 0, location: 13 },
    },
    {
      key: "t5Wttz-o34V",
      raw: { text: "یہ", length: 2, location: 0 },
      text: "یہ",
      linker: { text: "", length: 0, location: 0 },
      prefix: { text: "", length: 0, location: 0 },
      suffix: { text: "", length: 0, location: 2 },
    },
  ],
  // tokensPhonetic and other fields omitted for brevity but they are in the RawLanguageData interface.
  tokensPhonetic: [],
  wordID: 18328,
  modifiers: 72,
  alternates: [18218],
  completeToken: "tbBtG7ortiI",
  tokensEqualSize: true,
};

const initialSimplifiedData: SimplifiedData =
  simplifyLanguageData(MOCK_RAW_DATA);

/**
 * React component to simulate a language building exercise using the simplified data.
 * This demonstrates how the simplified structure can be used.
 */
export const LanguageExerciseDisplay: React.FC = () => {
  // State for the current sentence being built
  const [currentSentenceKeys, setCurrentSentenceKeys] = useState<string[]>([]);

  // Function to add a token to the sentence
  const addTokenToSentence = (tokenKey: string) => {
    // Prevent adding a token if it's already in the sentence
    if (!currentSentenceKeys.includes(tokenKey)) {
      setCurrentSentenceKeys((prev) => [...prev, tokenKey]);
    }
  };

  // Function to remove a token from the sentence (when clicked in the sentence area)
  const removeTokenFromSentence = (keyToRemove: string) => {
    setCurrentSentenceKeys((prev) => prev.filter((key) => key !== keyToRemove));
  };

  // Map keys in the current sentence back to their text for display
  const currentSentenceText = currentSentenceKeys
    .map(
      (key) => initialSimplifiedData.wordBank.find((t) => t.key === key)?.text
    )
    .filter((text) => text !== undefined)
    .join(" ");

  // Filter the word bank to only show tokens not yet used in the sentence
  const availableWordBank = initialSimplifiedData.wordBank.filter(
    (token) => !currentSentenceKeys.includes(token.key)
  );

  // Simple check function for demonstration
  const isCorrect = () => {
    if (
      currentSentenceKeys.length !==
      initialSimplifiedData.correctOrderKeys.length
    )
      return false;
    return currentSentenceKeys.every(
      (key, index) => key === initialSimplifiedData.correctOrderKeys[index]
    );
  };

  const isCorrectResult = isCorrect();

  return (
    <div className="min-h-screen bg-indigo-50 p-4 sm:p-8 font-inter">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-indigo-800">
            Language Sentence Builder
          </h1>
          <p className="text-sm text-indigo-600">
            Lesson {initialSimplifiedData.lesson} | Type:{" "}
            {initialSimplifiedData.type}
          </p>
        </header>

        {/* Task and Solutions Display */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-2">
            Translate the Sentence
          </h2>
          <p
            dir="rtl"
            className="text-3xl text-right font-light text-indigo-900 mb-2"
          >
            {initialSimplifiedData.solutionPrimary}
          </p>
          <p className="text-md text-gray-500 italic">
            ({initialSimplifiedData.solutionSecondary})
          </p>
        </div>

        {/* Sentence Building Area */}
        <div
          className="mb-10 p-6 rounded-xl border-4 border-dashed border-indigo-200 bg-indigo-50 transition duration-300
                    min-h-[100px] flex flex-wrap content-start items-start gap-2"
        >
          {currentSentenceKeys.length > 0 ? (
            currentSentenceKeys.map((key) => {
              const token = initialSimplifiedData.wordBank.find(
                (t) => t.key === key
              );
              return (
                <button
                  key={key}
                  onClick={() => removeTokenFromSentence(key)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 transform hover:scale-105"
                  title="Click to remove"
                >
                  {token ? token.text : "..."}
                </button>
              );
            })
          ) : (
            <p className="text-gray-400 italic">
              Tap the words below to build the sentence...
            </p>
          )}
        </div>

        {/* Feedback and Check Button */}
        <div className="mb-8 flex justify-between items-center">
          <div
            className={`p-3 rounded-xl font-bold ${isCorrectResult ? "bg-green-100 text-green-700" : currentSentenceKeys.length > 0 ? "bg-yellow-100 text-yellow-700" : "text-gray-500"}`}
          >
            {currentSentenceKeys.length === 0
              ? "Start Building"
              : isCorrectResult
                ? "✅ Correct!"
                : "Still working..."}
          </div>
          {isCorrectResult && (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-xl transition transform hover:scale-[1.02] active:scale-95"
              onClick={() => console.log("Exercise Complete!")}
            >
              Next Exercise
            </button>
          )}
        </div>

        {/* Word Bank */}
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Word Bank</h2>
        <div className="flex flex-wrap gap-3 p-4 bg-white rounded-xl shadow-xl">
          {availableWordBank.map((token) => (
            <button
              key={token.key}
              onClick={() => addTokenToSentence(token.key)}
              className="bg-indigo-100 text-indigo-800 font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-200 transition duration-150 transform hover:scale-[1.03] active:scale-95 border border-indigo-300"
            >
              {token.text}
            </button>
          ))}
          {availableWordBank.length === 0 && !isCorrectResult && (
            <p className="text-red-500 font-semibold">
              Word bank empty. Try removing some words from above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default simplifyLanguageData;
