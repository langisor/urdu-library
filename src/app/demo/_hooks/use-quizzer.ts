"use client"
import * as React from "react";




interface QuizzerState {

    quizzes: Array<any>;
    score?: number;

}

export function useQuizzer({ quizzes, score = 0 }: QuizzerState) {

    const [currentQuizIndex, setCurrentQuizIndex] = React.useState(0)
    const [currentScore, setCurrentScore] = React.useState<number>(score)

    const handleNextQuiz = () => {
        setCurrentQuizIndex(currentQuizIndex + 1)
    }
    const handlePreviousQuiz = () => {
        setCurrentQuizIndex(currentQuizIndex - 1)
    }
    const updateScore = (s: number) => setCurrentScore(currentScore + s)


    return {
        currentScore,
        updateScore,
        currentQuizIndex,
        setCurrentQuizIndex,
        handleNextQuiz,
        handlePreviousQuiz,
    }
}
