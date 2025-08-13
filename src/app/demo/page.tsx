import { queryClient } from "@/server/postgres-client";
import { _db_columns } from "./types";
import Loading from "@/app/loading";
import { Suspense } from "react";

async function getLessonQuizzes(lessonID: number) {
  const result = await queryClient`
  select
    *
  from "Quiz"
  where "lessonID" = ${lessonID}`;

  return result;
}

export default async function Home() {
  const data = await getLessonQuizzes(101);

  return (
    <Suspense fallback={<Loading />}>
      <pre dir="ltr" className="text-left">
        {JSON.stringify(data, null, 2)}
      </pre>
    </Suspense>
  );
}
