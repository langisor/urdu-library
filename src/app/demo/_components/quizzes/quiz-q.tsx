"use client";
import { QuizQItem } from "../../_hooks/definitions";

import { convertQ } from "../../_hooks/converters";
import { useHookstate } from "@hookstate/core";
import { mainScreenStore } from "../screens/store";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useTune } from "@/hooks/use-tone";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import * as React from "react";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";

type Option = {
  id: string;
  text: string;
};

export default function QuizQ({ quiz }: { quiz: QuizQItem }) {
  const state = useHookstate({
    questions: convertQ(quiz),
    currentQuestionIndex: 0,
    isLastQuestion: false,
  });
  const { playCorrectTune, playIncorrectTune } = useTune();
  const feedBack = useHookstate<{ isCorrect: boolean; text: string } | null>(
    null
  );
  const mainScreenState = useHookstate(mainScreenStore);
  const selectectOption = useHookstate<string | null>(null);
  const currentQuestion = state.questions[state.currentQuestionIndex.get()];

  // actions
  const actions = {
    nextQuestion: () => {
      // wait 2 seconds
      setTimeout(() => {
        //  if last question
        if (state.currentQuestionIndex.get() === state.questions.length - 1) {
          mainScreenState.currentQuizIndex.set((p) => p + 1);
        } else {
          state.currentQuestionIndex.set(state.currentQuestionIndex.get() + 1);
          selectectOption.set(null);
          currentQuestion.isAnswered.set(false);
          feedBack.set(null);
        }
      }, 2000);
    },
    selectOption: (optionId: string) => {
      console.log(optionId);
      selectectOption.set(optionId);
      currentQuestion.isAnswered.set(true);
      // check if option is correct
      if (optionId === currentQuestion.correctAnswerId.get()) {
        playCorrectTune();
        // add score
        mainScreenState.score.set((p) => p + 1);
        feedBack.set({ isCorrect: true, text: "أحسنت" });
        actions.nextQuestion();
      } else {
        playIncorrectTune();
        const correctOption = currentQuestion.options.find(
          (option) => option.id.get() === currentQuestion.correctAnswerId.get()
        );
        feedBack.set({
          isCorrect: false,
          text: "الإجابة الصحيحة هي: " + correctOption?.text.get(),
        });
        actions.nextQuestion();
      }
    },
  };

  console.log("sample: ", state.questions.get());
  return (
    <div className="flex flex-col  text-right" dir="rtl">
      {/* Header */}
      <Card className="h-full">
        <CardHeader className="flex flex-row text-right gap-6">
          <CardTitle>
            <p>{currentQuestion.text.get()}</p>
          </CardTitle>

          <CardDescription>
            <TonePlayerButton url={currentQuestion.audioFile.get()} />
          </CardDescription>
        </CardHeader>
        {/* options area */}
        <CardContent>
          <RadioGroup
            className="flex flex-col gap-2 text-right"
            dir="rtl"
            onValueChange={(value) => actions.selectOption(value)}
            value={selectectOption.get()}
          >
            {currentQuestion.options.map((option) => (
              <Card
                className={`flex flex-row px-2  gap-3 hover:bg-gray-100 cursor-pointer transition-all hover:scale-105 text-xl  `}
              >
                <RadioGroupItem value={option.id.get()} id={option.id.get()} />
                <Label htmlFor={option.id.get()} className="w-full ">
                  {option.text.get()}
                </Label>
              </Card>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
      {feedBack && (
        <Card>
          <CardContent>
            <p
              className={
                feedBack.get()?.isCorrect ? "text-green-500" : "text-red-500"
              }
            >
              {feedBack.get()?.text}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
