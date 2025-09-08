"use client"
import {QuizFItem} from "../../_hooks/definitions";
import {convertF} from "../../_hooks/converters";
import {useHookstate} from "@hookstate/core";
import {JsonViewerComponent} from "@/components/json-viewer";

export default function QuizF({quiz}: {quiz: QuizFItem}) {
    const state = useHookstate(convertF(quiz));
    return (
        <div>
            <h1>Quiz F</h1>
            <JsonViewerComponent data={state.get()} />
        </div>
    );
}
