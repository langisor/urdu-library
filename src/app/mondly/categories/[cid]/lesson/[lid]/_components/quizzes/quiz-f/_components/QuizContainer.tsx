;
import React, { useState } from "react";
import { QuizItem } from "./utils";
import QuizQuestion from "./QuizQuestion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface QuizContainerProps {
  quizzes: QuizItem[];
}
2
export const QuizContainer: React.FC<QuizContainerProps> = ({ quizzes }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const handleComplete = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      // Quiz finished - could redirect or show completion screen
      setCurrentQuizIndex(0); // Reset to first quiz for demo
    }
  };

  if (quizzes.length === 0) {
    return (
      <div className="text-center text-white p-8 bg-blue-600 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">No quizzes available</h2>
        <p>Please check back later for new language quizzes.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="text-white font-medium">
          Quiz {currentQuizIndex + 1} of {quizzes.length}
        </div>
        <div className="flex gap-2">
          {quizzes.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentQuizIndex
                  ? "bg-white"
                  : index < currentQuizIndex
                  ? "bg-blue-300"
                  : "bg-blue-300/30"
              }`}
            />
          ))}
        </div>
      </div>

      <QuizQuestion
        quiz={quizzes[currentQuizIndex]}
        onComplete={handleComplete}
      />
    </div>
  );
};
