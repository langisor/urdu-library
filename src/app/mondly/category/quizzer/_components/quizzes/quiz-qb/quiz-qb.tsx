"use client";

import { QuizQbItem, type Feedback } from "../../definitions";
import { shuffleArray } from "../../helpers-types";
import { useHookstate, type State } from "@hookstate/core";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TonePlayerButton } from "@/components/general/tone-button-player";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { convertQb } from "./converter";
import { useStep } from "@/hooks/use-step";
import { useTune } from "@/hooks/use-tone";

type ScoreState = { userName: string; score: number };
interface QuizQbProps {
  quizData: QuizQbItem;
  quizzerFeedback: State<Feedback>;
  scoreState: State<ScoreState>;
 
}

export default function QuizQb({
  quizData,
  quizzerFeedback,
  scoreState,
 
}: QuizQbProps) {
  const questions = useHookstate(convertQb(quizData));
  const [currentStep, actions] = useStep(questions.length);
  const currentQuestion = questions[currentStep - 1];
  const { playCorrectTune, playIncorrectTune } = useTune();
  const selectedOption = useHookstate<string>("");

  const handleNext = () => {
    if (actions.canGoToNextStep) {
      console.log("canGoToNextStep", actions.canGoToNextStep)
      actions.goToNextStep();
      selectedOption.set("");
      quizzerFeedback.isCorrect.set(null);
      quizzerFeedback.message.set("اختر الإجابة الصحيحة ثم اضغط على تأكد");

    } else {
      console.log("canGoToNextStep", actions.canGoToNextStep)
      selectedOption.set("");
      quizzerFeedback.isCorrect.set(null);
      quizzerFeedback.message.set("");
      quizzerFeedback.isAnswered.set(true);
      
    }
  };
  const handleSelect = (value: string) => {
    selectedOption.set(value);
  };
  const handleConfirmAnswer = () => {
    if (selectedOption.get() === currentQuestion.id.get()) {
    
      setTimeout(() => {
        playCorrectTune();
        quizzerFeedback.isCorrect.set(true);
        quizzerFeedback.message.set("أحسنت");
        scoreState.score.set(scoreState.score.get() + 1);
  
      }, 1000);
      handleNext();
    } else {
    
      setTimeout(() => {
        playIncorrectTune();
        quizzerFeedback.isCorrect.set(false);
        quizzerFeedback.message.set(
          "خطاء، الإجابة الصحيحة هي " + currentQuestion.id.get()
        );
      }, 1000);
       handleNext();
    }
  };
  const renderQuizHeader = () => {
    return <CardTitle>اختر الإجابة الصحيحة ثم اضغط على تأكد</CardTitle>;
  };

  const renderQuestion = () => {
    return (
      <Card className="flex flex-wrap flex-row gap-3 items-center justify-center ">
        <CardTitle className="flex flex-wrap flex-row gap-3">
          {currentQuestion.text.get()}
          <TonePlayerButton url={currentQuestion.audioFile.get()} />
        </CardTitle>
      </Card>
    );
  };

  const renderOptions = () => {
     
    return (
      <div className="urdu-text">
        <RadioGroup
          className="flex flex-col gap-2"
          onValueChange={(value) => handleSelect(value)}
          defaultValue={selectedOption.get()}
        >
          <Card className="flex flex-col gap-2 text-right" dir="rtl">
            {currentQuestion.options.map((option) => (
              <CardAction
                key={option.id.get()}
                className="flex flex-row gap-3 w-full items-center hover:bg-gray-100 cursor-pointer transition-all hover:scale-101 text-xl h-16 p-5"
                onClick={() => handleSelect(option.id.get())}
              >
                <RadioGroupItem
                  checked={option.id.get() === selectedOption.get()}
                  value={option.id.get()}
                />
                <Label htmlFor={option.id.get()}>{option.text.get()}</Label>
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
 
  return (
    <div className="flex flex-col gap-3 text-right" dir="rtl">
      {renderQuizHeader()}
      {renderQuestion()}
      {renderOptions()}
    </div>
  );
}
