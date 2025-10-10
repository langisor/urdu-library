"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { convertP } from "./converter";
import { QuizPItem } from "../../definitions";
import { useHookstate, type State } from "@hookstate/core";
import { useTune } from "@/hooks/use-tone";
import { useStep } from "@/hooks/use-step";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import * as React from "react";
import {
  shuffleArray,
  Feedback,
} from "@/app/mondly/category/quizzer/_components/helpers-types";

const initialFeedbackState: Feedback = {
  isCorrect: null,
  message: "",
  isAnswered: false,
};

interface QuizPProps {
  quizData: QuizPItem;
  quizzerFeedback: State<Feedback>;
}

export default function QuizP({ quizData, quizzerFeedback }: QuizPProps) {
  const questions = useHookstate(convertP(quizData));
  const [currentStep, actions] = useStep(questions.length);
  const { playCorrectTune, playIncorrectTune } = useTune();
  const feedbackState = useHookstate(quizzerFeedback);
  const handleAnswer = (id: string) => {
    console.log("Card clicked", id);
    if (id === questions[currentStep - 1].id.get()) {
      playCorrectTune();
      feedbackState.isCorrect.set(true);
      feedbackState.message.set("أحسنت");
      setTimeout(() => {
      
      }, 1000);
    } else {
      playIncorrectTune();
      feedbackState.isCorrect.set(false);
      feedbackState.message.set(
        "خطاء، الإجابة الصحيحة " + questions[currentStep - 1].id.get()
      );
      setTimeout(() => {
       
      }, 1000);
    }
    if (actions.canGoToNextStep) {
      actions.goToNextStep();
    } else {
      feedbackState.isAnswered.set(true);
    }
  };
  console.log("Current question", questions[currentStep - 1]);

  React.useEffect(() => {
    console.log("Current question", questions[currentStep - 1]);
    const audio = new Audio(questions[currentStep - 1].audio.get());
    audio.play();
    return () => {
      audio.pause();
    };
  }, [currentStep]);
  return (
    <div className="grid grid-cols-2 gap-4">
      {questions[currentStep - 1].answers.map((answer) => (
        <div key={answer.id.get()}>
          <Card
            onClick={() => handleAnswer(answer.id.get())}
            className="cursor-pointer hover:bg-gray-100 w-full h-full flex flex-col justify-between items-center"
          >
            <CardContent className="w-full h-72 flex flex-col justify-between items-center">
              <Image
                src={answer.image.get()}
                alt={answer.text.get()}
                className="object-cover"
                width={300}
                height={300}
              />
              <CardFooter className="text-sm urdu-text">
                {answer.text.get()}
              </CardFooter>
            </CardContent>
          </Card>
 
        </div>
      ))}
    </div>
  );
}
