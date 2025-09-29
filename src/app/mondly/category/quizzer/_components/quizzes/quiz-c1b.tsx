"use client";
import { QuizC1bItem } from "../definitions";
import { convertC1b } from "../converters";
import { useHookstate,State } from "@hookstate/core";
 
import { useTune } from "@/hooks/use-tone";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "../loading-spinner";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { JsonViewerComponent } from "@/components/json-viewer";
import { shuffleArray ,  Feedback } from "../helpers-types";
import * as React from "react";

interface QuizC1bProps{
  quiz: QuizC1bItem,
  quizzerFeedback: State<Feedback>
  onNextQuiz:()=>void;
}
export default function QuizC1b({
  quiz,
  quizzerFeedback,
  onNextQuiz
}:QuizC1bProps) {
  const state = useHookstate({
    question: convertC1b(quiz),
    
  });

  const { playCorrectTune, playIncorrectTune } = useTune();
 
  const checkAnswer=()=>{
    

  }
  const renderSpinner = () => {
    if (quizzerFeedback.isAnswered.get() === true) {
      return <LoadingSpinner onNext={onNextQuiz} />;
    }
  };

  return (
    <Card>
       <JsonViewerComponent data={quiz} />
      <CardContent>
        
        <CardFooter className="flex flex-row gap-3 mt-5">
          <Button onClick={checkAnswer}>Check Answer</Button>
          {renderSpinner()}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
