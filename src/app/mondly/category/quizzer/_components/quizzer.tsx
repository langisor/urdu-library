"use client";
/**
 * receives a questions array
 * interactively show a progress and and check answers
 * auto move to the next question after show a feedback messa ge to the user
 */
import {
  Card,
 
} from "@/components/ui/card";

import * as React from "react";
import { Feedback } from "./helpers-types";
import { useStep } from "@/hooks/use-step";
import QuizzerProgress from "./quizzer-progress";
import { useGlobalScoreState } from "../global-score-state";
import * as Quizzes from "./quizzes";
import { useHookstate, State, hookstate } from "@hookstate/core";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";

interface Props {
  quizzes: any[];
}

const initialFeedback = {
  isAnswered: false,
  isCorrect: null,
  message: "",
};
export default function Quizzer({ quizzes }: Props) {
  // states
  const [currentStep, actions] = useStep(quizzes.length);
  const scoreState = useGlobalScoreState();
  const quizState = useHookstate(false); // true when the user has completed the last question

  // Use a local state variable to watch for changes (optional, but needed if you render the state)
  const feedbackState: State<Feedback> = useHookstate(
    initialFeedback as Feedback
  );

  // functions and renders

  const resetUI = () => {
    feedbackState.set({
      isAnswered: false,
      isCorrect: null,
      message: "Answer your question",
    });
  };

  /**
   * This function will give child component a signal to move to the next question
   * it will also increment the score if current answer is correct
   */
  const nextQuiz = () => {
    // increment the score if current answer is correct
    scoreState.addToScore(1);
    resetUI();
    // check if this  Not the last question in Quiz
    console.log("nextQuestion....");
    const canGoToNext = actions.canGoToNextStep;
    if (canGoToNext) {
      actions.goToNextStep();
    } else {
      quizState.set(true);
    }
  };
  const renderScorebar = () => {
    console.log("render Scorebar....");

    return (
      <Card className="w-full bg-gradient-to-b from-secondary to-primary/40 text-xl flex flex-row gap-2 items-center p-2">
        <span>Your score: </span>
        <span className="font-bold text-blue-600">{scoreState.getScore()}</span>
      </Card>
    );
  };
  const renderProgress = () => {
    console.log("renderProgress....");
    return (
      <QuizzerProgress
        currentStep={currentStep}
        totalSteps={quizzes.length}
        nextStep={nextQuiz}
        prevStep={actions.goToPrevStep}
        restart={actions.reset}
      />
    );
  };
  const renderQuestion = () => {
    console.log("renderQuestion");
    switch (currentQuiz.type) {
      case "C1b":
        return (
          <Quizzes.QuizC1b
            quizData={currentQuiz}
            quizzerFeedback={feedbackState}
            onNextQuiz={nextQuiz}
          />
        );
      default:
        return <Card><JsonViewerComponent data={currentQuiz} /></Card>;
    }
  };
  const renderFeedback = () => {
    if (feedbackState.isAnswered.get() === true) {
      if (!feedbackState.isCorrect.get()) {
        return (
          <Card className="bg-red-600 text-white text-xl px-2 py-2">
            {feedbackState.message.get()}
          </Card>
        );
      } else {
        return (
          <Card className="bg-green-600 text-white text-xl px-2 py-2">
            {feedbackState.message.get()}
          </Card>
        );
      }
    } else {
      return <Card className="text-xl px-2 py-2">Answer Your question</Card>;
    }
  };
  // variables
  const currentQuiz = quizzes[currentStep-1];
  // console.log("rendering quizzer ....", currentQuiz);

  // returns

  return (
    <div className="flex flex-col gap-2">
      <div>{renderScorebar()}</div>
      {/* Progress */}
      {renderProgress()}
      {/* Quiz */}
      {/* disable interactive when question is answered */}

      <div> {renderQuestion()}</div>

      {/* feedback */}
      {renderFeedback()}
    </div>
  );
}
