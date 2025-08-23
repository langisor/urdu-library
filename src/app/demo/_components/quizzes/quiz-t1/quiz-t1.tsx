"use client";
import { JsonViewerComponent } from "@/components/json-viewer";
import { QuizT1Item, Question, convertToQuestion } from "./definitions";

interface QuizT1Props {
  quizItem: QuizT1Item;
}
export const QuizT1: React.FC<QuizT1Props> = ({ quizItem }) => {
  const questions = convertToQuestion(quizItem);

  return <JsonViewerComponent data={questions} />;
};
