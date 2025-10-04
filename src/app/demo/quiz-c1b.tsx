"use client";
import { QuizC1bItem } from "../mondly/category/quizzer/_components/definitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import { useC1b } from "./use-c1b";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useHookstate, State } from "@hookstate/core";

type Word = {
  text: string;
  isCompleteToken: boolean;
};
export default function QuizC1b({ quizData }: { quizData: QuizC1bItem }) {
  const { words, actions, completeIndex, completeToken } = useC1b(quizData);
  const selectedWord = useHookstate<Map<string, Word> | null>(null);

  const renderTargetList = () => {
    //  insert selectedWord in targetList at completeIndex
    const targetItems = Array.from(words.targetList.entries()).map(
      ([key, word], index) => {
        if (index === completeIndex) {
          return (
            <div key={key} className="w-fit border p-2 mx-2">
              {selectedWord.get() !== null
                ? selectedWord.get()!.get(key)?.text
                : "________"}
            </div>
          );
        }
        return (
          <div key={key} className="w-fit border p-2 mx-2">
            {word.text}
          </div>
        );
      }
    );
    return targetItems;
  };
  const renderWordsList = () => {
    const wordsItems = [];
    for (const [key, word] of words.wordsList) {
      wordsItems.push(
        <Button key={key} className="p-2 mx-2" onClick={() => actions.handleWordClick(word, key)}>
          {word.text}
        </Button>
      );
    }
    return wordsItems;
  };
  return (
    <Card className="flex flex-col gap-3 text-right" dir="rtl">
      <CardContent className="flex flex-wrap flex-row gap-3">
        {renderTargetList()}
      </CardContent>
      <CardContent className="flex flex-wrap flex-row gap-3">
        {renderWordsList()}
      </CardContent>
      <hr />
      <ShowJson
        originalData={quizData}
        passedData={{
          targetList: words.targetList,
          wordsList: words.wordsList,
          completeIndex: completeIndex,
          completeToken: completeToken,
        }}
      />
    </Card>
  );
}

function ShowJson({
  originalData,
  passedData,
}: {
  originalData: QuizC1bItem;
  passedData: any;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Passed Data</CardTitle>
        <CardContent>
          <JsonViewerComponent data={passedData} />
        </CardContent>
      </CardHeader>
      <CardHeader>
        <CardTitle>Original Data</CardTitle>
        <CardContent>
          <JsonViewerComponent data={originalData} />
        </CardContent>
      </CardHeader>
    </>
  );
}
