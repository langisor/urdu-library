"use client";
import * as Quizzes from "./quizzes";
import { JsonViewerComponent } from "@/components/json-viewer";
import { QuizItem } from "./quizzes/types";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
 SheetDescription,
 SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuizzerProps {
 quizzes: Array<QuizItem>
}

export function Quizzer({ quizzes }: QuizzerProps) {
 const [currentQuizIndex, setCurrentQuizIndex] = React.useState(0);
 const [open, setOpen] = React.useState(false);
 const handleNextQuiz = () => {
  setCurrentQuizIndex((prevIndex) => (prevIndex + 1) % quizzes.length);
 }
 const handlePrevQuiz = () => {
  setCurrentQuizIndex((prevIndex) => (prevIndex - 1 + quizzes.length) % quizzes.length);
 }
 const currentQuiz = quizzes[currentQuizIndex];
 const renderQuiz = (quizItem: QuizItem, index: number) => {
  switch (quizItem.type) {
   case "D":
    return <Quizzes.QuizD key={index} quizItem={quizItem} />;
   case "F":
    return <Quizzes.QuizF key={index} quizItem={quizItem} />;
   default:
    return (
     <Card key={index} className="border border-red-500">
      <CardContent>
       <p>Unsupported quiz type: {quizItem.type}</p>
       <JsonViewerComponent data={quizItem} />
      </CardContent>
     </Card>
    );
  }
 }
 return (
  <div className="flex flex-col gap-4">
   <Button onClick={() => setOpen(true)}>Open Quizzer</Button>
   <Sheet open={open} onOpenChange={setOpen}>
    <SheetContent side="bottom" className="w-full h-screen overflow-y-scroll">
     <SheetHeader>
      <SheetTitle>Quizzer</SheetTitle>
      <SheetDescription>
       Navigate through different quizzes using the buttons below.

      </SheetDescription>

      <Badge className="bg-blue-600 text-white">Quiz Type: {quizzes[currentQuizIndex].type}</Badge>
     </SheetHeader>
     {currentQuiz ? (
      <div>
       {renderQuiz(currentQuiz, currentQuizIndex)}
       <QuizNavigation
        currentIndex={currentQuizIndex}
        total={quizzes.length}
        onPrev={handlePrevQuiz}
        onNext={handleNextQuiz}
       />
      </div>
     ) : (
      <p>No quizzes available.</p>
     )}
    </SheetContent>
   </Sheet>
  </div>
 )
}


function QuizNavigation({ currentIndex, total, onPrev, onNext }: { currentIndex: number; total: number; onPrev: () => void; onNext: () => void }) {
 return (
  <div className="flex justify-between mt-4">
   <Button onClick={onPrev} disabled={currentIndex === 0}>
    Previous
   </Button>
   <span>
    Question {currentIndex + 1} of {total}
   </span>
   <Button onClick={onNext} disabled={currentIndex === total - 1}>
    Next
   </Button>
  </div>
 )
}