import * as React from "react";
import { promises } from "fs";
import path from "path";
import { LessonData } from "@/app/mondly/_types/data-services";
const baseLessonsPath = "src/app/mondly/_data/Lessons/";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { DynamicBreadcrumb } from "@/app/mondly/_components/dynamic-breadcrumb";
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
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-4">
        <DynamicBreadcrumb />
        <pre dir="rtl">{JSON.stringify(lessonData, null, 2)}</pre>
      </div>
    </Suspense>
  );
}
