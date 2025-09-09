"use client";
import { QuizC1bItem } from "../../_hooks/definitions";
import { convertC1b } from "../../_hooks/converters";
import { useHookstate } from "@hookstate/core";
import { mainScreenStore } from "../screens/store";
import { useTune } from "@/hooks/use-tone";
import { Button } from "@/components/ui/button";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { JsonViewerComponent } from "@/components/json-viewer";
import { getAudioUrl } from "@/lib/helpers";
import { shuffleArray } from "@/lib/helpers";
import * as React from "react";

export default function QuizC1b({ quiz }: { quiz: QuizC1bItem }) {
  const state = useHookstate({
    question: convertC1b(quiz),
  });
  const { playCorrectTune, playIncorrectTune } = useTune();
  const feedBack = useHookstate<{ isCorrect: boolean; text: string } | null>(
    null
  );
  const mainScreenState = useHookstate(mainScreenStore);
  const selectedTokens = useHookstate<string[] | null>(null);
  React.useEffect(() => {
    const words: string[] = [];
    state.question.correctWordsOrder.map((word, index) => {
      words.push(word.isHidden.get() ? "____" : word.text.get());
    });
    selectedTokens.set(words);
  }, [quiz]);

  const actions = {
    selectToken: (token: string) => {
      // remove from tokens
      state.question.tokens.set((p) => p.filter((t) => t !== token));
      //  replace '___' with token
      const words = selectedTokens.get()!;
      const newWords = words.map((word) => {
        if (word === "____") {
          return token;
        }
        return word;
      });
      selectedTokens.set(newWords);
      // isAnswered
      state.question.isAnswered.set(true);
    },
    removeToken: (token: string) => {
      // replace with '____' in selectedTokens
      const words = selectedTokens.get()!;
      const newWords = words.map((word) => {
        if (word === token) {
          return "____";
        }
        return word;
      });
      selectedTokens.set(newWords);
      // add to tokens
      state.question.tokens.set((p) => shuffleArray([...p, token]));
    },
    checkAnswer: () => {
      const words = selectedTokens.get()!;
      const correctWords = state.question.correctWordsOrder.map((word) => {
        return word.text.get();
      });
      if (words.join(" ") === correctWords.join(" ")) {
        feedBack.set({ isCorrect: true, text: "أحسنت" });
        playCorrectTune();
        // go to next quiz after 3 seconds
        setTimeout(() => {
          mainScreenState.currentQuizIndex.set((p) => p + 1);
        }, 3000);
        mainScreenState.score.set((p) => p + 1);
      } else {
        feedBack.set({
          isCorrect: false,
          text: `الترتيب الصحيح هو: ${correctWords.join(" ")}`,
        });
        playIncorrectTune();
        // go to next quiz after 3 seconds
        setTimeout(() => {
          mainScreenState.currentQuizIndex.set((p) => p + 1);
        }, 3000);
      }
    },
    reset: () => {
      selectedTokens.set(null);
    },
  };
  // renders
  const renders = {
    renderHeader: () => {
      return (
        <CardHeader>
          <CardTitle>{state.question.text.get()}</CardTitle>
          <CardDescription>
            <TonePlayerButton url={state.question.audioFile.get()} />
          </CardDescription>
        </CardHeader>
      );
    },
    renderQuestion: () => {
      return (
        <CardContent>
          {selectedTokens.get()?.map((word, index) => (
            <Button
              onClick={() => actions.removeToken(word)}
              variant="outline"
              key={index}
              className="mr-2"
            >
              {word}
            </Button>
          ))}
        </CardContent>
      );
    },
    renderTokens: () => {
      return (
        <CardContent>
          {state.question.tokens.map((token, index) => (
            <Button
              key={index}
              onClick={() => actions.selectToken(token.get())}
              className="mr-2 mb-2"
            >
              {token.get()}
            </Button>
          ))}
        </CardContent>
      );
    },
  };
  //   actions
  return (
    <Card className="flex flex-col gap-6 text-right" dir="rtl">
      <CardHeader>{renders.renderHeader()}</CardHeader>
      <CardContent>{renders.renderQuestion()}</CardContent>
      <CardContent>{renders.renderTokens()}</CardContent>
      <CardFooter className="flex justify-center">
        <Button disabled={!state.question.isAnswered.get()} onClick={actions.checkAnswer} className="w-2/3">تأكد</Button>
        
      </CardFooter>
    </Card>
  );
}
