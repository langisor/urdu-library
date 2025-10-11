"use client";
import { QuizT1bItem } from "../definitions";
import { convertT1b } from "../converters";
import { useHookstate, State } from "@hookstate/core";
import type { Feedback } from "../definitions";

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

interface QuizT1bProps {
  quizData: QuizT1bItem;
  quizzerFeedback: State<Feedback>;
}
export default function QuizT1b({ quizData, quizzerFeedback }: QuizT1bProps) {
  const state = useHookstate({
    question: convertT1b(quizData),
  });

  const selectedTokens = useHookstate<string[]>([]);
  const { playCorrectTune, playIncorrectTune } = useTune();
 
  React.useEffect(() => {
    const audio = new Audio(state.question.audioFile.get());
    audio.play();
    return () => {
      audio.pause();
    };
  }, [state.question.audioFile.get()]);
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
        playCorrectTune();
        quizzerFeedback.isCorrect.set(true);
        quizzerFeedback.message.set("أحسنت");
      } else {
        playIncorrectTune();
        quizzerFeedback.isCorrect.set(false);
        quizzerFeedback.message.set(
          `الترتيب الصحيح هو: ${state.question.correctAnswer.get()}`
        );
      }
      quizzerFeedback.isAnswered.set(true);
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
      state.question.set(convertT1b(quizData));
    },
  };
  console.log(state.get());
  return (
    <div className="flex flex-col  text-right" dir="rtl">
      {/* Header */}
      <Card className="h-full">
        <CardHeader className="flex flex-row text-right gap-6">
          <CardTitle>
            <p className="naskh-text">{state.question.text.get()}</p>
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
                <Button
                  className="urdu-text"
                  key={token}
                  onClick={() => actions.selectToken(token)}
                >
                  {token}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* available tokens area */}
          <Card className="flex justify-start gap-3 flex-wrap ">
            <CardContent>
              {state.question.tokens.get().map((token) => (
                <Button
                  key={token}
                  onClick={() => actions.selectToken(token)}
                  className="urdu-text text-lg"
                >
                  {token}
                </Button>
              ))}
            </CardContent>
          </Card>
          {/* actions buttons */}
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
        </CardContent>
      </Card>
    </div>
  );
}
