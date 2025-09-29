"use client";
import { QuizC1bItem } from "../definitions";
import { convertC1b } from "../converters";
import { useHookstate, State } from "@hookstate/core";

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
import { Feedback } from "../helpers-types";

interface QuizC1bState {
  question: QuizC1bItem;
  quizzerFeedback: State<Feedback>;
  onNextQuiz: () => void;
}
export default function QuizC1b({
  quiz,
  quizzerFeedback,
  onNextQuiz,
}: {
  quiz: QuizC1bItem;
  quizzerFeedback: State<Feedback>;
  onNextQuiz: () => void;
}) {
  const state = useHookstate({
    question: convertC1b(quiz),
  });
  const { playCorrectTune, playIncorrectTune } = useTune();

  React.useEffect(() => {
    const words: string[] = [];
    state.question.correctWordsOrder.map((word, index) => {
      words[index] = word.isHidden.get() ? "____" : word.text.get();
    });
    selectedTokens.set(shuffleArray(words));
  }, [quiz]);
  const selectedTokens = useHookstate<string[] | null>(null);
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
      //is Selected
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
        quizzerFeedback.set({
          isAnswered: true,
          isCorrect: true,
          message: "أحسنت",
        });
        playCorrectTune();
      } else {
        playIncorrectTune();
      }
    },
    reset: () => {
      quizzerFeedback.set({
        isAnswered: false,
        isCorrect: null,
        message: "Answer your question",
      });
      selectedTokens.set(null);
      state.set({
        question: convertC1b(quiz),
      });
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
    <Card className="flex flex-col gap-6 arabic-text">
      <div>{renders.renderHeader()}</div>
      <div>{renders.renderQuestion()}</div>
      <div>{renders.renderTokens()}</div>
      <div className="flex justify-center">
        <Button
          disabled={quizzerFeedback.isAnswered.get()}
          onClick={actions.checkAnswer}
          className="w-2/3"
        >
          تأكد
        </Button>
      </div>
    </Card>
  );
}
