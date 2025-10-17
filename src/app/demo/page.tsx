"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import quizData from "./t1b-samples.json";
import { useHookstate } from "@hookstate/core";
import { QuizT1bItem } from "./definitions";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";

// const quiz = quizData[0] as QuizT1bItem;

export default function DemoPage() {
 return (
    <div>
        <h1>Quiz T1b</h1>
        {/* <JsonViewerComponent data={quiz} /> */}
    </div>
 )
}
