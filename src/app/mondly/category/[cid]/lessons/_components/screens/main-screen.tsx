"use client";

import { Button } from "@/components/ui/button";
import { JsonViewerComponent } from "@/components/json-viewer";
import { useMainScreen } from "./use-main-screen";
import * as Quizzes from "../quizzes";
import { convertQ } from "../../_hooks/converters";
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
 

interface MainScreenProps {
  lesson: any;
  quizzes: any[];
}

export default function MainScreen({ lesson, quizzes }: MainScreenProps) {
  const { state, actions } = useMainScreen()
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
 const [isQuizzesMounted, setIsQuizzesMounted] = React.useState(false);
  React.useEffect(() => {
    // check if mounted
    if (quizzes.length > 0) {
      actions.setTotalQuizzes(quizzes.length);
      setIsQuizzesMounted(true);
    }
  }, [quizzes]);
  const currentQuiz = isQuizzesMounted ? quizzes[state.currentQuizIndex.get()] : null;

//  console.log("currentQuiz: ",currentQuiz)
  const renderNavigationBar = () => {
     if (!currentQuiz) return null;
     return (
      <div className="flex justify-around mx-2 my-4">
        <Button onClick={() => actions.prevQuiz()}>Previous Button</Button>
        <Button onClick={() => actions.reset()}>Reset</Button>

        <Button onClick={() => actions.nextQuiz()}>Next</Button>
      </div>
    );
  };
 

  // if all quizzes are completed
  if (state.isComplete.get()) {
    setIsSheetOpen(false);
    actions.reset();
  }

  const renderCurrentQuiz = () => {
    if (!currentQuiz) return null;
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
            {/* <Quizzes.QuizC1b quiz={currentQuiz} /> */}
            <div className="relative h-[400px] w-[500px] mx-auto">
              <Image src="/screenshots/C1b.png" alt="C1b" fill />
            </div>
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
   
      <Sheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <SheetTrigger className="w-full" asChild>
          <Button>بدء التدريب</Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-screen overflow-y-scroll px-10"
        >
          <SheetDescription className="sr-only">Quiz</SheetDescription>
          {!state.isComplete.get() ? (
            <div className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="flex justify-around mx-10">
                  <span>
                    {/* QuizID: {currentQuiz.id || ""} - Quiz Type: {currentQuiz.type || ""} */}
                  </span>
                  <span className="text-lg">
                    {state.currentQuizIndex.get() + 1} of{" "}
                    {state.totalQuizzes.get()}
                  </span>
                </SheetTitle>
              </SheetHeader>
              {renderNavigationBar()}
              <div className="flex flex-col h-screen overflow-y-scroll">
                <div> {state.isComplete.get() ? null : renderCurrentQuiz()}</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-screen overflow-y-scroll">
              <SheetTitle className="sr-only">Result</SheetTitle>
              <SheetDescription className="sr-only">Result</SheetDescription>
              {state.isComplete.get() ? <ResultScreen /> : null}
              <Button onClick={actions.reset}>Reset</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
 
  );
}
