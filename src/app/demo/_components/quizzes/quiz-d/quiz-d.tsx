"use client"
import * as React from 'react';
import { useQuizD } from './use-quiz-d';
import { QuizDItem } from './definitions';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useTune } from '../use-tune';

interface QuizDProps {
    quizItem: QuizDItem;
}

export const QuizD: React.FC<QuizDProps> = ({ quizItem }: QuizDProps) => {
    const { quizState, answerQuestion, resetQuiz } = useQuizD(quizItem);
    const { questions, currentQuestionIndex, isComplete, score } = quizState;
    const { playCorrectTune, playIncorrectTune } = useTune();
    console.log("quizState:", quizState);
    const [feedback, setFeedback] = React.useState<{ isCorrect: boolean; text: string } | null>(null);

    const handleAnswer = (answer: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        answerQuestion(answer);
        const isCorrect = answer === currentQuestion.correctAnswer;
        const feedbackText = isCorrect ? 'Correct! ✅' : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer} ❌`;

        if (isCorrect) {
            playCorrectTune();
        } else {
            playIncorrectTune();
        }

        setFeedback({ isCorrect, text: feedbackText });

        setTimeout(() => {
            answerQuestion(answer);
            setFeedback(null);
        }, 1500);
    };

    const renderCards = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const options = currentQuestion.options;

        return (
            <div className="grid grid-cols-2 gap-4">

                <Card
                    key={0}
                    onClick={() => handleAnswer(options[0].text)}
                    className={`cursor-pointer transition-colors duration-200 ${feedback ? (options[0].text === currentQuestion.correctAnswer ? 'border-green-500' : 'border-red-500') : ''}`}
                >
                    <CardContent className="flex flex-col items-center p-4">
                        <div className="relative w-24 h-24 mb-2">
                            <Image
                                src={options[0].image}
                                alt={options[0].text}
                                fill
                                style={{ objectFit: "cover", borderRadius: "8px" }}
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <span className="text-sm font-medium">{options[0].text}</span>
                    </CardContent>
                </Card>
              

            </div>
        )
    }
    const currentQuestion = questions[currentQuestionIndex];

    if (isComplete) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h2 className="text-3xl font-bold mb-4">Quiz Complete! 🎉</h2>
                <p className="text-xl mb-4">You scored {score} out of {questions.length}.</p>
                <Button onClick={resetQuiz}>
                    Try Again
                </Button>
            </div>
        );
    }

    if (!currentQuestion) {
        return <div className="flex items-center justify-center min-h-screen p-4">Loading quiz...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span className="text-gray-500">Score: {score}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">{currentQuestion.text}</h3>




                {feedback && (
                    <div className={`p-3 rounded-lg text-center font-bold mb-4 ${feedback.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {feedback.text}
                    </div>
                )}
            </div>
        </div>
    );
};

