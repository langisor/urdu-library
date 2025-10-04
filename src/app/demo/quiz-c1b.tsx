"use client";
import { QuizC1bItem } from "../mondly/category/quizzer/_components/definitions";
import { Card, CardContent } from "@/components/ui/card";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import { useC1b } from "./use-c1b";
import * as React from "react";
import { Button } from "@/components/ui/button";

export default function QuizC1b({ quizData }: { quizData: QuizC1bItem }) {
  const { sentence, options, completeToken } = useC1b(quizData);

  return (
    <Card className="flex flex-col gap-4 text-right" dir="rtl">
      {/* <CardContent>{renderSentence()}</CardContent> */}
      {/* <CardContent>{renderOptions()}</CardContent> */}

      <CardContent>
        {<JsonViewerComponent data={{
          sentence,
          options,
          completeToken,
        }} />}
      </CardContent>
    </Card>
  );
}
