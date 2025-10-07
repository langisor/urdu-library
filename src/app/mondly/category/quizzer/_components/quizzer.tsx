"use client";

import { Card, CardContent } from "@/components/ui/card";
import * as React from "react";
import { Feedback } from "./helpers-types";
import { useStep } from "@/hooks/use-step";
import QuizzerProgress from "./quizzer-progress";
// import { useGlobalScoreState } from "../global-score-state";
import * as Quizzes from "./quizzes";
import { useHookstate, State } from "@hookstate/core";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import { LoadingSpinner } from "./loading-spinner";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

interface Props {
  quizzes: any[];
}
const initialScoreState = {
  userName: "",
  score: 0,
};
const initialFeedback = {
  isAnswered: false,
  isCorrect: null,
  message: "",
};

export default function Quizzer({ quizzes }: Props) {
  // states
  const [currentStep, actions] = useStep(quizzes.length);
  const scoreState = useHookstate(initialScoreState);
  const quizState = useHookstate(false); // true when the user has completed the last question

  // Use a local state variable to watch for changes (optional, but needed if you render the state)
  const feedbackState: State<Feedback> = useHookstate(
    initialFeedback as Feedback
  );
  const loading = useHookstate(false);

  // functions and renders
  const resetUI = () => {
    feedbackState.set(initialFeedback);
  };

  /**
   * This function will give child component a signal to move to the next question
   * it will also increment the score if current answer is correct
   */

  const nextQuiz = () => {
    loading.set(true);
    // increment the score if current answer is correct
    if (feedbackState.isCorrect.get() === true) {
      scoreState.set((p) => ({ ...p, score: p.score + 1 }));
    }

    // check if this  Not the last question in Quiz
    console.log("nextQuestion....");
    const canGoToNext = actions.canGoToNextStep;

    if (canGoToNext) {
      actions.goToNextStep();
    } else {
      quizState.set(true);
    }
    resetUI();
  };
  const renderScorebar = () => {
    console.log("render Scorebar....");

    return (
      <Item className="w-full bg-gradient-to-b from-secondary to-primary/40 text-xl flex flex-row gap-2 items-center p-2">
        <ItemContent>
          <ItemTitle>Score</ItemTitle>
          <ItemDescription>
            Your score: {scoreState.score.get()}
          </ItemDescription>
        </ItemContent>
      </Item>
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
      case "T1":
        return (
          <Quizzes.QuizT1
            quizData={currentQuiz}
            quizzerFeedback={feedbackState}
            onNextQuiz={nextQuiz}
          />
        );
      default:
        return (
          <Item>
            <JsonViewerComponent data={currentQuiz} />
          </Item>
        );
    }
  };
  const renderFeedback = () => {
    const initialStyle = "text-white bg-gray-500";
    const isCorrectStyle = "text-white bg-green-500";
    const isIncorrectStyle = "text-white bg-red-500";

    if (feedbackState.isAnswered.get()) {
      return (
        <Item
          className={
            feedbackState.isCorrect.get() === true
              ? isCorrectStyle
              : isIncorrectStyle
          }
        >
          {feedbackState.message.get()}
        </Item>
      );
    } else {
      return (
        <Item className={initialStyle}>{feedbackState.message.get()}</Item>
      );
    }
  };
  const renderLoadingSpinner = () => {
    return <LoadingSpinner time={2000} onNext={() => loading.set(false)} />;
  };
  // variables
  const currentQuiz = quizzes[currentStep - 1];
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

      <div className="flex flex-row gap-2">
        {/* feedback */}
        <div>{renderFeedback()}</div>

        {/* Loading Spinner */}
       {loading.get() &&  <div>{ renderLoadingSpinner()}</div>}
      </div>
    </div>
  );
}
