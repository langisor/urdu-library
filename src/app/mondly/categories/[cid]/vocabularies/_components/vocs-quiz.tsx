"use client";
import * as React from "react";
import { UrduIcon } from "@/assets/custom-icons/urdu-icon";
import { Play, Music } from "lucide-react";
import { getCourseAudio } from "@/app/mondly/_lib/helpers";
import { IVocabulary } from "./types";
import { getFourRandomOptions, shuffleArray } from "./utils";
import { Button } from "@/components/ui/button";
import { CustomButton } from "./custom-button";
interface TestWizardProps {
  vocs: IVocabulary[];
}

export function VocsQuiz({ vocs }: TestWizardProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const currentItem = vocs[currentIndex];
  const options = getFourRandomOptions(currentItem.sols[1].text, vocs);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === currentItem.sols[1].text);
    setShowAnswer(true);
  };

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    audioRef.current = new Audio(getCourseAudio(audioUrl));
    audioRef.current.play();
  };

  const nextQuestion = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocs.length);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowAnswer(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold mb-4">اختبر معرفتك</h2>
      <div className="w-full max-w-md p-4 border rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{currentItem.key}</h3>
          <Button
            variant="outline"
            onClick={() => playAudio(currentItem.sols[0].key)}
          >
            <Music className="mr-2" />
            استمع
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {options.map((option, index) => (
            <CustomButton
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={showAnswer}
              variant={
                selectedOption === option
                  ? isCorrect
                    ? "default"
                    : "outline"
                  : "outline"
              }
              className={`${
                selectedOption === option
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : ""
              }`}
            >
              {option}
            </CustomButton>
          ))}
        </div>
        {showAnswer && (
          <div className="mt-4">
            <p
              className={`text-lg ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect
                ? "إجابة صحيحة!"
                : `الإجابة الصحيحة: ${currentItem.sols[1].text}`}
            </p>
            <Button variant="outline" onClick={nextQuestion} className="mt-2">
              التالي
            </Button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          {currentIndex + 1} من {vocs.length}
        </p>
      </div>
    </div>
  );
}
