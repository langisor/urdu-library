"use client"
import {QuizDItem,QuizDState} from "../_components/quizzes/quiz-d/types"
import * as React from "react"
import { convertToQuestions } from "../helpers";
export function useQuizD(quizItem: QuizDItem) {
    const [quizState, setState] = React.useState<QuizDState>({
        currentQuestionIndex: 0,
        score: 0,
        questions: [],
        isComplete: false,
    })
   

    React.useEffect(() => {
        setState({
            ...quizState,
            questions: convertToQuestions(quizItem),
        })
    }, [quizItem])


    const startQuiz = () => {
        setState({
            ...quizState,
            isComplete: false,
        })
    }

    const nextQuestion = () => {
        setState({
            ...quizState,
            currentQuestionIndex: quizState.currentQuestionIndex + 1,
        })
    }

    const answerQuestion = (answer: string) => {
        setState({
            ...quizState,
            score: quizState.score + (answer === quizState.questions[quizState.currentQuestionIndex].correctAnswer ? 1 : 0),
        })
    }

    const resetQuiz = () => {
        setState({
            ...quizState,
            currentQuestionIndex: 0,
            score: 0,
            isComplete: false,
        })
    }
    return {
       quizState,
        startQuiz,
        nextQuestion,
        answerQuestion,
        resetQuiz,
    }
}