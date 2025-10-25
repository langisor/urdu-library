"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { convertP, Answer } from "./converter";
import { QuizPItem } from "../../definitions";
import { useHookstate, type State } from "@hookstate/core";
import { useTune } from "@/hooks/use-tone";
import { useStep } from "@/hooks/use-step";
import { Play } from "lucide-react";
import * as React from "react";
import { Feedback } from "@/app/mondly/category/quizzer/_components/helpers-types";
import { Button } from "@/components/ui/button";

const initialFeedbackState: Feedback = {
  isCorrect: null,
  message: "",
  isAnswered: false,
};

interface QuizPProps {
  quizData: QuizPItem;
  quizzerFeedback: State<Feedback>;
}

function shuffleAnswers(answers: Answer[]) {
  const shuffledAnswers = [...answers];
  for (let i = shuffledAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledAnswers[i], shuffledAnswers[j]] = [
      shuffledAnswers[j],
      shuffledAnswers[i],
    ];
  }
  return shuffledAnswers as Answer[];
}

export default function QuizP({ quizData, quizzerFeedback }: QuizPProps) {
  const questions = useHookstate(convertP(quizData));
  const [currentStep, actions] = useStep(questions.length);
  const { playCorrectTune, playIncorrectTune } = useTune();
  const feedbackState = useHookstate(quizzerFeedback);

  const currentQuestion = {
    ...questions[currentStep - 1].get(),
    answers: shuffleAnswers([...questions[currentStep - 1].answers.get()]),
  };
  React.useEffect(() => {
    if (currentStep> questions.length  ) {
      return;
    }
    console.log("Current question", questions[currentStep - 1].get());
    const audio = new Audio(currentQuestion.audio);

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

  const handlePlayQuestionAudio = () => {
    // wait 3 seconds
    const timeout = setTimeout(() => {
      console.log("delay...");
      const audio = new Audio(currentQuestion.audio);
      audio.play();
    }, 3000);
    return () => clearTimeout(timeout);
  };
  const renderTopCards = () => {
    const [answer1, answer2] = currentQuestion.answers.slice(0, 2);
    return (
      <div className="grid grid-cols-2 gap-4">
        <div key={answer1.id}>
          <Card
            onClick={() => handleAnswer(answer1.id)}
            className="cursor-pointer hover:bg-gray-100 w-full h-full flex flex-col justify-between items-center"
          >
            <CardContent className="w-full h-72 flex flex-col justify-between items-center">
              <Image
                src={answer1.image}
                alt={answer1.text}
                className="object-cover"
                width={300}
                height={300}
              />
              <CardFooter className="text-sm urdu-text">
                <h1 className="text-lg">{answer1.text}</h1>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
        <div key={answer2.id}>
          <Card
            onClick={() => handleAnswer(answer2.id)}
            className="cursor-pointer hover:bg-gray-100 w-full h-full flex flex-col justify-between items-center"
          >
            <CardContent className="w-full h-72 flex flex-col justify-between items-center">
              <Image
                src={answer2.image}
                alt={answer2.text}
                className="object-cover"
                width={300}
                height={300}
              />
              <CardFooter className="text-sm urdu-text">
                <h1 className="text-lg">{answer2.text}</h1>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderBottomCards = () => {
    const [answer3, answer4] = currentQuestion.answers.slice(2, 4);
    return (
      <div className="grid grid-cols-2 gap-4">
        <div key={answer3.id}>
          <Card
            onClick={() => handleAnswer(answer3.id)}
            className="cursor-pointer hover:bg-gray-100 w-full h-full flex flex-col justify-between items-center"
          >
            <CardContent className="w-full h-72 flex flex-col justify-between items-center">
              <Image
                src={answer3.image}
                alt={answer3.text}
                className="object-cover"
                width={300}
                height={300}
              />
              <CardFooter className="text-sm urdu-text">
                <h1 className="text-lg">{answer3.text}</h1>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
        <div key={answer4.id}>
          <Card
            onClick={() => handleAnswer(answer4.id)}
            className="cursor-pointer hover:bg-gray-100 w-full h-full flex flex-col justify-between items-center"
          >
            <CardContent className="w-full h-72 flex flex-col justify-between items-center">
              <Image
                src={answer4.image}
                alt={answer4.text}
                className="object-cover"
                width={300}
                height={300}
              />
              <CardFooter className="text-sm urdu-text">
                <h1 className="text-lg">{answer4.text}</h1>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-3">
      {renderTopCards()}
      {/* render question */}
      <div className="flex justify-center">
        <Button
          onClick={handlePlayQuestionAudio}
          className=" w-1/4 cursor-pointer text-lg urdu-text"
        >
          <Play className="w-6 h-6" /> {questions[currentStep - 1].text.get()}
        </Button>
      </div>
      {renderBottomCards()}
    </div>
  );
}
