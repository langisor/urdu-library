"use client";
// useQuizLogic.ts
import { useState, useMemo, useCallback, useEffect } from "react";
import { QuizData, VocabItem, QuizState, QuizMode } from "./types"; // Assuming types.ts is in the same directory

// Helper function to shuffle an array (Fisher-Yates)
const shuffleArray = (array: VocabItem[]): VocabItem[] => {
  let currentIndex = array.length,
    randomIndex;
  const newArray = [...array];

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
};

// Define which language will be the prompt based on the chosen quiz mode
const getPromptLanguage = (
  mode: QuizMode
): "English" | "Transliteration" | "Urdu" | "Arabic" => {
  switch (mode) {
    case "Urdu":
    case "Arabic":
      // Prompt will be English when quizzing Urdu/Arabic
      return "English";
    case "English":
      // Prompt will be Urdu/Arabic when quizzing English (or any other logic you prefer)
      return "Urdu"; // Assuming the user will learn English from Urdu
    default:
      return "English";
  }
};

export const useQuizLogic = (data: QuizData) => {
  const [quizMode, setQuizMode] = useState<QuizMode>("Urdu");
  const [promptLanguage, setPromptLanguage] = useState<
    "English" | "Transliteration" | "Urdu" | "Arabic"
  >(getPromptLanguage(quizMode));

  const initialShuffledWords = useMemo(
    () => shuffleArray(data.table.data),
    [data.table.data]
  );

  const [state, setState] = useState<
    Omit<QuizState, "quizMode" | "promptLanguage">
  >({
    currentWordIndex: 0,
    score: 0,
    isAnswered: false,
    userInput: "",
    isCorrect: null,
    shuffledWords: initialShuffledWords,
  });

  const currentWord = state.shuffledWords[state.currentWordIndex];
  const totalWords = state.shuffledWords.length;

  // Function to switch quiz mode
  const switchQuizMode = (newMode: QuizMode) => {
    const newPromptLang = getPromptLanguage(newMode);
    setQuizMode(newMode);
    setPromptLanguage(newPromptLang);
    // Reset the quiz when the mode changes
    setState((prevState) => ({
      ...prevState,
      currentWordIndex: 0,
      score: 0,
      isAnswered: false,
      userInput: "",
      isCorrect: null,
      shuffledWords: shuffleArray(data.table.data),
    }));
  };

  const checkAnswer = useCallback(() => {
    if (!currentWord || state.isAnswered) return;

    const correctAnswers = currentWord[quizMode]; // e.g., currentWord['Urdu']

    // Handle multiple correct answers separated by '/' or ','
    const answerOptions = correctAnswers
      .split(/[/,]/)
      .map((ans) => ans.trim().toLowerCase());
    const input = state.userInput.trim().toLowerCase();

    const isCorrect = answerOptions.includes(input);

    setState((prevState) => ({
      ...prevState,
      isAnswered: true,
      isCorrect: isCorrect,
      score: isCorrect ? prevState.score + 1 : prevState.score,
    }));
  }, [currentWord, state.isAnswered, state.userInput, quizMode]);

  const nextWord = useCallback(() => {
    const nextIndex = state.currentWordIndex + 1;
    if (nextIndex < totalWords) {
      setState((prevState) => ({
        ...prevState,
        currentWordIndex: nextIndex,
        isAnswered: false,
        userInput: "",
        isCorrect: null,
      }));
    } else {
      // Quiz finished logic (can be expanded)
      console.log("Quiz finished!");
    }
  }, [state.currentWordIndex, totalWords]);

  const resetQuiz = useCallback(() => {
    setState({
      currentWordIndex: 0,
      score: 0,
      isAnswered: false,
      userInput: "",
      isCorrect: null,
      shuffledWords: shuffleArray(data.table.data),
    });
  }, [data.table.data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!state.isAnswered) {
      setState((prevState) => ({ ...prevState, userInput: e.target.value }));
    }
  };

  const currentPrompt = currentWord ? currentWord[promptLanguage] : "";

  return {
    ...state,
    quizMode,
    promptLanguage,
    currentWord,
    totalWords,
    currentPrompt,
    checkAnswer,
    nextWord,
    resetQuiz,
    handleInputChange,
    switchQuizMode,
  };
};
