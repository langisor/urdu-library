"use client";
import { useState, useEffect } from "react";
import { Question } from "./utils";
interface HomeScreenProps {
  quizData: Question[]; // Assuming mockData is passed as a prop
  score: number;
  handleRestartQuiz: () => void;
}

export function ResultScreen({
  quizData,
  score,
  handleRestartQuiz,
}: HomeScreenProps) {
  const totalQuestions = quizData.length;
  const feedback =
    score / totalQuestions >= 0.7
      ? "Great job! You've mastered this vocabulary."
      : "Keep practicing! You'll get it next time.";

  return (
    <div className="text-center fade-in">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Quiz Complete!</h1>
      <p className="text-3xl font-semibold text-gray-700 mb-4">
        You scored {score} out of {totalQuestions}
      </p>
      <p className="text-lg text-gray-600 mb-8">{feedback}</p>
      <button
        onClick={handleRestartQuiz}
        className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transform transition-transform duration-200"
      >
        Play Again
      </button>
    </div>
  );
}
