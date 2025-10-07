"use client";
import { QuizT1Item } from "../definitions";
import { convertT1 } from "../converters";
import { useHookstate, State } from "@hookstate/core";
import { LoadingSpinner } from "../loading-spinner";
import { Button } from "@/components/ui/button";
import { useTune } from "@/hooks/use-tone";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import * as React from "react";
import { Feedback } from "@/app/mondly/category/quizzer/_components/helpers-types";

interface QuizT1Props {
  quizData: QuizT1Item;
  quizzerFeedback: State<Feedback>;
  onNextQuiz: () => void;
}

export default function QuizT1({
  quizData,
  quizzerFeedback,
  onNextQuiz,
}: QuizT1Props) {
  const state = useHookstate({
    question: convertT1(quizData),

    isFinished: false,
  });
  const selectedTokens = useHookstate<string[]>([]);
  const { playCorrectTune, playIncorrectTune } = useTune();

  // actions
  const actions = {
    checkAnswer: () => {
      // join and remove dots
      const selectedTokensText = selectedTokens.get().join(" ").trim();

      // console.log(
      //   selectedTokensText.length,
      //   state.question.correctAnswer.get().length
      // );
      if (state.question.correctAnswer.get() === selectedTokensText) {
        playCorrectTune();
        quizzerFeedback.isCorrect.set(true);
        quizzerFeedback.message.set("أحسنت");
      } else {
        playIncorrectTune();

        quizzerFeedback.isCorrect.set(false);
        quizzerFeedback.message.set(
          `الترتيب الصحيح هو: ${state.question.correctAnswer.get()}`
        );

        quizzerFeedback.isAnswered.set(true);
      }
    },
    selectToken: (token: string) => {
      selectedTokens.set((p) => [...p, token]);
      // remove token from tokens array
      state.question.tokens.set((p) => p.filter((t) => t !== token));
    },
    reset: () => {
      selectedTokens.set([]);
      state.question.set(convertT1(quizData));
    },
  };

  // renders
  const renders = {
    renderHeader: () => {
      return (
        <Card className="h-full">
          <CardHeader className="flex flex-row text-right gap-6">
            <CardTitle className="flex flex-row gap-2">
              <p>{state.question.text.get()}</p>
            </CardTitle>

            <CardDescription>
              <TonePlayerButton url={state.question.audioFile.get()} />
            </CardDescription>
          </CardHeader>
        </Card>
      );
    },
    renderSelectedTokensArea: () => {
      return (
        <Card className="h-[100px] my-2">
          <CardContent className="flex justify-start gap-3 flex-wrap ">
            {selectedTokens.get().map((token) => (
              <Button
                disabled={true}
                key={token}
                onClick={() => actions.selectToken(token)}
              >
                {token}
              </Button>
            ))}
          </CardContent>
        </Card>
      );
    },
    renderAvailableTokensArea: () => {
      return (
        <Card className="h-[100px] my-2">
          <CardContent className="flex justify-start gap-3 flex-wrap ">
            {state.question.tokens.get().map((token) => (
              <Button
                disabled={selectedTokens.get().includes(token)}
                key={token}
                onClick={() => actions.selectToken(token)}
              >
                {token}
              </Button>
            ))}
          </CardContent>
        </Card>
      );
    },
    renderActionsButtons: () => {
      return (
        <Card className="flex justify-end gap-3">
          <CardContent>
            <Button
              onClick={actions.checkAnswer}
              disabled={selectedTokens.get().length === 0}
            >
              تأكد
            </Button>
            <Button
              onClick={actions.reset}
              disabled={selectedTokens.get().length === 0}
            >
              مسح
            </Button>
          </CardContent>
        </Card>
      );
    },
  };
  console.log(state.get());

  return (
    <div className="flex flex-col  text-right" dir="rtl">
      {/* Header */}
      {renders.renderHeader()}

      {/* selected tokens area */}
      {renders.renderSelectedTokensArea()}

      {/* available tokens area */}
      {renders.renderAvailableTokensArea()}

      {/* actions buttons */}
      {renders.renderActionsButtons()}
    </div>
  );
}
