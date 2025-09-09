"use client";
import { QuizFItem } from "../../_hooks/definitions";
import { convertF, QuestionF } from "../../_hooks/converters";
import { useHookstate } from "@hookstate/core";
import { shuffleArray } from "@/lib/helpers";
import { mainScreenStore } from "../screens/store";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTune } from "@/hooks/use-tone";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
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

interface QuizState {
  questions: QuestionF[];
  currentQuestionIndex: number;
  isFinished: boolean;
}

export default function QuizF({ quiz }: { quiz: QuizFItem }) {
  const mainScreenState = useHookstate(mainScreenStore);
  const state = useHookstate({
    questions: convertF(quiz),
    currentQuestionIndex: 0,
    isFinished: false,
  });
  const { playCorrectTune, playIncorrectTune } = useTune();
  const feedBack = useHookstate<{ isCorrect: boolean; text: string } | null>(
    null
  );


  //   actions
  const actions = {
    selectOption: (option: string) => {
      //  check if option is correct
      if (option === currentQuestion.correctAnswer.get()) {
        playCorrectTune();
        feedBack.set({ isCorrect: true, text: "أحسنت" });
        // add score
        mainScreenState.score.set((p) => p + 1);
      } else {
        playIncorrectTune();
        feedBack.set({
          isCorrect: false,
          text: "الإجابة الصحيحة هي: " + currentQuestion.correctAnswer.get(),
        });
      }
      // set isAnswered to true
      currentQuestion.isAnswered.set(true);

      // go to next question if not finished after 3 seconds
      if (state.currentQuestionIndex.get() < state.questions.length - 1) {
        setTimeout(() => {
          state.currentQuestionIndex.set(state.currentQuestionIndex.get() + 1);
        }, 3000);
      } else {
        state.isFinished.set(true);
      }
    },

    reset: () => {
      state.set({
        questions: convertF(quiz),
        currentQuestionIndex: 0,
        isFinished: false,
      });
      feedBack.set(null);
    },
  };

  if (state.isFinished.get()) {
    setTimeout(() => {
      mainScreenState.currentQuizIndex.set((p) => p + 1);
    }, 2000);
  }
  const currentQuestion = state.questions[state.currentQuestionIndex.get()];

  const renderFeedBack = () => {
    if (!feedBack.get()) return null;
    return (
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
    );
  };
  const renderQuestion = () => {
    return (
      <div className="flex flex-col gap-2  p-2 arabic-text">
        <h3 className="text-center text-xl underline italic">
          اختر الصورة الصحيحة
        </h3>
        <Card className="  flex items-center justify-center p-2">
          <h1 className="text-center text-xl mb-2 p-2">
            {currentQuestion.options[0].text.get()}
          </h1>
          <div className="hover:bg-gray-100 cursor-pointer transition-all hover:scale-105">
            <div className="relative h-[250px] w-[250px]">
              <Image
                fill
                onClick={() =>
                  actions.selectOption(currentQuestion.options[0].text.get())
                }
                src={currentQuestion.options[0].image.get()}
                alt={currentQuestion.options[0].text.get()}
                className="object-contain"
              />
            </div>
          </div>
        </Card>

        <Card className="flex items-center justify-center  gap-2   max-h-[50px] my-3">
          <div className="flex items-center gap-2">
            <h1 className="text-center text-xl mb-2">
              {currentQuestion.text.get()}
            </h1>
            <TonePlayerButton url={currentQuestion.audioFile.get()} />
          </div>
        </Card>

        <Card className=" flex items-center justify-center p-2">
          <div className="flex justify-center hover:bg-gray-100 cursor-pointer transition-all hover:scale-105">
            <div className="relative h-[250px] w-[250px] p-2">
              <Image
                onClick={() =>
                  actions.selectOption(currentQuestion.options[1].text.get())
                }
                fill
                src={currentQuestion.options[1].image.get()}
                alt={currentQuestion.options[1].text.get()}
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-center text-xl mt-2">
            {currentQuestion.options[1].text.get()}
          </h1>
        </Card>
      </div>
    );
  };
  //  shuffle options

  console.log("currentQuestion: ", currentQuestion);
  return (
    <div className="flex flex-col gap-2">
      <Card className="flex flex-col justify-between gap-2 px-3">
        {renderQuestion()}
      </Card>
      {renderFeedBack()}

      <JsonViewerComponent data={state.get()} />
    </div>
  );
}
