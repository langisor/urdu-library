"use client";

import { QuizQItem, type Feedback } from "../../definitions";
import { shuffleArray } from "../../helpers-types";
import { useHookstate, type State } from "@hookstate/core";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import { Card, CardTitle, CardAction } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useStep } from "@/hooks/use-step";
import { useTune } from "@/hooks/use-tone";
import { convertQ } from "./convertQ";
import * as React from "react";
const initialFeedback: Feedback = {
  isCorrect: null,
  isAnswered: false,
  message: "اختر الإجابة الصحيحة",
};
type ScoreState = { userName: string; score: number };
interface QuizQProps {
  quizData: QuizQItem;
  quizzerFeedback: State<Feedback>;
  scoreState: State<ScoreState>;
}

export default function QuizQ({
  quizData,
  quizzerFeedback,
  scoreState,
}: QuizQProps) {
  const questions = useHookstate({
    questions: convertQ(quizData),
    currentStep: 1,
    isCompleted: false,
  });
 
  const { playCorrectTune, playIncorrectTune } = useTune();
  const selectedOption = useHookstate<string>("");
  const localFeedback = useHookstate(initialFeedback);

  React.useEffect(() => {
    const audio = new Audio(questions.questions[questions.get().currentStep - 1].audioFile.get());
    audio.play();
 
  }, [questions.get().currentStep]);
  const currentQuestion = questions.questions[questions.get().currentStep - 1];

  const handleNext = () => {
    if (questions.get().currentStep < questions.get().questions.length) {
      console.log("canGoToNextStep",  questions.get().currentStep);
      questions.currentStep.set(questions.get().currentStep + 1);
      selectedOption.set("");
      localFeedback.isCorrect.set(null);
      localFeedback.isAnswered.set(false);
      localFeedback.message.set(initialFeedback.message);
    } else {
      console.log("canGoToNextStep", questions.get().currentStep);
      localFeedback.set(initialFeedback);
      selectedOption.set("");
      quizzerFeedback.isCorrect.set(true);
      quizzerFeedback.message.set("أحسنت");
      quizzerFeedback.isAnswered.set(true);
      questions.isCompleted.set(true);
    }
  };
  const handleSelect = (value: string) => {
    selectedOption.set(value);
  };
  const handleConfirmAnswer = () => {
    if (selectedOption.get() === currentQuestion.id.get()) {
      playCorrectTune();
      setTimeout(() => {
        console.log("correct");
      }, 1000);
      handleNext();
    } else {
      playIncorrectTune();
      setTimeout(() => {
        console.log("incorrect");
      }, 1000);
      handleNext();
    }
  };
  const renderQuizHeader = () => {
    return <CardTitle className="naskh-text">اختر الإجابة الصحيحة ثم اضغط على تأكد</CardTitle>;
  };

  const renderQuestion = () => {
     
 
    return (
      <Card className="flex flex-wrap flex-row gap-3 items-center justify-center urdu-text ">
        <CardTitle className="flex flex-wrap flex-row gap-3">
          {currentQuestion.text.get()}
          <TonePlayerButton url={currentQuestion.audioFile.get()} />
        </CardTitle>
      </Card>
    );
  };

  const renderOptions = () => {
    return (
      <div className="naskh-text">
        <RadioGroup
          className="flex flex-col gap-2"
          onValueChange={(value) => handleSelect(value)}
          defaultValue={selectedOption.get()}
        >
          <Card className="flex flex-col gap-2 text-right" dir="rtl">
            {currentQuestion.options.map((option) => (
              <CardAction
                key={option.id.get()}
                className="flex flex-row gap-3 w-full items-center hover:bg-gray-100 cursor-pointer transition-all hover:scale-101   h-16 p-5"
                onClick={() => handleSelect(option.id.get())}
              >
                <RadioGroupItem
                  checked={option.id.get() === selectedOption.get()}
                  value={option.id.get()}
                />
                <Label className="text-lg" htmlFor={option.id.get()}>{option.text.get()}</Label>
              </CardAction>
            ))}
          </Card>
        </RadioGroup>
        <Button
          onClick={() => handleConfirmAnswer()}
          disabled={selectedOption.get() === ""}
        >
          تأكد
        </Button>
      </div>
    );
  };
  const renderFeedback = () => {
    return (
      <Card className="flex flex-wrap flex-row gap-3 items-center justify-center ">
        <CardTitle className="flex flex-wrap flex-row gap-3">
          {localFeedback.message.get()}
        </CardTitle>
      </Card>
    );
  }

  return (
    ! questions.isCompleted.get() && (
    <div className="flex flex-col gap-3 text-right" dir="rtl">
      {renderQuizHeader()}
      {renderQuestion()}
      {renderOptions()}
      {renderFeedback()}
    </div>
    )
  )
}
