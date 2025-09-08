"use client"
import {QuizRItem} from "../../_hooks/definitions";
import {convertR} from "../../_hooks/converters";
import {useHookstate} from "@hookstate/core";
import {JsonViewerComponent} from "@/components/json-viewer";

export default function QuizR({quiz}: {quiz: QuizRItem}) {
    const state = useHookstate(convertR(quiz));
    return (
        <div>
            <h1>Quiz R</h1>
            <JsonViewerComponent data={state.get()} />
        </div>
    );
}