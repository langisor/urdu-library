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
  SELECT  "quizData"  FROM "Quiz" where "type"=${qType} LIMIT 10
  `;
  const parsedQuizzes = [];
  for (const quiz of _quizzes) {
    parsedQuizzes.push(JSON.parse(JSON.stringify(quiz.quizData)));
  }
  // return only 5 quizzes after shuffling
  return parsedQuizzes.sort(() => Math.random() - 0.5).slice(0, 5);
}

export default async function Demo() {
  // const quizTypes = await getLessonQuizzes(101);
  const quizzes = await getQuiz("Qb");

  return (
    <div>
      <h1 className="text-2xl font-bold bg-amber-950 text-white p-1 rounded-2xl px-5">
        Quizzes - Type {quizzes[0].type} samples
      </h1>
      <Quizzer quizzes={quizzes} />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Raw Quiz Data</h2>
        <JsonViewerComponent data={quizzes} />
      </div>
    </div>
  );
}
