"use client";
import { QuizFItem } from "../definitions";
import { convertF } from "../converters";
import { useHookstate, State } from "@hookstate/core";
import { shuffleArray } from "@/lib/helpers";

import Image from "next/image";
import { useTune } from "@/hooks/use-tone";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import {
  Card,
  CardContent,

  CardFooter,
} from "@/components/ui/card";
import * as React from "react";
import { Feedback } from "../definitions";

interface QuizProps {
  quizData: QuizFItem;
  quizzerFeedback: State<Feedback>;
}
export default function QuizF({ quizData, quizzerFeedback }: QuizProps) {
  const state = useHookstate({
    questions: convertF(quizData),
    currentQuestionIndex: 0,
    isFinished: false,
  });

  const { playCorrectTune, playIncorrectTune } = useTune();

  React.useEffect(() => {
    const audio = new Audio(state.questions[state.currentQuestionIndex.get()].audioFile.get());
    audio.play();
    return () => {
      audio.pause();
    };
  }, [state.currentQuestionIndex.get()]);
  //   actions
  const actions = {
    checkAnswer: (option: string) => {
      //  check if option is correct
      if (option === currentQuestion.correctAnswer.get()) {
        playCorrectTune();
        quizzerFeedback.isCorrect.set(true);
        quizzerFeedback.message.set("أحسنت");
      } else {
        playIncorrectTune();
        quizzerFeedback.isCorrect.set(false);
        quizzerFeedback.message.set(
          "الإجابة الصحيحة هي: " + currentQuestion.correctAnswer.get()
        );
      }
      // set isAnswered to true
      currentQuestion.isAnswered.set(true);

      // go to next question if not finished after 3 seconds
      if (state.currentQuestionIndex.get() < state.questions.length - 1) {
        setTimeout(() => {
          state.currentQuestionIndex.set(state.currentQuestionIndex.get() + 1);
        }, 1000);
      } else {
        state.isFinished.set(true);
        quizzerFeedback.isAnswered.set(true);
      }
    },
  };

  const currentQuestion = state.questions[state.currentQuestionIndex.get()];

  const renders = {
    renderCards: () => {
      // shuffle options
      currentQuestion.options.set((p) => [...shuffleArray(p)]);
      return (
        <div
          className="w-full  justify-center  flex flex-col gap-2   p-2 text-right "
          dir="rtl"
        >
          <h2 className="arabic-text"> اختر الصورة الصحيحة</h2>
          {/* Header */}

          {/* top option */}
          <div className="flex  flex-col gap-6">
            <OptionCard
              option={currentQuestion.options[0].get()}
              onCheckAnswer={actions.checkAnswer}
              textTop={true}
            />
          </div>

          {/* question */}
          <div className="flex  flex-col gap-2">
            <Card className="flex flex-col gap-2 text-right">
              <CardContent className="flex flex-row gap-2 items-center justify-center">
                <p className="urdu-text"> {currentQuestion.text.get()}</p>
                <TonePlayerButton url={currentQuestion.audioFile.get()} />
              </CardContent>
            </Card>
          </div>

          {/* bottom option */}
          <div className="flex  flex-col gap-2">
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
     <Card className="flex flex-col gap-2 items-center justify-center cursor-pointer" role="button" onClick={() => onCheckAnswer( option.text )}>
       <CardFooter>
        <h2 className="naskh-text text-xl">{option.text}</h2>
      </CardFooter>
      <CardContent className="  flex flex-col gap-2 items-center justify-center h-[200px] ">
 
        <Image
          src={option.image}
          alt={option.text}
          className="object-contain"
          width={200}
          height={200}
        />
      </CardContent>
     
     </Card>
    );
  }
  return (
    <Card className="flex flex-col gap-2 items-center justify-center cursor-pointer" role="button" onClick={() => onCheckAnswer(option.text)}>
      <CardContent className="   flex flex-col gap-2 items-center justify-center h-[200px]">
        <Image
          src={option.image}
          alt={option.text}
          className="object-contain "
          width={200}
          height={200}

        />
      
      </CardContent>
      <CardFooter>
        <h2 className="naskh-text text-xl">{option.text}</h2>
      </CardFooter>
    </Card>
  );
}
