"use client";

import { VocabularyItem } from "../_lib/types";
import { useQuiz } from "../_hooks/useQuiz";
import { useState } from "react";
import { QuestionCard } from "./question-card";
import { QuizResults } from "./question-results";
import { QuizStart } from "./question-start";
import { Button } from "@/components/ui/button";
import { CustomAlert } from "./custom-alert";
import { VocsTable } from "./vocs-table";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

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
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-blue-500 text-white hover:cursor-pointer">
            حفظ الكلمات - اختبر نفسك
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" className="w-full h-full overflow-y-scroll">
          <SheetTitle className="sr-only"></SheetTitle>
          <SheetDescription className="sr-only"></SheetDescription>
          {renderCurrentView()}
        </SheetContent>
      </Sheet>
      <div className="container mx-auto px-4 py-8">
        <VocsTable vocs={vocs} />
      </div>
    </div>
  );
}
