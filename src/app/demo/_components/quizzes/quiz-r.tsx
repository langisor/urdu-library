"use client"
import {QuizRItem} from "../../_hooks/definitions";
import {convertR} from "../../_hooks/converters";
import {useHookstate} from "@hookstate/core";
import {JsonViewerComponent} from "@/components/json-viewer";

export default function QuizR({quiz}: {quiz: QuizRItem}) {
 
    return (
        <div>
            <h1>Quiz R</h1>
            <JsonViewerComponent data={quiz} />
        </div>
    );
}