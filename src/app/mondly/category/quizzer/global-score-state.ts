"use client";

import { hookstate, useHookstate, State } from "@hookstate/core";

interface ScoreStateProp {
  userName: string;
  score: number;
}

// internal
const scoreState = hookstate({
  userName: "",
  score: 0,
});
const wrapper = (s: State<ScoreStateProp>) => ({
  getScore: () => s.score.value,
  getUserName: () => s.userName.value,
  setUserName: (name: string) => s.userName.set(name),
  addToScore: (score: number) => s.score.set((p) => p + score),
  setScore: (score: number) => s.score.set(score),
});

// external
// inside component
export const globalScoreState = () => wrapper(useHookstate(scoreState));

export const initalGlobalScoreState = (s: ScoreStateProp) => {
  (scoreState.score.set(s.score), scoreState.userName.set(s.userName));
};
