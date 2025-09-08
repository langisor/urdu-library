"use client";
import { QuizQbItem } from "../../_hooks/definitions";
import { convertQb } from "../../_hooks/converters";
import { useHookstate } from "@hookstate/core";
import { JsonViewerComponent } from "@/components/json-viewer";

export default function QuizQb({ quiz }: { quiz: QuizQbItem }) {
  const state = useHookstate(convertQb(quiz));
  return (
    <div>
      <h1>Quiz Qb</h1>
      <JsonViewerComponent data={state.get()} />
    </div>
  );
}
