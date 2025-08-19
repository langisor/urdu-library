"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface StartScreenProps {
  handleStartQuiz: () => void;
}
// A simple component for the Start Screen
export const StartScreen = ({
  handleStartQuiz,
}: StartScreenProps
) => (
  <div className="text-center fade-in">
    <h1 className="text-4xl font-bold mb-4 text-blue-600">Vocabulary Quiz</h1>
    <p className="text-lg text-gray-600 mb-8">
      Test your knowledge of Arabic-Urdu vocabulary with this interactive quiz.
      You'll be presented with different question types to practice your skills.
    </p>
    <Button
      onClick={handleStartQuiz}
      className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transform transition-transform duration-200"
    >
      Start Quiz
    </Button>
  </div>
);
