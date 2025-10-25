"use client";

import { useHookstate, State } from "@hookstate/core";
import { QuizC2bItem, Feedback } from "./definitions";
import * as React from "react";
import { JsonViewerComponent } from "@/components/json-viewer";
interface QuizItem {
  prompt: string;
  answer: string;
  translation: string;
  hint: string;
}
function convertC2b(data: QuizC2bItem) {}

// --- 3. CLIENT COMPONENT LOGIC (Single Quiz Item Renderer) ---

interface QuizC2bProps {
  quizData: QuizC2bItem;
  quizzerFeedback: State<Feedback>;
}

const useQuizC2b = (quizData: QuizC2bItem) => {
  const question = useHookstate(convertC2b(quizData));
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null); // null, true, or false
  const [showAnswer, setShowAnswer] = React.useState<boolean>(false);

  // Reset state when the quizItem changes (e.g., when Next/Prev button is clicked)
  // React.useEffect(() => {
  //   quizItem.set(convertC2b(quizData));
  // }, [quizItem.value]);

  // Function to handle answer checking
  // const handleSubmit = React.useCallback(
  //   (e: React.FormEvent) => {
  //     e.preventDefault();
  //     // Simple sanitization for comparison
  //     const sanitizedInput = inputValue.trim();
  //     const sanitizedAnswer = quizItem.get()?.answer.trim();

  //     // Use a deep comparison for Arabic characters if necessary, but basic trim is often enough.
  //     if (sanitizedInput === sanitizedAnswer) {
  //       setIsCorrect(true);
  //       setShowAnswer(true); // Automatically reveal the full correct answer
  //     } else {
  //       setIsCorrect(false);
  //     }
  //   },
  //   [inputValue, quizItem.get()?.answer]
  // );

  // Dynamic Tailwind classes based on the current state
  // const statusClasses = React.useMemo(() => {
  //   if (isCorrect === true) {
  //     return "border-green-500 bg-green-50 text-green-700 shadow-green-200";
  //   }
  //   if (isCorrect === false) {
  //     return "border-red-500 bg-red-50 text-red-700 shadow-red-200";
  //   }
  //   return "border-gray-300 bg-white text-gray-800 shadow-lg";
  // }, [isCorrect]);

  // if (!quizItem.get() || quizItem.get()?.id === 0) {
  //   return (
  //     <div className="text-center p-8 text-xl text-gray-500">
  //       Loading quiz data...
  //     </div>
  //   );
  // }

  return {
    // metadata: {
    //  inputValue,
    //  isCorrect
    // },
    // actions:{
    //  showAnswer,
    //  handleSubmit,
    //  statusClasses,
  };
};

export const QuizC2b: React.FC<QuizC2bProps> = ({ quizData }) => {
  return <JsonViewerComponent data={quizData} />;
};
