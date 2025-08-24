"use client";
import { useQuizQB } from "./use-quiz-qb";
import { QuizQBItem } from "./definitions";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTune } from "../use-tune";
import { JsonViewerComponent } from "@/components/json-viewer";

interface QuizQBProps {
  quizItem: QuizQBItem;
  handleNextQuiz: () => void;
}
export const QuizQb: React.FC<QuizQBProps> = ({ quizItem, handleNextQuiz }) => {
  const { quizState, startQuiz, nextQuestion, checkSelection, resetQuiz } =
    useQuizQB(quizItem);
  const { playCorrectTune, playIncorrectTune } = useTune();
  const handleNextQuestion = () => {
    nextQuestion();
  };
  const { questions, currentQuestionIndex, isComplete, feedback } = quizState;
  return (
    <Card className="flex flex-col gap-4" dir="rtl">
      <CardContent>
        <RadioGroup
          value={questions[currentQuestionIndex].correctAnswer}
          onValueChange={checkSelection}
        >
          {questions[currentQuestionIndex].options.map((option) => (
            <RadioGroupItem key={option} value={option} />
          ))}
          {feedback && <p className="text-sm mt-2">{feedback.text}</p>}
        </RadioGroup>
        <Button onClick={handleNextQuestion}>Next</Button>
      </CardContent>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">Quiz</h2>
        <JsonViewerComponent data={questions[currentQuestionIndex]} />
      </div>
    </Card>
  );
};
