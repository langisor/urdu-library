"use client" 
  import { IQuiz } from "@/types/lesson"

 export function QuizT2({ quiz }: { quiz: IQuiz }) {
  return (
    <div className="flex flex-col gap-4">
      <h1>{quiz.type}</h1>
      <hr />
      <pre>{JSON.stringify(quiz, null, 2)}</pre>
    </div>
  );
}