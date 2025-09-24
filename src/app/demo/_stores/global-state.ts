import { hookstate, useHookstate, State } from "@hookstate/core";

interface GlobalState {
  currentQuizIndex: number;
  totalQuizzes: number;
  isComplete: boolean;
  score: number;
}

// internal variables

const globalState = hookstate({
  currentQuizIndex: 0,
  totalQuizzes: 0,
  isComplete: false,
  score: 0,
});
const wrapState = (s: State<GlobalState>) => ({
  getCurrentQuizIndex: () => s.currentQuizIndex.value,
  getTotalQuizzes: () => s.totalQuizzes.value,
  getIsComplete: () => s.isComplete.value,
  getScore: () => s.score.value,
  setTotalQuizzes: (totalQuizzes: number) => s.totalQuizzes.set(totalQuizzes),
  setScore: (score: number) => s.score.set((p) => p + score),
  nextQuiz: () => s.currentQuizIndex.set((p) => p + 1),
  prevQuiz: () => s.currentQuizIndex.set((p) => p - 1),
  reset: () =>
    s.set({
      currentQuizIndex: 0,
      totalQuizzes: 0,
      isComplete: false,
      score: 0,
    }),
});

// exposed functions external to the state
// The following 2 functions can be exported now:
export const accessGlobalState = () => wrapState(globalState); // Ex. access outside of the component
export const useGlobalState = () => wrapState(useHookstate(globalState)); // Ex. access inside of the component
