"use client";

import * as React from "react";
import { useGlobalState, accessGlobalState } from "./_stores/global-state";

// set global quizzes length
function setQuizzesLength(quizzes: number) {
  accessGlobalState().setTotalQuizzes(quizzes);
}

export default function QuizzerScreen({ quizzes }: { quizzes: any[] }) {
  const state = useGlobalState();

  React.useEffect(() => {
    setQuizzesLength(quizzes.length);
  }, [quizzes.length]);
  return (
    <div>
      <h1>Quizzer Screen</h1>
      <p>Current Quiz Index: {state.getCurrentQuizIndex()}</p>
      <p>Total Quizzes: {state.getTotalQuizzes()}</p>
    </div>
  );
}
