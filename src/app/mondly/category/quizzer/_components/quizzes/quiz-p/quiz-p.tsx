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

  const handleAnswer = (id: string) => {
    console.log("Card clicked", id);
    if (id === questions[currentStep].id.get()) {
      setTimeout(() => {
        playCorrectTune();
        quizzerFeedback.isCorrect.set(true);
        quizzerFeedback.message.set("أحسنت");
      }, 1000);
    } else {
      setTimeout(() => {
        playIncorrectTune();
        quizzerFeedback.isCorrect.set(false);
        quizzerFeedback.message.set(
          "خطاء، الإجابة الصحيحة " + questions[currentStep].id.get()
        );
      }, 1000);
    }
    if (actions.canGoToNextStep) {
      actions.goToNextStep();
    } else {
      quizzerFeedback.isAnswered.set(true);
    }
  };
  console.log("Current question", questions[currentStep]);

  React.useEffect(() => {
    console.log("Current question", questions[currentStep]);
    const audio = new Audio(questions[currentStep].audio.get());
    audio.play();
  }, [currentStep]);
  return (
    <div className="grid grid-cols-2 gap-4">
      {questions[currentStep].answers.map((answer) => (
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
          <Card>
            <CardContent
              className={
                quizzerFeedback.isCorrect.get() ? "bg-green-100" : "bg-red-100"
              }
            >
              <p>{quizzerFeedback.message.get()}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
