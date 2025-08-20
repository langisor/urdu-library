"use client";
import React from "react";
import { useQuiz } from "../_hooks/use-quiz";
import { QuizStart } from "../_components/question-start";
import { QuestionCard } from "../_components/question-card";
import { QuizResults } from "./question-results";
import { QuizWord } from "../_lib/types";

export function VocabulariesQuizzer({ vocs }: { vocs: QuizWord[] }) {
  const { quizState, startQuiz, answerQuestion, nextQuestion, resetQuiz } =
    useQuiz(vocs);
  const renderCurrentView = () => {
    if (quizState.completed) {
      return (
        <QuizResults
          score={quizState.score}
          totalQuestions={quizState.questions.length}
          startTime={quizState.startTime}
          onRestart={resetQuiz}
        />
      );
    }

    if (quizState.questions.length === 0) {
      return <QuizStart onStart={startQuiz} totalWords={vocs.length} />;
    }

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    return (
      <QuestionCard
        question={currentQuestion}
        questionNumber={quizState.currentQuestionIndex + 1}
        totalQuestions={quizState.questions.length}
        onAnswer={answerQuestion}
        onNext={nextQuestion}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">{renderCurrentView()}</div>
    </div>
  );
}
