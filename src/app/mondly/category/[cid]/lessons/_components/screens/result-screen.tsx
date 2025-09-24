"use client";

import { useMainScreen } from "./use-main-screen";

export default function ResultScreen() {
  const {state} = useMainScreen();
  return (
    <div>
      <h1>Result Screen</h1>
      <p>Score: {state.score.get()}</p>
      <p>Total Questions: {state.totalQuizzes.get()}</p>
    </div>
  );
}
