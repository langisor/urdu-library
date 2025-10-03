"use client";
import { QuizDItem } from "../definitions";
import { convertD } from "../converters";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useHookstate, State } from "@hookstate/core";

import { useTune } from "@/hooks/use-tone";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import {
  type Question,
  Feedback,
  mergeElements,
  shuffleArray,
} from "../helpers-types";
import * as React from "react";

interface QuizProps {
  question:  QuizDItem;
  feedback: State<Feedback>;
  onNext: () => void | null;
}

export default function QuizD({
  question,
  feedback,
  onNext,
}: QuizProps) {
  const state = useHookstate({
    questions: convertD(question),
    currentQuestionIndex: 0,
 
  });

  
  const { playCorrectTune, playIncorrectTune } = useTune();
  const currentQuestion = state.questions[state.currentQuestionIndex.get()];
  //  actions
  const actions = {
    checkAnswer: (answer: string) => {
      currentQuestion.isAnswered.set(true);
      if (answer === currentQuestion.correctAnswer.get()) {
        playCorrectTune();
        feedback.set((p)=> {
          return {
            ...p,
            isCorrect: true,
            message: "أحسنت",
           
          };
        });
        // add score
        // mainScreenState.setScore(mainScreenState.getScore() + 1);
      } else {
        playIncorrectTune();
        feedback.set((p)=> {
          return {
            ...p,
            isCorrect: false,
            message: "الإجابة الصحيحة هي: " + currentQuestion.correctAnswer.get(),
          };
        });
      }
      // go to next question if not finished after 3 seconds
      if (state.currentQuestionIndex.get() < state.questions.length - 1) {
        setTimeout(() => {
          state.currentQuestionIndex.set(state.currentQuestionIndex.get() + 1);
        }, 1000);
      } else {
        onNext();
      }
    },
  };
 

  //  renders
  const renderCards = () => {
    return (
      <div className="flex flex-col gap-2 text-right arabic-text">
        {/* top options */}
        <div className="grid grid-cols-2 gap-2">
          <OptionCard
            option={currentQuestion.options[0].get()}
            onCheckAnswer={actions.checkAnswer}
            textTop={true}
          />
          <OptionCard
            option={currentQuestion.options[1].get()}
            onCheckAnswer={actions.checkAnswer}
            textTop={true}
          />
        </div>

        {/* question */}
        <Card className="flex flex-row gap-2 text-right w-full justify-center items-center ">
          <p> {currentQuestion.text.get()}</p>
          <TonePlayerButton url={currentQuestion.audioFile.get()} />
        </Card>

        {/* bottom options */}
        <div className="grid grid-cols-2 gap-2">
          <OptionCard
            option={currentQuestion.options[2].get()}
            onCheckAnswer={actions.checkAnswer}
            textTop={false}
          />
          <OptionCard
            option={currentQuestion.options[3].get()}
            onCheckAnswer={actions.checkAnswer}
            textTop={false}
          />
        </div>
      </div>
    );
  };


  if (state.currentQuestionIndex.get() === state.questions.length - 1) {
    setTimeout(() => {
      onNext();
    }, 1000);
  }
  return <div>{renderCards()}</div>;
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
  console.log("option", option.image);

  if (textTop) {
    return (
      <Card
        role="button"
        onClick={() => onCheckAnswer(option.text)}
        className="cursor-pointer hover:scale-105 hover:shadow-2xl"
      >
        <CardHeader className="flex justify-center items-center">
          <CardTitle>{option.text}</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="">
            <Image
              className="object-contain"
              src={option.image}
              alt={option.text}
              width={300}
              height={300}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card
      role="button"
      onClick={() => onCheckAnswer(option.text)}
      className="cursor-pointer hover:scale-105 hover:shadow-2xl"
    >
      <CardContent className="w-full">
        <div className="">
          <Image
            className="object-contain"
            src={option.image}
            alt={option.text}
            width={300}
            height={300}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <CardTitle>{option.text}</CardTitle>
      </CardFooter>
    </Card>
  );
}
