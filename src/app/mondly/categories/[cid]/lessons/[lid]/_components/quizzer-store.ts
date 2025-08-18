
"use client";
import { Quiz } from "@/app/mondly/_types/data-services";
import { useHookstate, hookstate, State } from "@hookstate/core";
interface IQuizzerStore {
  currentQuizIndex: number;
  totalQuizzes: number;
  completed: boolean;
  score: number;
  earnedMarks: number;
}
export const quizzerStore = hookstate(
  {
    currentQuizIndex: 0,
    totalQuizzes: 0,
    completed: false,
    score: 0,
    earnedMarks: 0,
  } 
);

export const useQuizzerStore = () => {
  return useHookstate(quizzerStore);
};
export const setQuizzerStore = (store: IQuizzerStore) => {
  quizzerStore.set(store);
};
 
export const resetQuizzerStore = () => {
  quizzerStore.set({
    currentQuizIndex: 0,
    totalQuizzes: 0,
    completed: false,
    score: 0,
    earnedMarks: 0,
  });
};
