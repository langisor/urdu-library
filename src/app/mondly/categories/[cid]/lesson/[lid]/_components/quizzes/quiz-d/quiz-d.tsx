"use client";
import type { IQuiz } from "@/types/lesson";
import * as React from "react";

import Image from "next/image";
// import "./quiz-d.css"
import { Button } from "@/components/ui/button";
import { Volume2, RotateCcw, CheckCircle } from "lucide-react";
import {
  getAudioUrl,
  shuffleArray,
  getImageUrl,
  getLocalImageUrl,
} from "../../quizzes-utils";
import { AudioPlayer } from "../audio-player";
import { useSound } from "use-sound";
import { useQuizzerStore } from "../../quizzer-store";

import JsonView from "@uiw/react-json-view";

export function QuizD({ quiz }: { quiz: IQuiz }) {
  const storeState = useQuizzerStore();
  const [playError] = useSound("/sounds/error.mp3", { volume: 0.5 });
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });
  const [dragging, setDragging] = React.useState<string | null>(null);
  // sols
  const [words, setWords] = React.useState<
    {
      id: string;
      text: string;
      audioUrl: string;
      imageUrl: string;
      passed?: boolean;
    }[]
  >(
    quiz.alts!.map((alt) => ({
      id: alt.key,
      text: alt.text,
      audioUrl: getAudioUrl(alt.key, alt.audio_updated_at!),
      imageUrl: getImageUrl(alt.image!),
      passed: false,
    }))
  );
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    if (filterNotPassed().length === 0) {
      setIsComplete(true);
      // find the first word that has not been passed
      const firstNotPassed = words.find((word) => !word.passed);
      if (firstNotPassed) {
        setCurrentWordIndex(words.indexOf(firstNotPassed));
      }
    }
    setWords(shuffleArray(words));
  }, [currentWordIndex]);
  const filterNotPassed = () => {
    return words.filter((word) => !word.passed);
  };
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("start dragging", event.currentTarget.id);
    event.dataTransfer.setData("text/plain", event.currentTarget.id);

    setDragging(event.currentTarget.id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("dragging over: ", event.currentTarget.id);
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(null);
    // suspense
    setTimeout(() => {
      console.log("suspense from handleDragEnd");
    }, 1000);
  };
  const handleNext = () => {
    if (currentWordIndex < words.length - 1) {
      storeState.earnedMarks.set(storeState.earnedMarks.get() + 1);
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedId = event.currentTarget.id;
    const draggedId = event.dataTransfer.getData("text/plain");
    if (droppedId === draggedId) {
      playSuccess();
      words[currentWordIndex].passed = true;

      setDragging(null);
      handleNext();
    } else {
      playError();
      return;
    }
  };

  const handleShuffle = () => {
    setWords(shuffleArray(words));
  };
  const cards = words.map((word) => {
    return (
      <div
        key={word.id}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex flex-col items-center gap-2"
        id={word.id}
      >
        <div className="relative h-[100px] w-[100px]">
          <Image
            placeholder="blur"
            blurDataURL="..."
            src={word.imageUrl}
            alt={word.text}
            fill
          />
        </div>
        <p>{word.text}</p>
      </div>
    );
  });

  return quiz && !isComplete ? (
    <div className="flex flex-col gap-5 --font-noto-naskh-arabic">
      <div className="grid grid-cols-2 gap-2">
        {cards[0]}
        {cards[1]}
      </div>
      <div
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        id={words[currentWordIndex].id}
        className="grid grid-cols-1 items-center justify-center noto-naskh-arabic cursor-grab"
      >
        <AudioPlayer
          url={words[currentWordIndex].audioUrl}
          withIconButton
          auto
          text={words[currentWordIndex].text}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {cards[2]}
        {cards[3]}
      </div>

      <JsonView value={quiz} />
    </div>
  ) : (
    <div>
      <h1>Quiz Completed</h1>
    </div>
  );
}
