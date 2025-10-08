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
  message: "اجب على السؤال ثم اضغط على  تأكد",
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

  // functions and renders
  const resetUI = () => {
    console.log("resetUI....");
    feedbackState.isAnswered.set(false);
    feedbackState.isCorrect.set(null);
    feedbackState.message.set("اجب على السؤال ثم اضغط على  تأكد");
  };

  /**
   * This function will give child component a signal to move to the next question
   * it will also increment the score if current answer is correct
   */

  const nextQuiz = () => {
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
  const resetScore = () => {
    scoreState.score.set(0);
    actions.reset();
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
        restart={resetScore}
      />
    );
  };
  const renderQuestion = () => {
    console.log("renderQuestion Type: ", currentQuiz.type);
    switch (currentQuiz.type) {
      case "C1b":
        return (
          <Quizzes.QuizC1b
            quizData={currentQuiz}
            quizzerFeedback={feedbackState}
            
          />
        );
      case "T1":
        return (
          <Quizzes.QuizT1
            quizData={currentQuiz}
            quizzerFeedback={feedbackState}
           
          />
        );
      case "T1b":
        return (
          <Quizzes.QuizT1b
            quizData={currentQuiz}
            quizzerFeedback={feedbackState}
           
          />
        );
      case "F":
        return (
          <Quizzes.QuizF
            quizData={currentQuiz}
            quizzerFeedback={feedbackState}
           
          />
        );
      case "Q":
        return (
          <Quizzes.QuizQ
            quizData={currentQuiz}
            quizzerFeedback={feedbackState}
           
          />
        );
      case "QB":
        return (
          <Quizzes.QuizQb
            quizData={currentQuiz}
            quizzerFeedback={feedbackState}
           
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
    let style = "";
    if (feedbackState.isAnswered.get()) {
      style =
        feedbackState.isCorrect.get() === true
          ? isCorrectStyle
          : isIncorrectStyle;
      return <Item className={style}>{feedbackState.message.get()}</Item>;
    } else {
      style = initialStyle;
      return <Item className={style}>{feedbackState.message.get()}</Item>;
    }
  };
  const renderLoadingSpinner = () => {
    return <LoadingSpinner time={2000} onNext={nextQuiz} />;
  };
  // variables
  const currentQuiz = quizzes[currentStep - 1];
  // console.log("rendering quizzer ....", currentQuiz);
  console.log("feedbackState", feedbackState.get());

  // returns

  return (
    <div className="flex flex-col gap-2">
      <div>{renderScorebar()}</div>
      {/* Progress */}
      {renderProgress()}
      {/* Quiz */}
      {/* disable interactive when question is answered */}
      <div className="flex flex-col gap-2 text-right" dir="rtl">
        <div> {renderQuestion()}</div>

        {/* feedback */}
        <div className="flex flex-row gap-2">
          <div>{renderFeedback()}</div>
          {feedbackState.isAnswered.get() && (
            <div>{renderLoadingSpinner()}</div>
          )}
        </div>
      </div>
    </div>
  );
}
