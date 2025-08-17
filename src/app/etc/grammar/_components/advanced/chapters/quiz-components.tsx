"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  title: string;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  title,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
    setQuizCompleted(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-4 text-center text-teal-700">
            Quiz Results
          </h3>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-teal-600 mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-xl text-gray-600">{percentage}% Correct</div>
          </div>

          <div className="space-y-4 mb-6">
            {questions.map((question, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="font-medium mb-2">{question.question}</div>
                <div className="text-sm text-gray-600 mb-2">
                  Your answer:{" "}
                  {selectedAnswers[index] >= 0
                    ? question.options[selectedAnswers[index]]
                    : "Not answered"}
                </div>
                <div className="text-sm text-green-600">
                  Correct answer: {question.options[question.correctAnswer]}
                </div>
                {selectedAnswers[index] !== question.correctAnswer && (
                  <div className="text-red-500 text-sm mt-1">❌ Incorrect</div>
                )}
                {selectedAnswers[index] === question.correctAnswer && (
                  <div className="text-green-500 text-sm mt-1">✅ Correct</div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={resetQuiz}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-teal-700 mb-2">{title}</h3>
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        <div className="mb-6">
          <div className="font-medium mb-4 text-lg">{question.question}</div>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? "bg-teal-100 border-teal-500 text-teal-800"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <span className="font-medium mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === -1}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
