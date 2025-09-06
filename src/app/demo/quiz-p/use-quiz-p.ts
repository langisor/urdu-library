"use client";
import { useHookstate } from "@hookstate/core";
import { QuizPItem, convertToQuestions,QuizPState } from "./definitions";

export const useQuizP = ({ quizItem }: { quizItem: QuizPItem }) => {
    const quizState = useHookstate<QuizPState>({
        questions: convertToQuestions(quizItem),
        currentQuestionIndex: 0,
        isComplete: false,
        feedback: null,
    });
    const nextQuestion = () => {
        const currentIndex=quizState.currentQuestionIndex.get();
        if(currentIndex===quizState.questions.length-1){
            quizState.isComplete.set(true);
            return;
        }
        quizState.currentQuestionIndex.set(p=>p+1)
    };
    const checkAnswer = (answer: string) => {
        const currentQuestion = quizState.questions.value[quizState.currentQuestionIndex.get()];
        const isCorrect = answer === currentQuestion.correctAnswer;
        quizState.feedback.set({
            isCorrect,
            text: isCorrect ? "Correct! ✅" : "Wrong!",
        });
        
    };
    const resetQuiz = () => {
        quizState.currentQuestionIndex.set(0);
        quizState.isComplete.set(false);
        quizState.feedback.set(null);
    };
    return {
        quizState,
        nextQuestion,
        checkAnswer,
        resetQuiz,
    };
};

