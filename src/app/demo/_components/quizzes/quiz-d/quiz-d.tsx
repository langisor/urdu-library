"use client";
import * as React from "react";
import { useQuizD } from "./use-quiz-d";
import { QuizDItem } from "./definitions";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useTune } from "../use-tune";
import { AudioPlayer } from "../../audio-player";
 
interface QuizDProps {
  quizItem: QuizDItem;
}

export const QuizD: React.FC<QuizDProps> = ({ quizItem }: QuizDProps) => {
  const { quizState, answerQuestion, nextQuestion, resetQuiz } =
    useQuizD(quizItem);
  const [feedback, setFeedback] = React.useState<{
    isCorrect: boolean;
    text: string;
  } | null>(null);

 
  // correct/incorrect feedback sounds
  const { playCorrectTune, playIncorrectTune } = useTune();
  // facilities
  const { questions, currentQuestionIndex, isComplete } = quizState;


  const handleAnswer = (answer: string) => {
    const isCorrect = answer === currentQuestion.correctAnswer;

    const feedbackText = isCorrect
      ? "Correct! ✅"
      : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer} ❌`;

    if (isCorrect) {
      
      playCorrectTune();
    } else {
      playIncorrectTune();
    }

    setFeedback({ isCorrect, text: feedbackText });

    setTimeout(() => {
      answerQuestion(answer);
      if (isComplete) {
        return;
      }
      nextQuestion();
      setFeedback(null);
    }, 1500);
  };

  const renderCards = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const options = currentQuestion.options;

    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Option 1 */}
          <Card
            key={0}
            onClick={() => handleAnswer(options[0].text)}
            className={`cursor-pointer transition-colors duration-200 ${feedback
              ? options[0].text === currentQuestion.correctAnswer
                ? "border-green-500"
                : "border-red-500"
              : ""
              }`}
          >
            <CardContent className="flex flex-col items-center p-4">
              <div className="relative w-24 h-24 mb-2">
                <Image
                  src={options[0].image}
                  alt={options[0].text}
                  fill
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <span className="text-sm font-medium">{options[0].text}</span>
            </CardContent>
          </Card>
          {/* Option 2 */}
          <Card
            key={1}
            onClick={() => handleAnswer(options[1].text)}
            className={`cursor-pointer transition-colors duration-200 ${feedback
              ? options[1].text === currentQuestion.correctAnswer
                ? "border-green-500"
                : "border-red-500"
              : ""
              }`}
          >
            <CardContent className="flex flex-col items-center p-4">
              <div className="relative w-24 h-24 mb-2">
                <Image
                  src={options[1].image}
                  alt={options[1].text}
                  fill
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <span className="text-sm font-medium">{options[1].text}</span>
            </CardContent>
          </Card>
        </div>
        {/* Question  card*/}
        <Card
          key={currentQuestion.id}
          className="cursor-pointer transition-colors duration-200"
        >
          <CardContent className="flex flex-col items-center p-4">
            <div className="relative w-24 h-24 mb-2">
              <AudioPlayer
                audioUrl={currentQuestion.audioFile}
                text={""}
                autoPlay={true}
              />
            </div>
            <span className="text-2xl font-medium">{currentQuestion.text}</span>
          </CardContent>
        </Card>
        {/* option 3 */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            key={2}
            onClick={() => handleAnswer(options[2].text)}
            className={`cursor-pointer transition-colors duration-200 ${feedback
              ? options[2].text === currentQuestion.correctAnswer
                ? "border-green-500"
                : "border-red-500"
              : ""
              }`}
          >
            <CardContent className="flex flex-col items-center p-4">
              <div className="relative w-24 h-24 mb-2">
                <Image
                  src={options[2].image}
                  alt={options[2].text}
                  fill
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <span className="text-sm font-medium">{options[2].text}</span>
            </CardContent>
          </Card>
          {/* option 4 */}
          <Card
            key={3}
            onClick={() => handleAnswer(options[3].text)}
            className={`cursor-pointer transition-colors duration-200 ${feedback
              ? options[3].text === currentQuestion.correctAnswer
                ? "border-green-500"
                : "border-red-500"
              : ""
              }`}
          >
            <CardContent className="flex flex-col items-center p-4">
              <div className="relative w-24 h-24 mb-2">
                <Image
                  src={options[3].image}
                  alt={options[3].text}
                  fill
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <span className="text-sm font-medium">{options[3].text}</span>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  const currentQuestion = questions[currentQuestionIndex];

  if (isComplete || !currentQuestion) {
    return;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-gray-500">Score: {0}</span>
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-center"></h3>
        {renderCards()}
        {feedback && (
          <div
            className={`p-3 rounded-lg text-center font-bold mb-4 ${feedback.isCorrect
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
              }`}
          >
            {feedback.text}
          </div>
        )}
      </div>
    </div>
  );
};
// ensure the user interacts with the page before attempting to play media
