"use client";
import { QuizFItem } from "../../_hooks/definitions";
import { convertF, QuestionF } from "../../_hooks/converters";
import { useHookstate } from "@hookstate/core";
import { shuffleArray } from "@/lib/helpers";
import { useMainScreen } from "../screens/use-main-screen";
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
  const mainScreenState = useMainScreen();
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
    checkAnswer: (option: string) => {
      //  check if option is correct
      if (option === currentQuestion.correctAnswer.get()) {
        playCorrectTune();
        feedBack.set({ isCorrect: true, text: "أحسنت" });
        // add score
        mainScreenState.state.score.set((p) => p + 1);
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
      mainScreenState.actions.nextQuiz();
    }, 2000);
  }
  const currentQuestion = state.questions[state.currentQuestionIndex.get()];

  const renders = {
    renderFeedBack: () => {
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
    },
    renderCards: () => {
      return (
        <div className="flex flex-col gap-2   p-2  ">
          {/* Header */}
          <Card>
            <CardContent>
              <p className="arabic-text text-center"> اختر الصورة الصحيحة</p>
            </CardContent>
          </Card>
          {/* top option */}
          <div className="w-full">
            <OptionCard
              option={currentQuestion.options[0].get()}
              onCheckAnswer={actions.checkAnswer}
              textTop={true}
            />
          </div>

          {/* question */}
          <div className="w-full">
            <Card className="flex flex-col gap-2 text-right">
              <CardContent className="flex flex-row gap-2 items-center justify-center">
                <p className="arabic-text"> {currentQuestion.text.get()}</p>
                <TonePlayerButton url={currentQuestion.audioFile.get()} />
              </CardContent>
            </Card>
          </div>

          {/* bottom option */}
          <div className="w-full">
            <OptionCard
              option={currentQuestion.options[1].get()}
              onCheckAnswer={actions.checkAnswer}
              textTop={false}
            />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="flex flex-col gap-2">
      <div>{renders.renderCards()}</div>
      <div>{renders.renderFeedBack()}</div>
      {/* <JsonViewerComponent data={state.get()} /> */}
    </div>
  );
}

interface OptionCardProps {
  textTop: boolean;
  option: {
    id: string;
    text: string;
    image: string;
  };
  onCheckAnswer: (answer: string) => void;
}

function OptionCard({ option, onCheckAnswer, textTop }: OptionCardProps) {
  if (textTop) {
    return (
      <Card
        role="button"
        onClick={() => onCheckAnswer(option.text)}
        className="cursor-pointer hover:scale-105 hover:shadow-2xl arabic-text h-full"
      >
        <CardHeader className="flex justify-center items-center">
          <CardTitle>{option.text}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <Image
            src={option.image}
            alt={option.text}
            className=""
            width={300}
            height={300}
          />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card
      role="button"
      onClick={() => onCheckAnswer(option.text)}
      className="cursor-pointer hover:scale-105 hover:shadow-2xl arabic-text"
    >
      <CardContent className="flex justify-center items-center">
        <Image
          src={option.image}
          alt={option.text}
          className=""
          width={300}
          height={300}
        />
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <CardTitle>{option.text}</CardTitle>
      </CardFooter>
    </Card>
  );
}
