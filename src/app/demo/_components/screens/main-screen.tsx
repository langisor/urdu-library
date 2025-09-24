"use client";

import { Button } from "@/components/ui/button";
import { JsonViewerComponent } from "@/components/json-viewer";
import { useMainScreen } from "./use-main-screen";
import * as Quizzes from "../quizzes";
import { convertQ } from "@/app/demo/_hooks/converters";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as React from "react";
import ResultScreen from "./result-screen";
import { mainScreenStore } from "./store";
import { useHookstate } from "@hookstate/core";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface MainScreenProps {
  quizzes: any[];
  lessonId: number;
  lessonName: string;
}

export default function MainScreen({ quizzes,lessonId,lessonName }: MainScreenProps) {
  const { state, actions } = useMainScreen(quizzes.length);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const mainScreenState = useHookstate(mainScreenStore);
  const currentQuiz = quizzes[state.currentQuizIndex.get()];
  const totalQuizzes = quizzes.length;
  const renderNavigationBar = () => {
    return (
      <div className="flex justify-around mx-2 my-4">
        <Button onClick={actions.prevQuiz}>Previous</Button>
        <Button onClick={actions.reset}>Reset</Button>
        <Button onClick={actions.nextQuiz}>Next</Button>
        <Card>
          <CardContent>
            <p>Score: {mainScreenState.score.get()}</p>
            <p>Total Quizzes: {totalQuizzes}  </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  // when sheet closed, reset
  if (!isSheetOpen) {
    actions.reset();
  }
  // if all quizzes are completed
  const quizCompleted = state.isComplete.get();

  const renderCurrentQuiz = () => {
    switch (currentQuiz.type) {
      case "T1":
        return (
          <div className="flex flex-col">
            <Quizzes.QuizT1 quiz={currentQuiz} />
            {/* <div className="relative h-[400px] w-[500px] mx-auto">
              <Image src="/screenshots/T1.png" alt="T1" fill />
            </div> */}
          </div>
        );
      case "T1b":
        return (
          <div className="flex flex-col gap-2">
            <Quizzes.QuizT1b quiz={currentQuiz} />
            {/* <div className="relative h-[400px] w-[500px] mx-auto">
              <Image src="/screenshots/T1b.png" alt="T1b" fill />
            </div> */}
          </div>
        );
      case "D":
        return (
          <div className="flex flex-col">
            <Quizzes.QuizD quiz={currentQuiz} />
            {/* <div className="relative h-[400px] w-[500px] mx-auto">
              <Image src="/screenshots/D.png" alt="D" fill />
            </div> */}
          </div>
        );
      case "R":
        return (
          <div className="flex flex-col gap-2">
            <Quizzes.QuizR quiz={currentQuiz} />
          </div>
        );
      case "C1b":
        return (
          <div className="flex flex-col gap-2">
            <Quizzes.QuizC1b quiz={currentQuiz} />
            {/* <div className="relative h-[400px] w-[500px] mx-auto">
  <Image src="/screenshots/C1b.png" alt="C1b" fill />  
            </div> */}
          </div>
        );
      case "F":
        return (
          <div className="flex flex-col gap-2">
            <Quizzes.QuizF quiz={currentQuiz} />
            {/* <div className="relative h-[400px] w-[500px] mx-auto">
              <Image src="/screenshots/F.png" alt="F" fill />
            </div> */}
          </div>
        );
      case "Q":
        return (
          <div className="flex flex-col gap-2">
            <Quizzes.QuizQ quiz={currentQuiz} />
          </div>
        );
      case "Qb":
        return (
          <div className="flex flex-col gap-2">
            <Quizzes.QuizQb quiz={currentQuiz} />
          </div>
        );

      default:
        return <div>Quiz type not found</div>;
    }
  };
  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger>Start Quiz</SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-screen overflow-y-scroll px-10"
        >
          <SheetDescription className="sr-only">Quiz</SheetDescription>
          {!quizCompleted ? (
            <div className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="flex justify-around mx-10">
                  <span>
                    QuizID: {currentQuiz.id} - Quiz Type: {currentQuiz.type}
                  </span>
                  <span className="text-xs">
                    {state.currentQuizIndex.get() + 1} of{" "}
                    {totalQuizzes}
                  </span>
                </SheetTitle>
              </SheetHeader>
              {renderNavigationBar()}
              <div className="flex flex-col h-screen overflow-y-scroll">
                <div> {quizCompleted ? null : renderCurrentQuiz()}</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-screen overflow-y-scroll">
              <SheetTitle className="sr-only">Result</SheetTitle>
              <SheetDescription className="sr-only">Result</SheetDescription>
              {quizCompleted ? <ResultScreen /> : null}
              <Button onClick={actions.reset}>Reset</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
