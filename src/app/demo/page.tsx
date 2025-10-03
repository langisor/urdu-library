 
import { Button } from "@/components/ui/button";
// import { QuizC1bItem } from "../mondly/category/quizzer/_components/definitions";
import quizData from "./c1b1.json";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useHookstate } from "@hookstate/core";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import InventoryManager from "./inventory-manager";
import QuizC1b from "./quiz-c1b";
const quiz=quizData;
 

export default function DemoPage() {
  // console.log("quiz: ", quiz);
  return (
    <div className="flex flex-col gap-4 text-left" dir="ltr">
       <QuizC1b quizData={quiz}/>
    </div>
  );
}
