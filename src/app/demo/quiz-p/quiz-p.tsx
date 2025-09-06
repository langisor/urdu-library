"use client"
import { useQuizP } from "./use-quiz-p";
import { QuizPItem } from "./definitions";
import { JsonViewerComponent } from "@/components/json-viewer";
import { ResultScreen } from "@/app/mondly/categories/[cid]/lessons/[lid]/_components/result-screen";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
 
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTune } from "@/hooks/use-tone";
import React from "react";
import {TonePlayerButton} from "@/components/general/tone-button-player";

interface QuizPProps {
    quizItem: QuizPItem;
    handleNextQuiz?: () => void;
}

export const QuizP: React.FC<QuizPProps> = ({ quizItem, handleNextQuiz }) => {
    // states
    const { quizState, nextQuestion, checkAnswer, resetQuiz } = useQuizP({
        quizItem,
    });
    const [selectedOption, setSelectedOption] = React.useState<string | null>(
        null
    );
    const { questions, currentQuestionIndex, isComplete, feedback } = quizState;
    const { playCorrectTune, playIncorrectTune } = useTune();
    const handleNextQuestion = () => {
        nextQuestion();
    };


    const currentQuestion = questions[currentQuestionIndex.get()];

    const handleCheckAnswer = (answer: string) => {
        setSelectedOption(answer);
        checkAnswer(answer);
        // if correct option is selected, play correct tune
        if (feedback.get()?.isCorrect) {
            playCorrectTune();
        } else {
            playIncorrectTune();
        }
        // if questions are not complete, handle next Question
        if (!isComplete) {
            setTimeout(() => {
                handleNextQuestion();
                setSelectedOption(null);
            }, 1500);
        }
        // if questions are complete, handle next Quiz
        if (isComplete) {
            setSelectedOption(null);
            resetQuiz();
            if (handleNextQuiz) {
                handleNextQuiz();
            }
        }
    };

    return (
        <Card className="flex flex-col gap-4 text-right" dir="rtl">
            <CardHeader>
                <CardTitle className="flex gap-4">
                    <h2 className="text-xl font-bold font-nastaliq">
                        {currentQuestion.text.get()}
                    </h2>
                    {/* <AudioPlayer
                        audioUrl={currentQuestion.audioFile}
                        text={""}
                        autoPlay={true}
                    /> */
                    }
                    <TonePlayerButton url={currentQuestion.audioFile.get()} autoPlay={true} />
                    
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 ">
                <RadioGroup
                    onValueChange={(value) => handleCheckAnswer(value)}
                    className="space-y-3 flex flex-col"
                    dir="rtl"
                >
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex gap-2 ">
                            <RadioGroupItem
                                checked={selectedOption === option.get()}
                                value={option.get()}
                                id={`option-${index}`}
                                className="mt-0.5 h-6 w-6"
                            />
                            <Label
                                htmlFor={`option-${index}`}
                                className="text-xl cursor-pointer"
                            >
                                {option.get()}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleNextQuestion}
                    disabled={isComplete.get() || !selectedOption}
                >
                    Next
                </Button>
            </CardFooter>
            <Card className="flex flex-col gap-4 text-left" dir="ltr">
                <CardContent>
                    <h2 className="text-xl font-bold mb-4">Quiz</h2>
                    <JsonViewerComponent data={questions} />
                </CardContent>
            </Card>
        </Card>
    );
};
