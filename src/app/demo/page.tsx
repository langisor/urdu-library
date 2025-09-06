import { JsonViewerComponent } from "@/components/json-viewer";
import { queryClient } from "@/lib/postgres-client";
import { Card } from "@/components/ui/card";
import { QuizP } from "./quiz-p/quiz-p";

async function getQuizData(t: string) {
  const data = await queryClient`
    SELECT * FROM public."Quiz" WHERE type = 'P' LIMIT 5
  `;
  const parsed = JSON.parse(JSON.stringify(data[0].quizData as any));
  return parsed;
  // SELECT * FROM "Quiz" WHERE type = ${t} LIMIT 1
}
export default async function Page() {
  const quizItem = await getQuizData("P");
  console.log("quizItem: ", quizItem);
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1 className="text-3xl">Quiz P</h1>
      {/* left container */}
      <div className="grid grid-cols-2 gap-4">
        <div className=" ">
          <JsonViewerComponent data={quizItem} />
        </div>
        {/* right container */}
        <div className=" ">
          <QuizP quizItem={quizItem} />
        </div>
      </div>
    </div>
  );
}
