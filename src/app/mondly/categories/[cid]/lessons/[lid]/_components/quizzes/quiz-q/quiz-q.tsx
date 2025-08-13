"use client";
import { Quiz } from "@/app/mondly/_types/data-services";
export function QuizQ({ quiz }: { quiz: Quiz }) {
  return (
    <div>
      <h1>{quiz.type}</h1>
      <hr />
      <pre>{JSON.stringify(quiz, null, 2)}</pre>
    </div>
  );
}
