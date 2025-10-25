import { queryClient } from "@/lib/postgres-client";
import { Card } from "@/components/ui/card";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import { Suspense } from "react";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const cid = (await params).cid;
  /*const lesson = await queryClient`
    SELECT * FROM "Lesson" WHERE "id"=${Number(lid)}
  `;

  // fetch quizzes using quizz id from lesson.quizzes
  const quizzes = [];
  for (const q of lesson[0].quizzes) {
    const quiz = await queryClient`
    SELECT * FROM "Quiz" WHERE "id"=${q}
  `;
    quizzes.push(JSON.parse(JSON.stringify(quiz[0].quizData)));
  }

  console.log("quizzes", quizzes);
*/
  console.log("Verbs for Category", cid);

  return (
    <Card>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <Quizzer quizzes={quizzes} /> */}
      </Suspense>
      <JsonViewerComponent data={{cid}} />
    </Card>
  );
}
