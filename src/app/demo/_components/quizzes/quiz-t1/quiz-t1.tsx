"use client";
import { JsonViewerComponent } from "@/components/json-viewer";
import { QuizT1Item, Question, convertToQuestion } from "./definitions";
import * as React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { AudioPlayer } from "../../audio-player";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useTune } from "../use-tune";

interface QuizT1Props {
  quizItem: QuizT1Item;
  handleNextQuiz: () => void;
}
export const QuizT1: React.FC<QuizT1Props> = ({ quizItem, handleNextQuiz }) => {
  const [question, setQuestion] = React.useState<Question | null>(null);
  const [selectedWords, setSelectedWords] = React.useState<string[]>([]);
  const [availableWords, setAvailableWords] = React.useState<string[]>([]);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { playCorrectTune, playIncorrectTune } = useTune();

  // effect to load the question
  React.useEffect(() => {
    const q = convertToQuestion(quizItem);
    setQuestion((q) => q);

    setAvailableWords((options) => q.options);

    return () => {
      resetQuiz();
    };
  }, [quizItem]);
  // Handle word selection and arrangement.
  const handleWordClick = (word: string) => {
    // If the user has already answered, do nothing.
    if (isCorrect !== null) return;
    setSelectedWords([...selectedWords, word]);
    // Remove the selected word from the available options.
    setAvailableWords(availableWords.filter((w) => w !== word));
  };
  // Handle word removal from the selected words box.
  const handleRemoveWord = (word: string) => {
    // If the user has already answered, do nothing.
    if (isCorrect !== null) return;
    setSelectedWords(selectedWords.filter((w) => w !== word));
    setAvailableWords([...availableWords, word]);
  };
  // Check the user's answer.
  const checkAnswer = () => {
    const userPhrase = selectedWords.join(" ");
    // Remove periods and spaces for a clean comparison.
    const cleanUserPhrase = userPhrase.replace(/\./g, "").trim();
    const cleanCorrectAnswer = question?.correctAnswer
      .replace(/\./g, "")
      .trim();

    if (cleanUserPhrase === cleanCorrectAnswer) {
      setIsCorrect(true);
      playCorrectTune();
    } else {
      setIsCorrect(false);
      playIncorrectTune();
      setTimeout(() => {
        resetQuiz();
      }, 2000);
    }
  };

  // Play the audio for the current quiz.
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.error("Audio playback failed:", error));
    }
  };
  const resetQuiz = () => {
    setSelectedWords([]);
    setAvailableWords(question?.options || []);
    setIsCorrect(null);
  };
  const resultMessage =
    isCorrect === true ? "Correct!" : "Incorrect. Try again!";
  const resultColor = isCorrect === true ? "text-green-500" : "text-red-500";

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      className="w-full h-screen flex flex-col p-4 overflow-y-auto"
      dir="rtl"
    >
      <CardTitle className="text-xl font-bold mb-4 text-gray-400">
        رتب الجملة
      </CardTitle>
      <CardContent>
        {/* Urdu phrase and audio player */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-4xl text-blue-300">{question.text}</h1>
          <button
            onClick={playAudio}
            className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
            aria-label="Play audio"
          >
            <Play className="h-6 w-6 text-white" />
          </button>
          <audio
            ref={audioRef}
            src={`${question.audioFile}`}
            autoPlay
            playsInline
          />
        </div>
        {/* Selected words box */}
        <Card className="flex items-center justify-center min-h-[64px] w-full border-2 border-dashed border-gray-600 rounded-xl p-4 mb-6  transition-all duration-300">
          <button onClick={() => resetQuiz()}>مسح الكلمات</button>
          <CardContent>
            {selectedWords.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedWords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleRemoveWord(word)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                  >
                    {word}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-gray-500 text-lg">
                اختر الكلمات بالترتيب الصحيح
              </span>
            )}
          </CardContent>
          {/* Available words */}
          <CardContent className="flex flex-wrap justify-center gap-4 mb-8">
            {availableWords.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordClick(word)}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
              >
                {word}
              </button>
            ))}
          </CardContent>
        </Card>
      </CardContent>
      <Card>
        <CardContent className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={checkAnswer}
            disabled={selectedWords.length === 0 || isCorrect !== null}
            className={`px-8 py-3 rounded-full text-white font-bold transition-all duration-300 ${
              selectedWords.length === 0 || isCorrect !== null
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 shadow-lg"
            }`}
          >
            تحقق من الإجابة
          </button>

          <button
            onClick={handleNextQuiz}
            disabled={isCorrect === false || isCorrect === null}
            className={`px-8 py-3 rounded-full text-white font-bold transition-all duration-300 ${
              isCorrect === false || isCorrect === null
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 shadow-lg"
            }`}
          >
            التالي
          </button>
        </CardContent>
      </Card>
      <CardFooter>
        {isCorrect !== null && (
          <div
            className={`mt-6 text-2xl font-bold animate-bounce ${resultColor}`}
          >
            {resultMessage}
          </div>
        )}
      </CardFooter>
      <div className="mt-8" dir="ltr">
        <h2 className="text-xl font-bold mb-4">
          audio played using normal playAudio function and HTML button element
          with onClick function{" "}
        </h2>
        <h2 className="text-xl font-bold mb-4">Raw Quiz Data</h2>
        <JsonViewerComponent data={question} />
      </div>
    </Card>
  );
};
