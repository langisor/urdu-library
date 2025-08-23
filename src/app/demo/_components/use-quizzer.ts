"use client"
import * as React from "react";
import { useQuizzesStore } from "./use-quizzes-store";
import { QuizItem } from "./quizzes/types";

interface QuizzerState {
 
    quizzes: Array<QuizItem>;
 
}
 
export function useQuizzer({quizzes}: QuizzerState) {
 
    const [currentQuizIndex, setCurrentQuizIndex] = React.useState(0)
 

    const handleNextQuiz = () => {
        setCurrentQuizIndex(currentQuizIndex + 1)
    }
    const handlePreviousQuiz = () => {
        setCurrentQuizIndex(currentQuizIndex - 1)
    }
    return {
        currentQuizIndex,
        setCurrentQuizIndex,
        handleNextQuiz,
        handlePreviousQuiz,
    }
}
    