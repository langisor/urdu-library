"use client";
import { useState, useEffect } from "react";
import { Question, QuizItem } from "./utils";
interface QuizScreenProps {
  quizItems: Question[];
  currentQuestionIndex: number;
  score: number;
  handleAnswer: (option: string) => void;
  handlePlayAudio: () => void;
  loadingAudio: boolean;
  selectedAnswer: string | null;
  isAnswered: boolean;
  feedbackMessage: string;
}

// A simple component for the Quiz Screen
export const QuizScreen = ({
  quizItems,
  currentQuestionIndex,
  score,
  handleAnswer,
  handlePlayAudio,
  loadingAudio,
  selectedAnswer,
  isAnswered,
  feedbackMessage,
}: QuizScreenProps
) => {
  const currentQuestion =  quizItems[currentQuestionIndex];
  const totalQuestions = quizItems.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  return (
    <div className="fade-in flex flex-col items-center w-full">
      {/* Progress and Score Bar */}
      <div className="w-full mb-6 text-center">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            Score: {score}
          </span>
          <span className="text-sm font-semibold text-gray-600">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full text-center p-6 bg-gray-50 rounded-lg mb-6 shadow-inner">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {currentQuestion.isAudioQuestion
              ? "Listen and identify:"
              : currentQuestion.promptText}
          </h2>
          <p className="text-md text-gray-500 font-medium">
            {!currentQuestion.isAudioQuestion && currentQuestion.phonetic}
          </p>
          {currentQuestion.isAudioQuestion && (
            <button
              onClick={handlePlayAudio}
              disabled={loadingAudio}
              className={`mt-4 p-4 rounded-full ${
                loadingAudio
                  ? "bg-gray-300"
                  : "bg-blue-100 text-blue-500 hover:bg-blue-200"
              } focus:outline-none transition-transform duration-200 transform hover:scale-110`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L6.683 15H2a1 1 0 01-1-1V6a1 1 0 011-1h4.683L8.293 3.293A1 1 0 019.383 3.076zM13.828 7.172a.5.5 0 00-.707 0L12 8.293l-1.121-1.121a.5.5 0 00-.707.707L11.293 9l-1.121 1.121a.5.5 0 00.707.707L12 9.707l1.121 1.121a.5.5 0 00.707-.707L12.707 9l1.121-1.121a.5.5 0 000-.707z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Answer Buttons */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selectedAnswer;

          let buttonClasses = `w-full py-4 px-6 rounded-lg text-lg font-semibold transform btn ${
            isAnswered ? "cursor-not-allowed" : "cursor-pointer"
          } `;
          buttonClasses += isAnswered
            ? isCorrect
              ? "bg-green-500 text-white shadow-md"
              : isSelected
              ? "bg-red-500 text-white shadow-md"
              : "bg-gray-300"
            : "bg-white text-blue-600 hover:bg-blue-50";

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={buttonClasses}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback Message Box */}
      <div className="mt-6 text-center text-lg font-semibold min-h-[30px]">
        {isAnswered && (
          <span
            className={`transition-all duration-300 ${
              feedbackMessage === "Correct!" ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedbackMessage}
          </span>
        )}
      </div>
    </div>
  );
};
