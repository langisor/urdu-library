"use client";
import { QuizT1bItem } from "../../_hooks/definitions";
import { convertT1b } from "../../_hooks/converters";
import { useHookstate } from "@hookstate/core";

import { useMainScreen } from "../screens/use-main-screen";
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

export default function QuizT1b({ quiz }: { quiz: QuizT1bItem }) {
  const state = useHookstate({
    question: convertT1b(quiz),
    isFinished: false,
  });

  const selectedTokens = useHookstate<string[]>([]);
  const { playCorrectTune, playIncorrectTune } = useTune();
  const feedBack = useHookstate<{ isCorrect: boolean; text: string } | null>(
    null
  );
  const { state: mainScreenState, actions: mainScreenActions } =
    useMainScreen();
  // actions
  const actions = {
    checkAnswer: () => {
      // clean up selected tokens
      const selectedTokensText = selectedTokens.get().join(" ").trim();
      // clean up correct answer
      const correctAnswer = state.question.correctAnswer
        .get()
        .trim()
        .replace(/\۔/g, "");
      console.log(selectedTokensText);
      console.log(correctAnswer);
      //  compare with correctAnswer
      if (correctAnswer === selectedTokensText) {
        state.isFinished.set(true);
        feedBack.set({ isCorrect: true, text: "أحسنت" });
        playCorrectTune();
        // go to next quiz after 3 seconds
        setTimeout(() => {
          mainScreenActions.nextQuiz();
        }, 3000);
        mainScreenState.score.set((p) => p + 1);
      } else {
        feedBack.set({
          isCorrect: false,
          text: `الترتيب الصحيح هو: ${state.question.correctAnswer.get()}`,
        });
        playIncorrectTune();
        // go to next quiz after 3 seconds
        setTimeout(() => {
          mainScreenActions.nextQuiz();
        }, 3000);
      }
    },
    selectToken: (token: string) => {
      // if token is already selected, remove it from question.tokens and add it to selectedTokens
      if (selectedTokens.get().includes(token)) {
        selectedTokens.set((p) => p.filter((t) => t !== token));
        state.question.tokens.set((p) => [...p, token]);
        return;
      }
      // if token is not selected, add it to selectedTokens and remove it from question.tokens
      selectedTokens.set((p) => [...p, token]);
      state.question.tokens.set((p) => p.filter((t) => t !== token));
    },
    reset: () => {
      selectedTokens.set([]);
      state.question.set(convertT1b(quiz));
    },
  };
  console.log(state.get());
  return (
    <div className="flex flex-col  text-right" dir="rtl">
      {/* Header */}
      <Card className="h-full">
        <CardHeader className="flex flex-row text-right gap-6">
          <CardTitle>
            <p>{state.question.text.get()}</p>
          </CardTitle>

          <CardDescription>
            <TonePlayerButton url={state.question.audioFile.get()} />
          </CardDescription>
        </CardHeader>
      </Card>

      {/* selected tokens area */}
      <Card>
        <CardContent className="flex flex-col gap-6">
          <Card className="h-[100px]">
            <CardContent className="flex justify-start gap-3 flex-wrap ">
              {selectedTokens.get().map((token) => (
                <Button key={token} onClick={() => actions.selectToken(token)}>
                  {token}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* available tokens area */}
          <Card className="flex justify-start gap-3 flex-wrap ">
            <CardContent>
              {state.question.tokens.get().map((token) => (
                <Button key={token} onClick={() => actions.selectToken(token)}>
                  {token}
                </Button>
              ))}
            </CardContent>
          </Card>
          {/* actions buttons */}
          <Card className="flex justify-end gap-3">
            <CardContent>
              <Button onClick={actions.checkAnswer}>تأكد</Button>
              <Button onClick={actions.reset}>مسح</Button>
            </CardContent>
          </Card>
          {feedBack && (
            <Card>
              <CardContent>
                <p
                  className={
                    feedBack.get()?.isCorrect
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {feedBack.get()?.text}
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
