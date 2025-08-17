import * as React from "react";
import { promises } from "fs";
import path from "path";
import { LessonData } from "@/app/mondly/_types/data-services";
const baseLessonsPath = "src/app/mondly/_data/Lessons/";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { DynamicBreadcrumb } from "@/app/mondly/_components/dynamic-breadcrumb";
import { JsonViewerComponent } from "@/components/json-viewer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
/**
 * Get lesson data include its quizzes
 * @param lessonID  lesson id as number
 *
 */
async function getLessonData(lessonID: number) {
  console.log("lessonID", lessonID);
  const filepath = path.join(
    process.cwd(),
    baseLessonsPath,
    `${lessonID}.json`
  );
  const data = await promises.readFile(filepath, "utf-8");
  const parsedData = JSON.parse(data) as LessonData;
  return parsedData;
}
export default async function Lesson({
  params,
}: {
  params: Promise<{ lid: string }>;
}) {
  const { lid } = await params;
  const lessonData = await getLessonData(Number(lid));
  const quizzes = lessonData.quizzes;
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-4">
        <DynamicBreadcrumb />
        <Card>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-lg font-semibold">
                Category ID: {lessonData.lesson.categoryID}
              </p>
              <p className="text-lg font-semibold">
                Lesson ID: {lessonData.lesson.id}
              </p>
              <p className="text-lg font-semibold">
                Lesson Name: {lessonData.lesson.name}
              </p>
              <p className="text-lg font-semibold">
                Quiz Count: {lessonData.lesson.countQuiz}
              </p>
              <p className="text-lg font-semibold">
                Word Count: {lessonData.lesson.countWords}
              </p>
              <p className="text-lg font-semibold">
                Phrase Count: {lessonData.lesson.countPhrases}
              </p>
              <p className="text-lg font-semibold">
                Done: {lessonData.lesson.done}
              </p>
              <p className="text-lg font-semibold">
                Stars: {lessonData.lesson.stars}
              </p>
              <p className="text-lg font-semibold">
                Difficulty: {lessonData.lesson.difficulty}
              </p>
              <p className="text-lg font-semibold">
                Count Done: {lessonData.lesson.countDone}
              </p>
            </div>
          </CardContent>
        </Card>
      
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="mb-4 flex flex-col gap-4">
                <Badge
                  variant="outline"
                  className="text-lg font-semibold text-center bg-blue-500 text-white"
                >
                  {quiz.type}
                </Badge>
                <JsonViewerComponent data={quiz} />
              </div>
            ))}
       
      </div>
    </Suspense>
  );
}
