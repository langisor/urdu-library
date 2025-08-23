"use client"

import { JsonViewerComponent } from "@/components/json-viewer"
import {QuizDItem} from "./definitions"
import { useQuizD } from "./use-quiz-d"
import * as React from "react"

export function QuizD({quizItem}:{quizItem:QuizDItem}) {
    const {quizState, startQuiz, nextQuestion, answerQuestion, resetQuiz} = useQuizD(quizItem)
   return (
    <JsonViewerComponent data={quizState} />
   )
}


