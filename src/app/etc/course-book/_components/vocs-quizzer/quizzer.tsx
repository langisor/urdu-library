"use client";
import { QuizData, QuizMode, LanguageKey } from "./types"; // Adjust path as needed
import { useQuizLogic } from "./use-quiz-logic"; // Adjust path as needed
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTune } from "@/hooks/use-tone";
import { SheetClose } from "@/components/ui/sheet";
import { XIcon } from "lucide-react";
// Helper to determine text direction
const getDir = (lang: LanguageKey) => {
  return lang === "Urdu" || lang === "Arabic" ? "rtl" : "ltr";
};

interface QuizzerProps {
  data: QuizData;
  onClose: () => void;
}

export const Quizzer: React.FC<QuizzerProps> = ({ data, onClose }) => {
  const {
    currentWordIndex,
    score,
    isAnswered,
    userInput,
    isCorrect,
    totalWords,
    currentWord,
    currentPrompt,
    quizMode,
    promptLanguage,
    checkAnswer,
    nextWord,
    resetQuiz,
    handleInputChange,
    switchQuizMode,
  } = useQuizLogic(data);

  const progress =
    totalWords > 0 ? ((currentWordIndex + 1) / totalWords) * 100 : 0;
  const isFinished = currentWordIndex >= totalWords;

  // Map quizMode to a user-friendly label
  const quizModeLabel = data.table.header[quizMode] || quizMode;


   
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!isAnswered) {
    
          
        checkAnswer();
      } else if (!isFinished) {
        nextWord();
      }
    }
  };
 
  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-2xl text-center">
        <h2 className="  font-bold text-green-600 mb-4">Quiz Complete! 🎉</h2>
        <p className="text-xl mb-6">
          Your Final Score:{" "}
          <strong className="  block my-2">
            {score} / {totalWords}
          </strong>
        </p>
        <Button
          onClick={resetQuiz}
          className=" py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        {data.type} Quiz: {data.unit}.{data.chapter}
      </h1>

      {/* Quiz Mode Selector */}
      <div className="flex justify-center space-x-2 mb-6">
        {Object.keys(data.table.header)
          .filter(
            (key) =>
              key !== "Transliteration" &&
              key !== "Image" &&
              key !== promptLanguage
          )
          .map((key) => (
            <Button
              key={key}
              onClick={() => switchQuizMode(key as QuizMode)}
              className={`py-2 px-4 text-sm font-medium rounded-full transition duration-150 ${
                quizMode === key
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Mode: {data.table.header[key as LanguageKey]}
            </Button>
          ))}
      </div>

      {/* Progress Bar and Score */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
          <span>
            Question {currentWordIndex + 1} / {totalWords}
          </span>
          <span>Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Quiz Prompt */}
      <div
        dir={getDir(promptLanguage)}
        className="text-center mb-8 p-4 bg-purple-50 rounded-lg border-2 border-purple-200 min-h-[100px] flex items-center justify-center"
      >
        <p className="md:text-3xl text-xl font-semibold text-gray-900">
          {currentPrompt}
        </p>
        <span className="ml-2 text-sm text-gray-500">
          ({data.table.header[promptLanguage]})
        </span>
      </div>

      {/* User Input */}
      <div className="mb-4">
        <Label
          htmlFor="answer"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Type your answer in{" "}
          <strong className="text-purple-600">{quizModeLabel}</strong>:
        </Label>
        <Input
          id="answer"
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          disabled={isAnswered}
          dir={getDir(quizMode)}
          className={`w-full p-3 border-2 text-lg rounded-lg shadow-inner focus:outline-none 
            ${
              isAnswered
                ? isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            }
            `}
          placeholder={`Enter the ${quizModeLabel} word...`}
        />
      </div>

      {/* Feedback and Correct Answer */}
      {isAnswered && (
        <div
          className={`p-3 rounded-lg text-center mt-4 ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          <p className="font-bold text-lg mb-1">
            {isCorrect ? "Correct! 🎉" : "Incorrect. 😟"}
          </p>
          <p className="text-md">
            The correct answer for{" "}
            <span dir={getDir(promptLanguage)} className="font-semibold">
              {currentWord[promptLanguage]}
            </span>{" "}
            is:
            <strong dir={getDir(quizMode)} className="block mt-1 text-2xl">
              {currentWord[quizMode]}
            </strong>
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between space-x-4">
        {!isAnswered ? (
          <Button
            onClick={checkAnswer}
            disabled={!userInput.trim()}
            className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 transition duration-300"
          >
            Check Answer
          </Button>
        ) : (
          <Button
            onClick={nextWord}
            className="w-full py-3 px-6 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
          >
            Next Word
          </Button>
        )}
       
      </div>
      
          <Button
            className="w-full my-5  py-3 px-6 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            onClick={onClose}
          >
            Close
          </Button>
    
    </div>
  );
};
