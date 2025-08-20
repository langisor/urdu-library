"use client";

import React, { useState } from 'react';
import { Question } from '../_lib/types';
import { AudioPlayer } from './audio-player';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    onAnswer(answer);
    
    setTimeout(() => {
      onNext();
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 2000);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium opacity-90">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
            {question.type.replace('-', ' → ').toUpperCase()}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          {question.question}
        </h2>

        {/* Audio Player for audio questions */}
        {question.type === 'audio-to-text' && (
          <div className="mb-8">
            <AudioPlayer
              audioUrl={question.audioUrl}
              text={question.word.sols[0].text}
              autoPlay={true}
            />
          </div>
        )}

        {/* Display source text for text-to-text questions */}
        {question.type !== 'audio-to-text' && (
          <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl text-center">
            <p className="text-2xl font-bold text-gray-800">
              {question.type === 'arabic-to-urdu' 
                ? question.word.sols[0].text 
                : question.word.sols[1].text
              }
            </p>
            {question.type === 'urdu-to-arabic' && question.word.sols[1].phonetic && (
              <p className="text-sm text-gray-600 mt-2">
                ({question.word.sols[1].phonetic})
              </p>
            )}
          </div>
        )}

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === question.correctAnswer;
            
            let buttonClass = "p-4 rounded-xl border-2 transition-all duration-300 text-left font-medium ";
            
            if (!showFeedback) {
              buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transform hover:-translate-y-1";
            } else if (isCorrectOption) {
              buttonClass += "border-green-500 bg-green-50 text-green-800";
            } else if (isSelected && !isCorrectOption) {
              buttonClass += "border-red-500 bg-red-50 text-red-800";
            } else {
              buttonClass += "border-gray-200 text-gray-500";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{option}</span>
                  {showFeedback && (
                    <>
                      {isCorrectOption && <CheckCircle className="w-6 h-6 text-green-600" />}
                      {isSelected && !isCorrectOption && <XCircle className="w-6 h-6 text-red-600" />}
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center space-x-2">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
              <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${question.correctAnswer}`}
              </p>
            </div>
            {question.word.sols[1].phonetic && (
              <p className="text-sm text-gray-600 mt-2">
                Pronunciation: {question.word.sols[1].phonetic}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};