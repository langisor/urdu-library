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

  React.useEffect(() => {
    console.log("Current question", questions[currentStep - 1].get());
    const audio = new Audio(questions[currentStep - 1].audio.get());
    audio.play();
  }, [currentStep]);

  const handleAnswer = (id: string) => {
    console.log("Card clicked", id);
    if (id === questions[currentStep - 1].id.get()) {
      playCorrectTune();
      feedbackState.isCorrect.set(true);
      feedbackState.message.set("أحسنت");
      setTimeout(() => {}, 1000);
    } else {
      playIncorrectTune();
      feedbackState.isCorrect.set(false);
      feedbackState.message.set(
        "خطاء، الإجابة الصحيحة " + questions[currentStep - 1].id.get()
      );
      setTimeout(() => {}, 1000);
    }
    if (actions.canGoToNextStep) {
      actions.goToNextStep();
    } else {
      feedbackState.isAnswered.set(true);
    }
  };
  console.log("Current question", questions[currentStep - 1]);

  const renderTopCards = () => {
    const [answer1, answer2] = questions[currentStep - 1].answers.slice(0, 2);
    return (
      <div className="grid grid-cols-2 gap-4">
        <div key={answer1.id.get()}>
          <Card
            onClick={() => handleAnswer(answer1.id.get())}
            className="cursor-pointer hover:bg-gray-100 w-full h-full flex flex-col justify-between items-center"
          >
            <CardContent className="w-full h-72 flex flex-col justify-between items-center">
              <Image
                src={answer1.image.get()}
                alt={answer1.text.get()}
                className="object-cover"
                width={300}
                height={300}
              />
              <CardFooter className="text-sm urdu-text">
                {answer1.text.get()}
              </CardFooter>
            </CardContent>
          </Card>
        </div>
        <div key={answer2.id.get()}>
          <Card
            onClick={() => handleAnswer(answer2.id.get())}
            className="cursor-pointer hover:bg-gray-100 w-full h-full flex flex-col justify-between items-center"
          >
            <CardContent className="w-full h-72 flex flex-col justify-between items-center">
              <Image
                src={answer2.image.get()}
                alt={answer2.text.get()}
                className="object-cover"
                width={300}
                height={300}
              />
              <CardFooter className="text-sm urdu-text">
                {answer2.text.get()}
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderBottomCards = () => {
    const [answer3, answer4] = questions[currentStep - 1].answers.slice(2, 4);
    return (
      <div className="grid grid-cols-2 gap-4">
        <div key={answer3.id.get()}>
          <Card
            onClick={() => handleAnswer(answer3.id.get())}
            className="cursor-pointer hover:bg-gray-100 w-full h-full flex flex-col justify-between items-center"
          >
            <CardContent className="w-full h-72 flex flex-col justify-between items-center">
              <Image
                src={answer3.image.get()}
                alt={answer3.text.get()}
                className="object-cover"
                width={300}
                height={300}
              />
              <CardFooter className="text-sm urdu-text">
                {answer3.text.get()}
              </CardFooter>
            </CardContent>
          </Card>
        </div>
        <div key={answer4.id.get()}>
          <Card
            onClick={() => handleAnswer(answer4.id.get())}
            className="cursor-pointer hover:bg-gray-100 w-full h-full flex flex-col justify-between items-center"
          >
            <CardContent className="w-full h-72 flex flex-col justify-between items-center">
              <Image
                src={answer4.image.get()}
                alt={answer4.text.get()}
                className="object-cover"
                width={300}
                height={300}
              />
              <CardFooter className="text-sm urdu-text">
                {answer4.text.get()}
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
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
