"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useQuizP } from "./use-p";
import data from "./quiz-p.json";
import { useHookstate, type State } from "@hookstate/core";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import * as React from "react";
import { shuffleArray,Feedback } from "@/app/mondly/category/quizzer/_components/helpers-types";
 
const initialFeedbackState: Feedback = {
  isCorrect: null,
  message: "",
  isAnswered: false,
};

export default function Demo() {
  const { currentQuestion, handleAnswer } = useQuizP({
    quizData: data,
  });
  const feedbackState = useHookstate(initialFeedbackState);
  const handleCardClick = (id: string) => {
    console.log("Card clicked", id);
  };
  console.log("Current question", currentQuestion.get());
  
  React.useEffect(() => {
      console.log("Current question", currentQuestion);
    const audio = new Audio(currentQuestion.audio.get());
    audio.play();
  }, [currentQuestion.value]);
  return (
    <div className="grid grid-cols-2 gap-4">
      {currentQuestion.answers.map((answer) => (
        <Card
          onClick={() => handleAnswer(answer.id.get(), feedbackState)}
          className="cursor-pointer hover:bg-gray-100 w-full h-full flex flex-col justify-between items-center"
          key={answer.id.get()}
        >
          <CardContent className="w-full h-full flex flex-col justify-between items-center">
            <Image
              src={answer.image.get()}
              alt={answer.text.get()}
              className="object-cover"
              width={600}
              height={400}
            />
            <CardFooter className="text-sm urdu-text">
              {answer.text.get()}
            </CardFooter>
          </CardContent>
        </Card>
      ))}
      {/* <TonePlayerButton url={currentQuestion.audio.get()} autoPlay={true} /> */}
    </div>
  );
}
