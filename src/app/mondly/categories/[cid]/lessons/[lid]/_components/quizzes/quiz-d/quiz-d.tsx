"use client";
import * as React from "react";
import {Quiz} from "@/app/mondly/_types/data-services";
import Image from "next/image";
// import "./quiz-d.css"
import { Button } from "@/components/ui/button";
import { Volume2, RotateCcw, CheckCircle } from "lucide-react";
import {
 getLocalAudioUrl,
 getLocalImageUrl,
 shuffleArray,
} from "../../quizzes-utils";
import { AudioPlayer } from "../audio-player";
 
import { useQuizzerStore } from "../../quizzer-store";

import JsonView from "@uiw/react-json-view";

export function QuizD({ quiz }: { quiz: Quiz }) {
  const storeState = useQuizzerStore();
  const [dragging, setDragging] = React.useState<string | null>(null);
  // sols
 
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
  }, []);
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", event.currentTarget.id);

    setDragging(event.currentTarget.id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(null);
    // suspense
    setTimeout(() => {
    }, 1000);
  };
  const handleNext = () => {
    
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedId = event.currentTarget.id;
    const draggedId = event.dataTransfer.getData("text/plain");
   

      setDragging(null);
      handleNext();
    
  };

  const handleShuffle = () => {
  };
  const renderCards = () => {
  }

  return (
    <div>
      <h1>Quiz D</h1>
      <JsonView value={quiz} />
    </div>
  );
}
