"use client";

import { mainScreenStore } from "./store";
import {useHookstate} from "@hookstate/core";

export default function ResultScreen() {
  const state = useHookstate(mainScreenStore);
  return (
    <div>
      <h1>Result Screen</h1>
      <p>Score: {state.score.get()}</p>
      <p>Total Questions: {state.totalQuizzes.get()}</p>
    </div>
  );
}
