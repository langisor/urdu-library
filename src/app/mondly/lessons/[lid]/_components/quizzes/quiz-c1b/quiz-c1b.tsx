"use client";
import { IQuiz } from "@/types/lesson";
export function QuizC1b({ quiz }: { quiz: IQuiz }) {
  return (
    <div>
      <h1>{quiz.type}</h1>
      <hr />
      <pre>{JSON.stringify(quiz, null, 2)}</pre>
    </div>
  );
}
