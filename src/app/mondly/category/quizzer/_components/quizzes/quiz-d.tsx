"use client";
import { QuizDItem } from "../definitions";
import { convertD } from "../converters";
import type { Feedback } from "../definitions";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useHookstate,State } from "@hookstate/core";

import { useTune } from "@/hooks/use-tone";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import * as React from "react";
type ScoreState = { userName: string; score: number };
interface QuizDProps {
  quizData: QuizDItem;
  quizzerFeedBack: State<Feedback>;
  scoreState: State<ScoreState>;
 
}

export default function QuizD({
  quizData,
  quizzerFeedBack,
  scoreState,
}: QuizDProps) {
  const state = useHookstate({
    questions: convertD(quizData),
    currentQuestionIndex: 0,
  });

  const feedBack = useHookstate({
    isCorrect: false,
    text: "",
  });
  const { playCorrectTune, playIncorrectTune } = useTune();


  React.useEffect(() => {
    const audio = new Audio(currentQuestion.audioFile.get());
    audio.play();
    return () => {
      audio.pause();
    };
  }, [state.currentQuestionIndex.get()]);

  const currentQuestion = state.questions[state.currentQuestionIndex.get()];

  //  actions
  const actions = {
    checkAnswer: (answer: string) => {
      currentQuestion.isAnswered.set(true);
      if (answer === currentQuestion.correctAnswer.get()) {
        playCorrectTune();
        feedBack.set({ isCorrect: true, text: "أحسنت" });
        // add score
        scoreState.score.set(scoreState.score.get() + 1);
      } else {
        playIncorrectTune();
        feedBack.set({
          isCorrect: false,
          text: "الإجابة الصحيحة هي: " + currentQuestion.correctAnswer.get(),
        });
      }
      // go to next question if not finished after 3 seconds
      if (state.currentQuestionIndex.get() < state.questions.length - 1) {
        setTimeout(() => {
          state.currentQuestionIndex.set(state.currentQuestionIndex.get() + 1);
        }, 1000);
      } else {
        quizzerFeedBack.isAnswered.set(true);

      }
    },
  };

  //  renders
  const renderCards = () => {
    return (
      <div className="flex flex-col gap-2 text-right arabic-text px-2">
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
  
            <Image
              className="object-cover w-[200] h-[300] "
              src={option.image}
              alt={option.text}
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
