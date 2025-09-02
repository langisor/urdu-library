"use client";
import { useQuizQb } from "./use-quiz-qb";
import { QuizQbItem } from "./definitions";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTune } from "../use-tune";
import { AudioPlayer } from "../../audio-player";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { JsonViewerComponent } from "@/components/json-viewer";

interface QuizQbProps {
  quizItem: QuizQbItem;
  handleNextQuiz: () => void;
}

export const QuizQb: React.FC<QuizQbProps> = ({ quizItem, handleNextQuiz }) => {
  // states
  const { quizState, nextQuestion, checkAnswer, resetQuiz } = useQuizQb({
    quizItem,
  });
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const { playCorrectTune, playIncorrectTune } = useTune();
  const handleNextQuestion = () => {
    nextQuestion();
  };

  const { questions, currentQuestionIndex, isComplete, feedback } = quizState;
  const currentQuestion = questions[currentQuestionIndex];

  const handleCheckAnswer = (answer: string) => {
    setSelectedOption(answer);
    checkAnswer(answer);
    // if correct option is selected, play correct tune
    if (feedback?.isCorrect) {
      playCorrectTune();
    } else {
      playIncorrectTune();
    }
    // if questions are not complete, handle next Question
    if (!isComplete) {
      setTimeout(() => {
        handleNextQuestion();
        setSelectedOption(null);
      }, 1500);
    }
    // if questions are complete, handle next Quiz
    if (isComplete) {
      setSelectedOption(null);
      resetQuiz();
      handleNextQuiz();
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
      <CardContent className="space-y-4 ">
        <RadioGroup
          onValueChange={(value) => handleCheckAnswer(value)}
          className="space-y-3 flex flex-col"
          dir="rtl"
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex gap-2 ">
              <RadioGroupItem
                checked={selectedOption === option}
                value={option}
                id={`option-${index}`}
                className="mt-0.5 h-6 w-6"
              />
              <Label
                htmlFor={`option-${index}`}
                className="text-xl cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleNextQuestion}
          disabled={isComplete || !selectedOption}
        >
          Next
        </Button>
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
