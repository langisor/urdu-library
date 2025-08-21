"use client";
 
import { VocabularyItem } from "../_lib/types";
import { useQuiz } from "../_hooks/useQuiz";
import { useState } from "react";
import { QuestionCard } from "./question-card";
import { QuizResults } from "./question-results";
import { QuizStart } from "./question-start";
import { CustomAlert } from "./custom-alert";

export function Quizzer({ vocs }: { vocs: VocabularyItem[] }) {
  const {
    quizState,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz,
    handleExitQuiz,
  } = useQuiz(vocs);
  const [showAlert, setShowAlert] = useState(true);
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
      <div className="container">
        <QuestionCard
          question={currentQuestion}
          questionNumber={quizState.currentQuestionIndex + 1}
          totalQuestions={quizState.questions.length}
          onAnswer={answerQuestion}
          onNext={nextQuestion}
        />
        <CustomAlert
          title="خروج من الاختبار"
          description="هل انت متأكد من الخروج من الاختبار؟"
          onConfirm={handleExitQuiz}
        />
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">{renderCurrentView()}</div>
    </div>
  );
}
