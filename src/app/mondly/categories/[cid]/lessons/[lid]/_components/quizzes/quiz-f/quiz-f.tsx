"use client";

import Image from "next/image";
import { JsonViewerComponent } from "@/components/json-viewer";
import { QuizFItem, Question, convertToQuestions } from "./definitions";
import * as React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useTune } from "../use-tune";
import { Button } from "@/components/ui/button";

interface QuizFProps {
  quizItem: QuizFItem;
  handleNextQuiz: () => void;
}

export const QuizF: React.FC<QuizFProps> = ({ quizItem, handleNextQuiz }) => {
  const [questions, setQuestions] = React.useState<Question[]>(
    convertToQuestions(quizItem)
  );

  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(
    null
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { playCorrectTune, playIncorrectTune } = useTune();

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.error("Audio playback failed:", error));
    }
  };
  // check if both questions answered
  if (questions[0].isAnswered && questions[1].isAnswered) {
    handleNextQuiz();
  }
  const checkAnswer = () => {
    if (questions[currentQuestionIndex].correctAnswer === selectedAnswer) {
      playCorrectTune();
      questions[currentQuestionIndex].isAnswered = true;
    } else {
      playIncorrectTune();
      setTimeout(() => {
        resetQuiz();
      }, 2000);
    }
  };

  const resetQuiz = () => {
    setQuestions(convertToQuestions(quizItem));
    setSelectedAnswer(null);
    setCurrentQuestionIndex(0);
  };
  const resultMessage =
    selectedAnswer === questions[currentQuestionIndex].correctAnswer
      ? "Correct! ✅"
      : `Incorrect. The correct answer is: ${questions[currentQuestionIndex].correctAnswer} ❌`;
  const resultColor =
    selectedAnswer === questions[currentQuestionIndex].correctAnswer
      ? "text-green-500"
      : "text-red-500";

  if (!questions[currentQuestionIndex]) {
    return <div>Loading...</div>;
  }
  console.log(
    "questions[currentQuestionIndex],",
    questions[currentQuestionIndex]
  );
  return (
    <Card className="w-full     flex flex-col p-4 ">
      <CardTitle className="text-xl font-bold mb-4 text-gray-400">
        إختر الصورة المناسبة
      </CardTitle>

      <CardContent className="flex flex-col items-center gap-10">
        {questions[currentQuestionIndex].options.map((option, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center gap-4">
              <Button
                onClick={() => setSelectedAnswer(option.text)}
                className={`px-8 py-3 rounded-full text-white self-end font-bold transition-all duration-300 ${
                  selectedAnswer === option.text
                    ? "bg-green-500 hover:bg-green-600 shadow-lg"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                {option.text}
              </Button>
              <Image
                src={option.image}
                alt={option.text}
                width={200}
                height={200}
                className="self-center"
              />
            </CardContent>
          </Card>
        ))}
        <div className="fixed  top-[45%] ">
          <Button onClick={playAudio} className="mb-4">
            <Play className="mr-2 h-4 w-4" /> Listen
          </Button>
          <audio
            ref={audioRef}
            src={`${questions[currentQuestionIndex].audioFile}`}
            playsInline
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={checkAnswer}
          disabled={selectedAnswer === null}
          className="px-8 py-3 rounded-full text-white font-bold transition-all duration-300 bg-green-500 hover:bg-green-600 shadow-lg"
        >
          تحقق من الإجابة
        </Button>
      </CardFooter>
      <CardFooter>
        <JsonViewerComponent data={questions[currentQuestionIndex]} />
      </CardFooter>
    </Card>
  );
};
