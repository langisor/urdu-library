"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import quizData from "./w1b-samples.json";
import { QuizW1bItem } from "./definitions";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useQuizW1b } from "./use-quiz-w1b";
import { Badge, Keyboard, Mouse, PlayCircle } from "lucide-react";
import React from "react";
const quiz = quizData[1] as QuizW1bItem;

export default function DemoPage() {
  const { actions, quizInfo } = useQuizW1b(quiz);
  const [mode, setMode] = React.useState<"input" | "selection">("input");
  const [inputText, setInputText] = React.useState("");
  // renders

  const renderPromptCard = () => {
    const playAudio = (url: string) => {
      const audio = new Audio(url);
      audio.play();
    };

    const { text, audioFile, image } = actions.getPrompt;
    return (
      <Card className="flex flex-col gap-2 px-2">
        <Card className="flex flex-row justify-center items-center gap-3 ">
          <h2 className="text-lg naskh-text">{text}</h2>
          <Button onClick={() => playAudio(audioFile)}>
            <PlayCircle className="w-4 h-4" />
          </Button>
        </Card>
        <Card className="flex flex-col gap-2 justify-center items-center">
          <Image src={image} alt={text} width={250} height={300} />
        </Card>
      </Card>
    );
  };
  const renderInputMode = () => {
    return (
      <Card className="flex flex-row px-4 gap-2">
        <Label htmlFor="inputText">اكتب النص المقابل: 👈</Label>
        <Input
          value={inputText}
          className="w-[250px] focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500"
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button disabled={inputText === ""}>تحقق</Button>
        <Button disabled={inputText === ""}>مسح</Button>
      </Card>
    );
  };
  const renderSelectionMode = () => {
    const handleTokenClick = (token: string) => {
      setInputText((prev) => prev + token);
      console.log(inputText);
    };
    return (
      <Card className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 justify-center items-center">
          {actions.getTokens.map((token) => {
            return (
              <Button
                variant="outline"
                className="font-bold  text-md  w-16 h-12 hover:bg-blue-500 hover:text-white"
                key={token.id}
                onClick={() => {
                  handleTokenClick(token.text);
                }}
              >
                {token.text}
              </Button>
            );
          })}

          <Label className="text-lg naskh-text text-center bg-blue-500 text-white px-2 py-1 rounded w-[250px] h-12">
            {inputText}
          </Label>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <Button
            disabled={inputText === ""}
            onClick={() => actions.checkAnswer(inputText)}
          >
            تحقق
          </Button>
          <Button disabled={inputText === ""} onClick={() => setInputText("")}>
            مسح
          </Button>
        </div>
      </Card>
    );
  };
  return (
    <div className="flex flex-col gap-2 my-5 text-right   mx-2" dir="rtl">
      {renderPromptCard()}
      <Button
        className="w-16 h-12"
        onClick={() => setMode(mode === "input" ? "selection" : "input")}
      >
        {mode === "input" ? (
          <Keyboard className="w-8   h-8" />
        ) : (
          <Mouse className="w-8 h-8" />
        )}
      </Button>
      {mode === "input" ? renderInputMode() : renderSelectionMode()}
      <Card className="flex flex-col gap-2">
        <h2>quizInfo</h2>
        <JsonViewerComponent data={quizInfo} />
      </Card>
      <Card>
        <h2>quiz</h2>
        <JsonViewerComponent data={quiz} />
      </Card>
    </div>
  );
}
