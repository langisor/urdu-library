"use client";
import { useHookstate, hookstate } from "@hookstate/core";
import * as React from "react";
 const mainScreenStore = hookstate({
  currentQuizIndex: 0,
  totalQuizzes: 0,
  isComplete: false,
  score: 0,

});
 
export function useMainScreen() {
  const mainScreenState = useHookstate(mainScreenStore);
 
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
    setTotalQuizzes: (totalQuizzes: number) => {
      mainScreenState.totalQuizzes.set(totalQuizzes);
    },
  };



  return {
    state: mainScreenState,
    actions,
  };
}
