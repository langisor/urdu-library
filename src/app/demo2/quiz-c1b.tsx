"use client";
import { QuizC1bItem } from "../mondly/category/quizzer/_components/definitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import { useC1b } from "./use-c1b";
import { State, useHookstate } from "@hookstate/core";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Feedback } from "@/app/mondly/category/quizzer/_components/helpers-types";

interface QuizC1bState {
  quizData: QuizC1bItem;
  quizzerFeedback: State<Feedback>;
  onNextQuiz: () => void;
}
type Word = {
  text: string;
  isCompleteToken: boolean;
};

const PLACEHOLDER = "______";

export default function QuizC1b({
  quizData,
  quizzerFeedback,
  onNextQuiz,
}: QuizC1bState) {
  const { interactiveData, staticData, actions } = useC1b(quizData);


  const handleWordClick = (word: string) => {
    console.log("handleWordClick()...", word);
    quizzerFeedback.isAnswered.set(true);
    actions.handleSelectWord(word);
  };
  const checkAnswer = () => {
    console.log("checkAnswer()...");
  };

  const renderTargetWordList = () => {
    return (
      <Card className="flex flex-wrap flex-row gap-3 items-center justify-center bg-gradient-to-b from-secondary to-primary/40">
        {interactiveData.targetWordList.map((word, index) => (
          <Button
            disabled={true}
            variant={staticData.completeIndex === index ? "default" : "outline"}
            key={`target-${index}`}
          >
            {word}
          </Button>
        ))}
      </Card>
    );
  };

  const renderWordList = () => {
    return (
      <Card className="flex flex-wrap flex-row gap-3 items-center justify-center">
        {interactiveData.wordsList.map((word, index) => (
          <Button
            key={`word-${index}`}
            onClick={() => handleWordClick(word)}
          >
            {word}
          </Button>
        ))}
      </Card>
    );
  };
  const renderActionButtons = () => {
    return (
      <Card className="flex flex-wrap flex-row gap-3 items-center justify-center">
        <Button
          onClick={checkAnswer}
          disabled={!quizzerFeedback.isAnswered.value}
        >
          تأكد
        </Button>
        <Button onClick={() => console.log("reset")}>Reset</Button>
      </Card>
    );
  };
  const renderQuizHeader = () => {
    return <CardTitle> أكمل الفراغ باختيار الكلمة الصحيحة</CardTitle>;
  };
  const renderQuestion = () => {
    return (
      <Card className="flex flex-wrap flex-row gap-3 items-center justify-center">
        <CardTitle className="flex flex-wrap flex-row gap-3">
          <div>{staticData.questionText}</div>
          <TonePlayerButton url={staticData.audioFile} />
        </CardTitle>
      </Card>
    );
  };
  return (
    <div className="flex flex-col gap-3 text-right" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle> {renderQuizHeader()}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>{renderQuestion()}</div>
          <div>{renderTargetWordList()}</div>
          <div>{renderWordList()}</div>
          <div>{renderActionButtons()}</div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader>
          <CardTitle>Interactive Data</CardTitle>
        </CardHeader>
        <CardContent>
          <JsonViewerComponent data={interactiveData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Static Data</CardTitle>
        </CardHeader>
        <CardContent>
          <JsonViewerComponent data={staticData} />
        </CardContent>
      </Card> */}
    </div>
  );
}
