import { mainScreenStore } from "./store";
import { useHookstate } from "@hookstate/core";
import * as React from "react";

export function useMainScreen(totalQuizzes?: number) {
  const mainScreenState = useHookstate(mainScreenStore);
  React.useEffect(() => {
    if (totalQuizzes) {
      mainScreenState.totalQuizzes.set(totalQuizzes);
    }
  }, [mainScreenState.totalQuizzes]);

  // actions
  const actions = {
    nextQuiz: () => {
      if (
        mainScreenState.currentQuizIndex.get() <
        mainScreenState.totalQuizzes.get() - 1
      ) {
        mainScreenState.currentQuizIndex.set((p) => p + 1);
      } else {
        mainScreenState.isComplete.set((p) => true);
      }
    },
    prevQuiz: () => {
      if (mainScreenState.currentQuizIndex.get() > 0) {
        mainScreenState.currentQuizIndex.set((p) => p - 1);
      }
    },
    reset: () => {
      mainScreenState.currentQuizIndex.set((p) => 0);
      mainScreenState.isComplete.set(false);
      mainScreenState.score.set((p) => 0);
    },
  };

  return {
    state: mainScreenState,
    actions,
  };
}
