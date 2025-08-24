import { queryClient } from "@/lib/postgres-client";
import { JsonViewerComponent } from "@/components/json-viewer";
import { Quizzer } from "./_components/quizzer";
// async function getDistinctQuizTypes() {
//   const _quizzes = await queryClient`
//   SELECT  "quizData"  FROM "Quiz" where "type"='D' LIMIT 2
//   `
//   const parsedQuizzes = [];
//   for (let quiz of _quizzes) {
//     parsedQuizzes.push(JSON.parse(JSON.stringify(quiz.quizData)));
//   }
//   return parsedQuizzes;

// }
async function getLessonQuizzes(lid: number) {
  const _quizzes = await queryClient`
  SELECT  "quizData"  FROM "Quiz" where "lessonID"=${lid}
  `;
  const parsedQuizzes = [];
  for (const quiz of _quizzes) {
    parsedQuizzes.push(JSON.parse(JSON.stringify(quiz.quizData)));
  }
  return parsedQuizzes;
}
async function getQuiz(qType: string) {
  const _quizzes = await queryClient`
  SELECT  "quizData"  FROM "Quiz" where "type"=${qType} LIMIT 5
  `;
  const parsedQuizzes = [];
  for (const quiz of _quizzes) {
    parsedQuizzes.push(JSON.parse(JSON.stringify(quiz.quizData)));
  }
  return parsedQuizzes;
}

export default async function Demo() {
  // const quizTypes = await getLessonQuizzes(101);
  const quizTypes = await getQuiz("D");

  return (
    <div>
      <h1 className="text-2xl font-bold">demo</h1>
      <Quizzer quizzes={quizTypes} />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Raw Quiz Data</h2>
        <JsonViewerComponent data={quizTypes} />
      </div>
    </div>
  );
}
