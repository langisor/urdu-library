"use client";
import { QuizDItem } from "../../_hooks/definitions";
import { convertD } from "../../_hooks/converters";
import { Button } from "@/components/ui/button";
import { useHookstate } from "@hookstate/core";
import { JsonViewerComponent } from "@/components/json-viewer";
import { mainScreenStore } from "../screens/store";
export default function QuizD({ quiz }: { quiz: QuizDItem }) {
  const state = useHookstate(convertD(quiz));
  const mainScreenState = useHookstate(mainScreenStore);
  return (
    <div>
      <h1>Quiz D</h1>
      <JsonViewerComponent data={state.get()} />
      <Button
        onClick={() => {
          mainScreenState.score.set((p) => p + 1);
          mainScreenState.currentQuizIndex.set((p) => p + 1);
        }}
      >
        Assume answered correctly
      </Button>
    </div>
  );
}
