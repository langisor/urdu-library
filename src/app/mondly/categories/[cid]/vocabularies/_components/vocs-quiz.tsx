"use client";
import * as React from "react";
import { UrduIcon } from "@/assets/custom-icons/urdu-icon";
import { Play, Music } from "lucide-react";
import { getCourseAudio } from "@/app/mondly/_lib/helpers";
import { IVocabulary, Vocabulary, VocabularyItem } from "./types";
import { getFourRandomOptions, shuffleArray } from "./utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface TestWizardProps {
  vocs: VocabularyItem[];
}

export function VocsQuiz({ vocs }: TestWizardProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const currentItem = vocs[currentIndex];
  const options = getFourRandomOptions(currentItem.sols[1].text, vocs);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === currentItem.sols[1].text);
    setShowAnswer(true);
    // wait 1 seconds then go to next question
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const playAudio = (audioUrl: string) => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
    //
    audioRef.current = new Audio(getCourseAudio(audioUrl));
    audioRef.current.play();
    setIsPlaying(true);
    audioRef.current.onended = () => {
      audioRef.current?.pause();
      audioRef.current = null;
      setIsPlaying(false);
    };

    //
  };

  const nextQuestion = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocs.length);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowAnswer(false);
    // if next item present then wait 3 seconds before going to next question
    if (currentIndex + 1 < vocs.length) {
      setTimeout(() => {
        if (vocs[currentIndex + 1].sols[0].key) {
          playAudio(vocs[currentIndex + 1].sols[0].key);
        }
      }, 3000);
    } else {
      return;
    }
  };

  // auto play audio when component mounts
  React.useEffect(() => {
    setTimeout(() => {
      playAudio(currentItem.sols[0].key);
    }, 1000);
    // Cleanup audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  return (
    <div className="naskh-text flex flex-col gap-4 w-full">
      <Card className="w-full max-w-2xl mx-auto h-screen overflow-y-scroll">
        <CardContent className="p-4 max-w-7xl mx-auto">
          <h2 className="text-lg font-bold mb-4">اختبر معرفتك</h2>

          <div className="flex  mb-4">
            <Button
              variant="outline"
              onClick={() => playAudio(currentItem.sols[0].key)}
              className="text-lg text-gray-700 hover:bg-gray-100"
            >
              <Play className="w-4 h-4 mr-1" />
            </Button>
            <audio ref={audioRef} playsInline autoPlay className="hidden">
              <source src={currentItem.sols[0].key} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`text-lg ${
                  selectedOption === option
                    ? isCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
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

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {currentIndex + 1} من {vocs.length}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
