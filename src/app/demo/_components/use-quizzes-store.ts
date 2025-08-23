"use client"
import { useHookstate,hookstate} from "@hookstate/core";

const quizzesStore = hookstate({
    globalScore: 0,
})

export const useQuizzesStore = () => {
    const globalStore=useHookstate(quizzesStore)
  return {
    globalScore: globalStore.globalScore,
    setGlobalScore: (score: number) => {
      globalStore.globalScore.set(score)
    }
  }
}
