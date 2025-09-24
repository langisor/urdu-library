"use client";

import { useGlobalState } from "./_stores/global-state";

export default function ResultScreen() {
  const mainScreenStore = useGlobalState();
  return (
    <div>
      <h1>Result Screen</h1>
      <p>Score: {mainScreenStore.getScore()}</p>
      <p>Total Questions: {mainScreenStore.getTotalQuizzes()}</p>
    </div>
  );
}
