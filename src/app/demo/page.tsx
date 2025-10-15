"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import quizData from "./w1b-samples.json";
import { QuizW1bItem } from "./definitions";
import { JsonViewer } from "@/components/json-viewer";

import { useQuizW1b } from "./use-quiz-w1b";
import { PlayCircle } from "lucide-react";

const quiz = quizData[1] as QuizW1bItem;

export default function DemoPage() {
  const { actions, quizInfo } = useQuizW1b(quiz);

  const renderPromptCard = () => {
    const playAudio = (url: string) => {
      const audio = new Audio(url);
      audio.play();
    };
    console.log("renderPrompCard");
    const { text, audioFile } = actions.getPrompt;
    return (
      <Card className="flex flex-row gap-3 px-4">
        <h2 className="text-lg">
          {text}
        </h2>
        <Button onClick={() => playAudio(audioFile)}>
          <PlayCircle className="w-4 h-4" />
        </Button>
      </Card>
    );
  };

  const renderSelectedTokens = () => {};
  const renderTokensList = () => {};
  return (
    <div className="flex flex-col gap-2 my-5 text-right urdu-text mx-2" dir="rtl">
      {renderPromptCard()}
      <Card>
        <h2>quizInfo</h2>
        <JsonViewer value={quizInfo} />
      </Card>
      <Card>
        <h2>quiz</h2>
        <JsonViewer value={quiz} />
      </Card>
    </div>
  );
}
