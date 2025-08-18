import { queryClient } from "@/lib/postgres-client";
import { LessonItem, Quiz } from "@/app/mondly/_types/data-services";
import {Button} from "@/components/ui/button";
const baseLessonsPath = "src/app/mondly/_data/Lessons/";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { DynamicBreadcrumb } from "@/app/mondly/_components/dynamic-breadcrumb";
import { JsonViewerComponent } from "@/components/json-viewer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import lesson_names from "@/app/mondly/_data/lesson-names.json";

async function getLessonData(lessonID: number) {
  const lesson = (
    await queryClient`
    SELECT * FROM "Lesson" WHERE "id" = ${lessonID}
    `
  )[0] as LessonItem;
  // get quizzes ids
  const quizzesIds = lesson.quizzes as number[];
  const quizzesData: Quiz[] = [];
  for (const quizId of quizzesIds) {
    const quiz = await queryClient`
      SELECT * FROM "Quiz" WHERE "id" = ${quizId}
      `;
    quizzesData.push(quiz[0] as Quiz);
  }

  return { lesson, quizzesData };
}

/**
 *
 * @param param0 generateStaticParams
 * @returns
 */
export async function generateStaticParams() {
  return lesson_names.map((item) => ({
    lid: item.id.toString(),
  }));
}

export default async function Lesson({
  params,
}: {
  params: Promise<{ lid: string }>;
}) {
  const { lid } = await params;
  const { lesson, quizzesData } = await getLessonData(Number(lid));
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-4">
        {/* <DynamicBreadcrumb /> */}
        <Card>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-lg font-semibold">
                Category ID: {lesson.categoryID}
              </p>
              <p className="text-lg font-semibold">Lesson ID: {lesson.id}</p>
              <p className="text-lg font-semibold">
                Lesson Name: {lesson.name}
              </p>
              <p className="text-lg font-semibold">
                Quiz Count: {lesson.countQuiz}
              </p>
              <p className="text-lg font-semibold">
                Word Count: {lesson.countWords}
              </p>
              <p className="text-lg font-semibold">
                Phrase Count: {lesson.countPhrases}
              </p>
              <p className="text-lg font-semibold">Done: {lesson.done}</p>
              <p className="text-lg font-semibold">Stars: {lesson.stars}</p>
              <p className="text-lg font-semibold">
                Difficulty: {lesson.difficulty}
              </p>
              <p className="text-lg font-semibold">
                Count Done: {lesson.countDone}
              </p>
            </div>
          </CardContent>
        </Card>

        {quizzesData.map((quiz) => (
          <div key={quiz.id} className=" w-full h-full mb-4 flex flex-col gap-4">
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

