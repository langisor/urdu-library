
"use client"
 import {IQuiz} from "@/types/lesson"

 export function QuizL1({ quiz }: { quiz: IQuiz }) {
  return (
    <div>
      <h1>{quiz.type}</h1>
      <hr />
      <pre>{JSON.stringify(quiz, null, 2)}</pre>
    </div>
  );
}