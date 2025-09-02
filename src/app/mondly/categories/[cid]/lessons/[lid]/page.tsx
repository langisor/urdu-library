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
// async function getQuiz(qType: string) {
//   const _quizzes = await queryClient`
//   SELECT  "quizData"  FROM "Quiz" where "type"=${qType} LIMIT 10
//   `;
//   const parsedQuizzes = [];
//   for (const quiz of _quizzes) {
//     parsedQuizzes.push(JSON.parse(JSON.stringify(quiz.quizData)));
//   }
//   // return only 5 quizzes after shuffling
//   return parsedQuizzes.sort(() => Math.random() - 0.5).slice(0, 5);
// }
interface LessonQuizzesProps {
  params: Promise<{ cid: string; lid: string }>;
}
export default async function LessonQuizzes({ params }: LessonQuizzesProps) {
  const  lid = (await params).lid;
  console.log("lid: ", lid);
  const quizzes = await getLessonQuizzes(Number(lid));
  
  return (
    <div>
     
      <Quizzer quizzes={quizzes} />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Raw Quiz Data</h2>
        <JsonViewerComponent data={quizzes} />
      </div>
    </div>
  );
}
