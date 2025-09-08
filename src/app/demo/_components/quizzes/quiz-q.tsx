"use client"
import {QuizQItem} from "../../_hooks/definitions";
import {convertQ} from "../../_hooks/converters";
import {useHookstate} from "@hookstate/core";
import {JsonViewerComponent} from "@/components/json-viewer";

export default function QuizQ({quiz}: {quiz: QuizQItem}) {
    const state = useHookstate(convertQ(quiz));
    return (
        <div>
            <h1>Quiz Q</h1>
            <JsonViewerComponent data={state.get()} />
        </div>
    );
}
