import { Button } from "@/components/ui/button";
// import { QuizC1bItem } from "../mondly/category/quizzer/_components/definitions";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useHookstate } from "@hookstate/core";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import InventoryManager from "./inventory-manager";
import data from "./c1b-samples.json";
import QuizC1b from "./quiz-c1b";
 

export default   function DemoPage() {
 
  return (
    <div className="flex flex-col gap-8 text-left" dir="ltr">
      <QuizC1b  quizData={data[0]} />
      <JsonViewerComponent data={data} />
    </div>
  );
}
