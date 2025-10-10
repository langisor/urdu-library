"use client";

import { useQ } from "./use-q";
import { QuizQItem, type Feedback } from "../../definitions";
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
 


type ScoreState = { userName: string; score: number };
interface QuizQProps {
  quizData: QuizQItem;
  quizzerFeedback: State<Feedback>;
  scoreState: State<ScoreState>;
}

export default function QuizQ({ quizData, quizzerFeedback, scoreState }: QuizQProps) {
  const { actions, interactiveState } = useQ(quizData);

  const renderPlayerButton = (url: string) => {
    return <TonePlayerButton url={url} />;
  };
 
  return (
    <Card className="flex flex-col gap-2 text-right" dir="rtl">
      <CardHeader className="flex flex-row gap-2 items-center">
        <CardTitle className="urdu-text">
          {interactiveState.currentQuestion.text.get()}
        </CardTitle>
        <CardDescription>
          {renderPlayerButton(interactiveState.currentQuestion.audioFile.get())}
        </CardDescription>
      </CardHeader>
      <CardContent className="naskh-text">
        <RadioGroup
          className="flex flex-col gap-2 text-right"
          dir="rtl"
          onValueChange={(value) => actions.selectOption(value)}
          value={interactiveState.selectedOption.get()}
        >
          <Card>
            {interactiveState.currentQuestion.options.map((option) => (
              <CardAction
                key={option.id.get()}
                className="flex flex-row gap-3 w-full hover:bg-gray-100 cursor-pointer transition-all hover:scale-101 text-xl h-16 p-5"
                onClick={() => actions.selectOption(option.id.get())}
              >
                <RadioGroupItem value={option.id.get()} />
                <Label htmlFor={option.id.get()}>{option.text.get()}</Label>
              </CardAction>
            ))}
          </Card>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <Button onClick={() => actions.handleNext(quizzerFeedback)} disabled={!actions.isSelected}>
          تأكد
        </Button>
  
      </CardFooter>
    </Card>
  );
}
