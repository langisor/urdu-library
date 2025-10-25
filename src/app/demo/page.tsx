"use client";
import { QuizC2b } from "./quiz-c2b";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import quizData from "./c2b-samples.json";
import { useHookstate } from "@hookstate/core";
import { QuizC2bItem } from "./definitions";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";

const quiz = quizData[1] as QuizC2bItem;
console.log("quizzes length", quizData.length);

export default function DemoPage() {
  return (
    <div>
      <JsonViewerComponent data={quizData} />
    </div>
  );
}
