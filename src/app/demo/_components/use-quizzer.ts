"use client"
import * as React from "react";




interface QuizzerState {

    quizzes: Array<any>;
    score: number;

}

export function useQuizzer({ quizzes, score=0 }: QuizzerState) {

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
