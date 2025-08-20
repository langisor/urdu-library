"use client";
import React from 'react';
import { Play, Volume2, BookOpen, Languages } from 'lucide-react';

interface QuizStartProps {
  onStart: () => void;
  totalWords: number;
}

export const QuizStart: React.FC<QuizStartProps> = ({ onStart, totalWords }) => {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white text-center">
          <Languages className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Arabic ↔ Urdu</h1>
          <p className="text-xl opacity-90">Language Quiz</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 mb-6">
              Test your knowledge of Arabic and Urdu vocabulary with our interactive quiz. 
              Practice translation, pronunciation, and comprehension skills!
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
              <p className="text-blue-800 font-semibold">
                {totalWords} vocabulary words available
              </p>
              <p className="text-blue-600 text-sm mt-1">
                Questions will be randomly selected and shuffled
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4">
              <Volume2 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold text-gray-800 mb-1">Audio Questions</h3>
              <p className="text-sm text-gray-600">Listen and identify translations</p>
            </div>

            <div className="text-center p-4">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold text-gray-800 mb-1">Multiple Choice</h3>
              <p className="text-sm text-gray-600">Select from 4 possible answers</p>
            </div>

            <div className="text-center p-4">
              <Languages className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold text-gray-800 mb-1">Bidirectional</h3>
              <p className="text-sm text-gray-600">Arabic to Urdu and vice versa</p>
            </div>
          </div>

          {/* Question Types Preview */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">Question Types:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Audio pronunciation → Text translation
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Arabic text → Urdu translation
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Urdu text → Arabic translation
              </li>
            </ul>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={onStart}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Play className="w-6 h-6" />
              <span>Start Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm">
          💡 Tip: Use headphones for the best audio experience
        </p>
      </div>
    </div>
  );
};