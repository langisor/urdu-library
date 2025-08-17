import Loading from "@/app/loading";
import { Suspense } from "react";

import { JsonViewerComponent } from "@/components/json-viewer";

import { getQuizzes, TQuizType, GetQuizzesProps } from "./services";

export default async function DemoPage() {
  let quizQueryProps: GetQuizzesProps = {
    type: TQuizType.F,
    limit: 1,
  };
  const fQuizzes = await getQuizzes(quizQueryProps);

  return (
    <Suspense fallback={<Loading />}>
      <pre>{JSON.stringify(fQuizzes, null, 2)}</pre>
    </Suspense>
  );
}
