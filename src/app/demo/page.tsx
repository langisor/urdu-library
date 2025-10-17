"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import quizData from "./d-samples.json";
import { QuizDItem } from "./definitions";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useQuizD } from "./use-quiz-d";
import { Badge, Keyboard, Mouse, PlayCircle } from "lucide-react";
import React from "react";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import { useTune } from "@/hooks/use-tone";

const quiz = quizData[0] as QuizDItem;

export default function DemoPage() {
  const { actions, currentQuestion } = useQuizD(quiz);

  const renderPrompt = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <Card className="flex flex-row gap-2 items-center justify-center bg-blue-500 text-white w-[400px]">
          <h2 className="text-xl font-bold text-white">
            {currentQuestion.prompt.text}
          </h2>
          <TonePlayerButton url={currentQuestion.prompt.audioFile} />
        </Card>
      </div>
    );
  };

  const renderTopCards = () => {
    return (
      <Card className="grid grid-cols-2 gap-2 p-2">
        <Card 

        className="flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
          <h2 className="text-xl font-bold">
            {currentQuestion.options[0].text}
          </h2>
          <Image
            src={currentQuestion.options[0].image}
            alt={currentQuestion.options[0].text}
            width={300}
            height={300}
            className="w-[200px] h-[200px]"
          />
        </Card>

        <Card className="flex flex-col gap-2 items-center justify-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
          <h2 className="text-xl font-bold">
            {currentQuestion.options[1].text}
          </h2>
          <Image
            src={currentQuestion.options[1].image}
            alt={currentQuestion.options[1].text}
            width={300}
            height={300}
            className="w-[200px] h-[200px]"
          />
        </Card>
      </Card>
    );
  };

  const renderBottomCards = () => {
    return (
      <Card className="grid grid-cols-2 gap-2 p-2">
        <Card className="flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
          <Image
            src={currentQuestion.options[2].image}
            alt={currentQuestion.options[2].text}
            width={300}
            height={300}
            className="w-[200px] h-[200px]"
          />
          <h2 className="text-xl font-bold">
            {currentQuestion.options[2].text}
          </h2>
        </Card>

        <Card className="flex flex-col gap-2 items-center justify-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
          <Image
            src={currentQuestion.options[3].image}
            alt={currentQuestion.options[3].text}
            width={300}
            height={300}
            className="w-[200px] h-[200px]"
          />
          <h2 className="text-xl font-bold">
            {currentQuestion.options[3].text}
          </h2>
        </Card>
      </Card>
    );
  };


  return (
    <div className="flex flex-col gap-2 text-right" dir="rtl">
      <h1 className="text-2xl">Quiz D</h1>
      {renderTopCards()}
      {renderPrompt()}
      {renderBottomCards()}
      <JsonViewerComponent data={currentQuestion} />
    </div>
  );
}
