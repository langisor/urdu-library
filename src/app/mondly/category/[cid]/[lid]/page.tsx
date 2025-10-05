import { queryClient } from "@/lib/postgres-client";
import { Card } from "@/components/ui/card";

import QuizzerScreen from "./_components/screens/quizzer-screen";
import { Suspense } from "react";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lid: string }>;
}) {
  const { lid } = await params;
  const lesson = await queryClient`
  SELECT * FROM "Lesson" WHERE "id"=${lid}
`;
  console.log("lesson: ", lesson[0]);
  // fetch quizzes using quizz id from lesson.quizzes
  const quizzes = [];
  for (const q of lesson[0].quizzes) {
    const quiz = await queryClient`
    SELECT * FROM "Quiz" WHERE "id"=${q}
  `;
    quizzes.push(JSON.parse(JSON.stringify(quiz[0].quizData)));
  }
  console.log("quizzes: ", quizzes);

  return (
    <Card>
      <Suspense fallback={<div>Loading...</div>}>
        <QuizzerScreen quizzes={quizzes} />
      </Suspense>
    </Card>
  );
}
