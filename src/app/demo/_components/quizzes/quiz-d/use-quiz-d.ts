"use client"
import { QuizDItem  } from "./definitions"
import * as React from "react"
import { convertToQuestions } from "./definitions";
import { QuizDState } from "./definitions";
export function useQuizD(quizItem: QuizDItem) {
    const [quizState, setState] = React.useState<QuizDState>({
        currentQuestionIndex: 0,
      
        questions: [],
        isComplete: false,
    })
    React.useEffect(() => {
        setState(q => ({
            ...q,
            questions: convertToQuestions(quizItem),
        }))
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
            questions: quizState.questions.map((q, index) =>
                index === quizState.currentQuestionIndex
                    ? { ...q, isAnswered: true }
                    : q
            ),
           
            isComplete: quizState.currentQuestionIndex + 1 >=4,
        })
    }
    const resetQuiz = () => {
        setState({
            ...quizState,
            currentQuestionIndex: 0,
            
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