"use cliet";
import { JsonViewerComponent } from "@/components/json-viewer";
import { QuizT2Item, Question, convertToQuestion } from "./definitions";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useTune } from "../use-tune";
import * as React from "react";
interface QuizT2Props {
  quizItem: QuizT2Item;
  handleNextQuiz: () => void;
}

export function QuizT2({ quizItem, handleNextQuiz }: QuizT2Props) {
  const [question, setQuestion] = React.useState<Question>(
    convertToQuestion(quizItem)
  );
  const [selectedWords, setSelectedWords] = React.useState<string[]>([]);
  const [availableWords, setAvailableWords] = React.useState<string[]>([]);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { playCorrectTune, playIncorrectTune } = useTune();
  const options = question?.options;
  // effect to load the question
  React.useEffect(() => {
    setAvailableWords(question.options);
  }, [quizItem]);

  const handleWordClick = (word: string) => {
    setSelectedWords([...selectedWords, word]);

    setAvailableWords(availableWords.filter((w) => w !== word));
  };

  const handleRemoveWord = (word: string) => {
    setSelectedWords((prev) => prev.filter((w) => w !== word));
    setAvailableWords((prev) => [...prev, word]);
  };

  const checkAnswer = () => {
    console.log("checkAnswer....");
    const userPhrase = selectedWords.join(" ");
    // Remove periods such as (۔"۔") and spaces for a clean comparison.
    const cleanUserPhrase = userPhrase.replace(/\./g, "").trim();
    const cleanCorrectAnswer = question?.correctAnswer
      .replace(/\./g, "")
      .trim();
    console.log("cleanUserPhrase", cleanUserPhrase);
    console.log("cleanCorrectAnswer", cleanCorrectAnswer);
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
    if (isCorrect) {
      handleNextQuiz();
    }
  };
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

  const resultColor = isCorrect === true ? "text-green-500" : "text-red-500";
  console.log("outside: selectedWords", selectedWords.length);
  console.log("outside: availableWords", availableWords.length);

  if (!question) {
    return <div>Loading...</div>;
  }
  return (
    <Card
      className="w-full h-screen flex flex-col p-4 overflow-y-auto"
      dir="rtl"
    >
      <CardTitle className="text-xl font-bold mb-4 text-gray-400">
        ترتيب الجملة
      </CardTitle>
      <CardContent>
        {/* Arabic text and audio player */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-4xl text-blue-300">{question.text}</h1>
          <button
            onClick={playAudio}
            className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
          >
            <Play className="w-6 h-6" />
          </button>
          <audio
            ref={audioRef}
            src={`${question.audioUrl}`}
            autoPlay
            playsInline
          />
        </div>
        {/* Selected words box */}
        <Card className="flex items-center justify-center min-h-[64px] w-full border-2 border-dashed border-gray-600 rounded-xl p-4 mb-6  transition-all duration-300">
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
        </Card>
        {/* Available words */}
        <Card>
          <CardContent className="flex flex-wrap justify-center gap-4 mb-8">
            {availableWords.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordClick(word)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
              >
                {word}
              </button>
            ))}
          </CardContent>
        </Card>
        <CardFooter>
          <button
            disabled={isCorrect === false || isCorrect === null}
            onClick={handleNextQuiz}
            className={`px-8 py-3 rounded-full text-white font-bold transition-all duration-300 ${
              isCorrect === false || isCorrect === null
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 shadow-lg"
            }`}
          >
            التالي
          </button>
          {selectedWords.length === question?.options.length && (
            <button
              onClick={checkAnswer}
              className="px-8 py-3 rounded-full text-white font-bold transition-all duration-300 bg-blue-500 hover:bg-blue-600 shadow-lg"
            >
              تحقق
            </button>
          )}
        </CardFooter>
        <div className="mt-8" dir="ltr">
          <h2 className="text-xl font-bold mb-4">
            audio played using normal playAudio function and HTML button element
            with onClick function + an hidden HTML audio element with 'autoPlay
            playsInline' attributes for auto play functionality
          </h2>
          <h2 className="text-xl font-bold mb-4">Raw Quiz Data</h2>
          <JsonViewerComponent data={question} />
        </div>
      </CardContent>
    </Card>
  );
}
