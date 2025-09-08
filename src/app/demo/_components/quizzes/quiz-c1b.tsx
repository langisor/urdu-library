"use client";
import {QuizC1bItem} from "../../_hooks/definitions";
import {convertC1b} from "../../_hooks/converters";
import {useHookstate} from "@hookstate/core";
import {JsonViewerComponent} from "@/components/json-viewer";

export default function QuizC1b({quiz}: {quiz: QuizC1bItem}) {
    const state = useHookstate(convertC1b(quiz));
    return (
        <div>
            <h1>Quiz C1b</h1>
            <JsonViewerComponent data={state.get()} />
        </div>
    );
}
