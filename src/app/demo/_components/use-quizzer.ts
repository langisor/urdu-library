"use client"
import * as React from "react";
import { useHookstate } from "@hookstate/core";
import { QuizItem } from "./quizzes/types";

interface QuizzerState {
    currentQuizIndex: number;
    quizzes: Array<QuizItem>;
    open: boolean;
    score: number;
}

export function useQuizzer() {
    const quizzerState = useHookstate({
        currentQuizIndex: 0,
        quizzes: [],
        open: false,
        score: 0,
    })
    return {
        currentQuizIndex: quizzerState.currentQuizIndex.get(),
        quizzes: quizzerState.quizzes.get(),
        open: quizzerState.open.get(),
        score: quizzerState.score.get(),
        setCurrentQuizIndex: quizzerState.currentQuizIndex.set,
        setOpen: quizzerState.open.set,
        setScore: quizzerState.score.set,
    }
}
    