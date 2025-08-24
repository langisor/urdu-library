"use client";
import { useQuizQB } from "./use-quiz-qb";
import { QuizQBItem } from "./definitions";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { useTune } from "../use-tune";
import { AudioPlayer } from "../../audio-player";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import { JsonViewerComponent } from "@/components/json-viewer";
interface QuizQBProps {
  quizItem: QuizQBItem;
  handleNextQuiz: () => void;
}

export const QuizQb: React.FC<QuizQBProps> = ({ quizItem, handleNextQuiz }) => {
  // states
  const { quizState, nextQuestion, checkAnswer, resetQuiz } =
    useQuizQB(quizItem);

  const { playCorrectTune, playIncorrectTune } = useTune();
  const handleNextQuestion = () => {
    nextQuestion();
  };

  const { questions, currentQuestionIndex, isComplete, feedback } = quizState;
  const currentQuestion = questions[currentQuestionIndex];

  const handleCheckAnswer = (answer: string) => {
    checkAnswer(answer);
    // if correct option is selected, play correct tune
    if (feedback?.isCorrect) {
      playCorrectTune();
    } else {
      playIncorrectTune();
    }

    if (isComplete) {
      setTimeout(() => {
        handleNextQuiz();
      }, 1500);
    }
  };

  return (
    <Card className="flex flex-col gap-4 text-right" dir="rtl">
      <CardHeader>
        <CardTitle className="flex gap-4">
          <h2 className="text-xl font-bold font-nastaliq">
            {currentQuestion.text}
          </h2>
          <AudioPlayer
            audioUrl={currentQuestion.audioFile}
            text={""}
            autoPlay={true}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2" >
          {currentQuestion.options.map((option, index) => (
         <RadioGroup   onValueChange={(value) => handleCheckAnswer(value)} className="text-right">
          <div className="flex items-center gap-2" dir="rtl">
            <RadioGroupItem value={option}   id={`option-${index}`} className="w-6 h-6" checked={option === feedback?.text}/>
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
         </RadioGroup>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNextQuestion}>Next</Button>
      </CardFooter>
      <Card className="flex flex-col gap-4 text-left" dir="ltr">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Quiz</h2>
          <JsonViewerComponent data={questions} />
        </CardContent>
      </Card>
    </Card>
  );
};
