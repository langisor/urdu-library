"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { VocabularyItem, Quiz } from "../_lib/types";
import { useQuiz } from "../_hooks/useQuiz";
import { useState } from "react";
import { AudioPlayer } from "./audio-player";

export function Quizzer({ vocs }: { vocs: VocabularyItem[] }) {
  const quizzes = useQuiz(vocs);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean>(false);

  const handleAnswer = (answer: string) => {
    if (answer === quizzes[currentQuestion].question.correctAnswer) {
      setScore(score + 1);
    } else {
      // delay 4 seconds and highlight the correct answer
      setTimeout(() => {
        setAnswered(true);
      }, 4000);
    }
    setCurrentQuestion(currentQuestion + 1);
  };
  const renderQuestion = () => {
    const question = quizzes[currentQuestion];
    if (question.question.type === "audio-ur") {
      return (
        <Card>
          <CardTitle>{question.question.text}</CardTitle>
          <CardContent>
            <AudioPlayer src={question.question.audioFile!} autoPlay={false} />
            <ul>
              {question.question.options.map((option) => (
                <li key={option}>
                  <Button
                    onClick={() => handleAnswer(option)}
                    className={
                      answered && option !== question.question.correctAnswer
                        ? "bg-red-600 text-white"
                        : "bg-green-900 text-white"
                    }
                  >
                    {option}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      );
    }
    if (question.question.type === "ar-ur") {
      return (
        <Card>
          <CardTitle> {question.question.text}</CardTitle>
          <CardContent>
            <ul>
              {question.question.options.map((option) => (
                <li key={option}>
                  <Button onClick={() => handleAnswer(option)}>{option}</Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>ابدا التدرب على المفردات ({vocs.length})</Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="w-full h-full overflow-y-scroll"
        dir="rtl"
      >
        <SheetTitle>Quiz</SheetTitle>
        <SheetDescription></SheetDescription>
        {renderQuestion()}
      </SheetContent>
    </Sheet>
  );
}
