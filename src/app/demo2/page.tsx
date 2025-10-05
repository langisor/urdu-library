"use client";
import { Card, CardContent } from "@/components/ui/card";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";

import data from "./c1b-samples.json";
import QuizC1b from "./quiz-c1b";
import { useHookstate, State } from "@hookstate/core";
import { Feedback } from "../mondly/category/quizzer/_components/helpers-types";
const initialFeedback = {
  isAnswered: false,
  isCorrect: null,
  message: "",
};
export default function DemoPage() {
  const feedbackState: State<Feedback> = useHookstate(
    initialFeedback as Feedback
  );
  return (
    <div className="flex flex-col gap-8 text-left" dir="ltr">
      <QuizC1b
        quizData={data[4]}
        quizzerFeedback={feedbackState}
        onNextQuiz={() => {
          console.log("nextQuiz");
        }}
      />
      <Card>
        <h1 className="text-2xl font-bold">All C1b samples</h1>
        <CardContent>
          <JsonViewerComponent data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
