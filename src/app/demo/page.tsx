import { queryClient } from "@/lib/postgres-client";
import { JsonViewerComponent } from "@/components/json-viewer";
async function getDistinctQuizTypes() {
  const _quizzes = await queryClient`
  SELECT  "quizData"  FROM "Quiz" where "type"='D' LIMIT 1
  `
  const parsedQuizzes =  [];
  for(let quiz of _quizzes) {
    parsedQuizzes.push(JSON.parse(JSON.stringify(quiz.quizData)));
  }
  return parsedQuizzes;

}

import { Button } from "@/components/ui/button";

export default async function Demo() {
  const quizTypes = await getDistinctQuizTypes();
  return (
    <div>
      <h1 className="text-2xl font-bold">demo</h1>
      <JsonViewerComponent data={quizTypes} />
    </div>
  );
}
