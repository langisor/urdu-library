"use client";

import React from 'react';
import { Trophy, RotateCcw, Star, Clock, Target } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  startTime: Date | null;
  onRestart: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  startTime,
  onRestart,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const timeTaken = startTime ? Math.round((Date.now() - startTime.getTime()) / 1000 / 60) : 0;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Excellent work! You're mastering Arabic-Urdu!", icon: "🏆" };
    if (percentage >= 80) return { message: "Great job! Keep up the good work!", icon: "⭐" };
    if (percentage >= 70) return { message: "Good effort! Practice makes perfect!", icon: "👍" };
    if (percentage >= 60) return { message: "Not bad! Try reviewing the vocabulary again.", icon: "📚" };
    return { message: "Keep practicing! You'll improve with time.", icon: "💪" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Main Results Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-lg opacity-90">{performance.message}</p>
        </div>

        {/* Score Display */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
              <span className="text-4xl font-bold">{percentage}%</span>
            </div>
            <p className="text-2xl font-semibold text-gray-800">
              {score} out of {totalQuestions} correct
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-blue-600 font-medium">Accuracy</p>
              <p className="text-2xl font-bold text-blue-800">{percentage}%</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-green-600 font-medium">Correct</p>
              <p className="text-2xl font-bold text-green-800">{score}</p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-sm text-orange-600 font-medium">Time</p>
              <p className="text-2xl font-bold text-orange-800">{timeTaken}m</p>
            </div>
          </div>

          {/* Performance Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-3 rounded-full border-2 border-yellow-200">
              <span className="text-2xl">{performance.icon}</span>
              <span className="font-semibold text-gray-800">
                {percentage >= 90 ? 'Expert Level' : 
                 percentage >= 80 ? 'Advanced' : 
                 percentage >= 70 ? 'Intermediate' : 
                 percentage >= 60 ? 'Beginner+' : 'Beginner'}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={onRestart}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Another Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tips Card */}
      <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <h3 className="font-semibold text-indigo-800 mb-3 flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Study Tips
        </h3>
        <ul className="text-sm text-indigo-700 space-y-2">
          <li>• Practice regularly with short sessions for better retention</li>
          <li>• Focus on pronunciation using the phonetic guides</li>
          <li>• Review incorrect answers to strengthen weak areas</li>
          <li>• Try to use new vocabulary in conversation practice</li>
        </ul>
      </div>
    </div>
  );
};