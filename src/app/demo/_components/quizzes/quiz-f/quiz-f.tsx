"use client"

import { JsonViewerComponent } from "@/components/json-viewer"
import {QuizFItem} from "./definitions"
import { useQuizD } from "./use-quiz-f"
import * as React from "react"

export function QuizF({quizItem}:{quizItem:QuizFItem}) {
    const {quizState, startQuiz, nextQuestion, answerQuestion, resetQuiz} = useQuizD(quizItem)
   return (
    <JsonViewerComponent data={quizState} />
   )
}


