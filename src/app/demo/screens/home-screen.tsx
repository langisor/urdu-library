"use client";
import { useState, useEffect } from "react";
import {
  getCourseAudio,
  Question,
  QuizItem,
  shuffleArray,
  createQuestion,
} from "./utils";
import { QuizScreen } from "./quiz-screen";
import { ResultScreen } from "./result-screen";
import { StartScreen } from "./start-screen";


interface HomeScreenProps {
  vocabularies: QuizItem[]; // Assuming mockData is passed as a prop
}
export function HomeScreen({ vocabularies }: HomeScreenProps) {
  const [screen, setScreen] = useState("start"); // 'start', 'quiz', 'results'
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loadingAudio, setLoadingAudio] = useState(false);

  // --- Effects ---
  // This useEffect is used to prepare the quiz data when the component mounts
  useEffect(() => {
    // Create a list of all possible Arabic words to generate wrong answers from
    const allArabicWords = vocabularies.map((item) => item.sols[0].text);

    // Prepare a new set of questions by shuffling and adding options
    const preparedQuestions = shuffleArray([...vocabularies]).map((item) =>
      createQuestion(item, allArabicWords)
    );
    setQuizData(preparedQuestions);
  }, []);

  // --- Handlers ---
  const handleStartQuiz = () => {
    setScreen("quiz");
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setFeedbackMessage("");
  };

  const handleAnswer = (option: string) => {
    if (isAnswered) return; // Prevent multiple clicks
    setIsAnswered(true);
    setSelectedAnswer(option);

    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setFeedbackMessage("Correct!");
    } else {
      setFeedbackMessage("Incorrect.");
    }

    // Wait a moment before moving to the next question
    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setFeedbackMessage("");
      } else {
        setScreen("results");
      }
    }, 1500);
  };

  const handleRestartQuiz = () => {
    // Reset the quiz state to start over
    setQuizData(shuffleArray([...quizData])); // Reshuffle for a new game
    setScreen("start");
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setFeedbackMessage("");
  };

  const handlePlayAudio = async () => {
    setLoadingAudio(true);
    const audioUrl = getCourseAudio(quizData[currentQuestionIndex].audioKey);
    setLoadingAudio(false);
  };

  // Main render logic: render the correct screen based on the state
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl card p-8 transition-all duration-500 min-h-[500px] flex items-center justify-center">
      {screen === "start" && <StartScreen handleStartQuiz={handleStartQuiz} />}
      {screen === "quiz" && 
      <QuizScreen 
        quizItems={quizData}
        currentQuestionIndex={currentQuestionIndex}
        score={score}
        handleAnswer={handleAnswer}
        handlePlayAudio={handlePlayAudio}
        loadingAudio={loadingAudio}
        selectedAnswer={selectedAnswer}
        isAnswered={isAnswered}
        feedbackMessage={feedbackMessage}
      
      />}
      {screen === "results" && 
      <ResultScreen
        quizData={quizData}
        score={score}
        handleRestartQuiz={handleRestartQuiz}
      />}
    </div>
  );
}
