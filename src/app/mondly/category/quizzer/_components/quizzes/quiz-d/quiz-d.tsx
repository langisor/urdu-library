"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { State, useHookstate } from "@hookstate/core";
import { type Feedback, QuizDItem } from "../../definitions";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import Image from "next/image";
import { useQuizD } from "./use-quiz-d";
import React from "react";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import { useTune } from "@/hooks/use-tone";
import { ConvertDQuestion } from "./converter";
const initialFeedback: Feedback = {
  isCorrect: null,
  isAnswered: false,
  message: "اختر الإجابة الصحيحة",
};
type ScoreState = { userName: string; score: number };
interface QuizQProps {
  quizData: QuizDItem;
  quizzerFeedback: State<Feedback>;
  scoreState: State<ScoreState>;
}
export default function QuizD({
  quizData,
  quizzerFeedback,
  scoreState,
}: QuizQProps) {
  const { actions } = useQuizD(quizData);
  const { playCorrectTune, playIncorrectTune } = useTune();
  const questionFeedback = useHookstate(initialFeedback);
  const currentQuestion = actions.getCurrentQuestion;

  const handleOptionClick = (optionId: string) => {
    if (optionId === currentQuestion.prompt.correctOptionId.get()) {
      playCorrectTune();
      setTimeout(() => {
        questionFeedback.set({
          isCorrect: true,
          isAnswered: true,
          message: "أحسنت",
        });
      }, 1000);
    } else {
      playIncorrectTune();
      setTimeout(() => {
        questionFeedback.set({
          isCorrect: false,
          isAnswered: true,
          message: ` خطاء ـ الإجابة الصحيحة هي ${currentQuestion.options.find((option) => option.id.get() === currentQuestion.prompt.correctOptionId.get())?.text.get()}`,
        });
      }, 1000);
    }
    // TODO: update feedback if last question
    if (actions.getCurrentQuestionIndex === 3) {
      quizzerFeedback.set({
        isCorrect: true,
        isAnswered: true,
        message: "أحسنت",
      });

      actions.goToNextQuestion();
    }
  };
  const renderPrompt = () => {
    return <PromptCard prompt={currentQuestion.prompt.get()} />;
  };
  const renderQuestionFeedback = () => {
    return questionFeedback.isAnswered.get() ? (
      <Card className="flex flex-wrap flex-row gap-3 items-center justify-center ">
        <CardTitle
          className={
            questionFeedback.isCorrect.get() ? "text-green-500" : "text-red-500"
          }
        >
          {questionFeedback.message.get()}
        </CardTitle>
      </Card>
    ) : (
      <></>
    );
  };
  const renderTopCards = () => {
    return (
      <Card className="grid grid-cols-2 gap-2 p-2">
        {currentQuestion.options.slice(0, 2).map((option) => (
          <OptionCard
            key={option.id.get()}
            option={option.get()}
            onClick={() => handleOptionClick(option.id.get())}
          />
        ))}
      </Card>
    );
  };

  const renderBottomCards = () => {
    return (
      <Card className="grid grid-cols-2 gap-2 p-2">
        {currentQuestion.options.slice(2, 4).map((option) => (
          <OptionCard
            key={option.id.get()}
            option={option.get()}
            onClick={() => handleOptionClick(option.id.get())}
          />
        ))}
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-2 text-right" dir="rtl">
      <h1 className="text-2xl">Quiz D</h1>

      {renderTopCards()}
      {renderPrompt()}
      {renderBottomCards()}
      {renderQuestionFeedback()}
    </div>
  );
}

function PromptCard({ prompt }: { prompt: ConvertDQuestion["prompt"] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Card className="flex flex-row items-center justify-center gap-2 w-[400px] bg-blue-500 p-2 text-white">
        <h2 className="text-xl font-bold">{prompt.text}</h2>
        <TonePlayerButton url={prompt.audioFile} />
      </Card>
    </div>
  );
}

interface OptionCardProps {
  option: ConvertDQuestion["options"][number];
  onClick: (optionId: string) => void;
}

function OptionCard({ option, onClick }: OptionCardProps) {
  return (
    <Card
      className="flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
      onClick={() => onClick(option.id)}
    >
      <Image
        src={option.image}
        alt={option.text}
        width={300}
        height={300}
        className="w-[200px] h-[200px]"
      />
      <h2 className="text-xl font-bold">{option.text}</h2>
    </Card>
  );
}
