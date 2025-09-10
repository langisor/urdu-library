"use client";
import { QuizDItem } from "../../_hooks/definitions";
import { convertD } from "../../_hooks/converters";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useHookstate } from "@hookstate/core";
import { JsonViewerComponent } from "@/components/json-viewer";
import { mainScreenStore } from "../screens/store";
import { useTune } from "@/hooks/use-tone";
import { TonePlayerButton } from "@/components/general/tone-button-player";
export default function QuizD({ quiz }: { quiz: QuizDItem }) {
  const state = useHookstate({
    question: convertD(quiz),
    currentQuestionIndex: 0,
    isFinished: false,
  });
  const mainScreenState = useHookstate(mainScreenStore);
  const feedBack = useHookstate({
    isCorrect: false,
    text: "",
  });
  const { playCorrectTune, playIncorrectTune } = useTune();

  //  actions
  const actions = {
    checkAnswer: (answer: string) => {
      const currentQuestion = state.question[state.currentQuestionIndex.get()];
      currentQuestion.isAnswered.set(true);
      if (answer === currentQuestion.correctAnswer.get()) {
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
      // go to next question if not finished after 3 seconds
      if (state.currentQuestionIndex.get() < state.question.length - 1) {
        setTimeout(() => {
          state.currentQuestionIndex.set(state.currentQuestionIndex.get() + 1);
        }, 1000);
      } else {
        state.isFinished.set(true);
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

  const currentQuestion = state.question[state.currentQuestionIndex.get()];

  if (state.isFinished.get()) {
    setTimeout(() => {
      mainScreenState.currentQuizIndex.set(
        mainScreenState.currentQuizIndex.get() + 1
      );
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
