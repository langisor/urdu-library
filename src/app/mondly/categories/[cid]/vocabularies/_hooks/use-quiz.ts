import { useState, useEffect } from "react";
import { QuizWord, Question, QuizState } from "../_lib/types";

export const useQuiz = (words: QuizWord[]) => {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    completed: false,
    startTime: null,
  });

  const generateRandomOptions = (
    correctAnswer: string,
    allWords: QuizWord[]
  ): string[] => {
    const otherOptions = allWords
      .flatMap((word) => word.sols.map((sol) => sol.text))
      .filter((text) => text !== correctAnswer);

    const randomOptions = otherOptions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return [correctAnswer, ...randomOptions].sort(() => Math.random() - 0.5);
  };

  const generateQuestions = (): Question[] => {
    const questions: Question[] = [];

    words.forEach((word, index) => {
      const arabicText = word.sols[0].text;
      const urduText = word.sols[1].text;
      const urduPhonetic = word.sols[1].phonetic;

      // Audio to Text Question
      questions.push({
        id: `audio-${word.id}`,
        type: "audio-to-text",
        word,
        question: "Listen to the audio and select the correct translation:",
        correctAnswer: urduText,
        options: generateRandomOptions(urduText, words),
        audioUrl: `/`, // Simulated URL
      });

      // Arabic to Urdu Question
      questions.push({
        id: `ar-ur-${word.id}`,
        type: "arabic-to-urdu",
        word,
        question: `What is the Urdu translation of "${arabicText}"?`,
        correctAnswer: urduText,
        options: generateRandomOptions(urduText, words),
      });

      // Urdu to Arabic Question
      questions.push({
        id: `ur-ar-${word.id}`,
        type: "urdu-to-arabic",
        word,
        question: `What is the Arabic translation of "${urduText}"${
          urduPhonetic ? ` (${urduPhonetic})` : ""
        }?`,
        correctAnswer: arabicText,
        options: generateRandomOptions(arabicText, words),
      });
    });

    return questions.sort(() => Math.random() - 0.5).slice(0, 15); // Limit to 15 questions
  };

  const startQuiz = () => {
    const questions = generateQuestions();
    setQuizState({
      questions,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      completed: false,
      startTime: new Date(),
    });
  };

  const answerQuestion = (answer: string) => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setQuizState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answer,
      },
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const nextQuestion = () => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      completed: prev.currentQuestionIndex + 1 >= prev.questions.length,
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      completed: false,
      startTime: null,
    });
  };

  return {
    quizState,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz,
  };
};
