"use client";
import { QuizC1bItem } from "../mondly/category/quizzer/_components/definitions";
import { Card, CardContent } from "@/components/ui/card";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import { useHookstate, State } from "@hookstate/core";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { getAudioUrl } from "@/app/mondly/category/quizzer/_components/helpers-types";

type Role = "blank" | "fixed" | "option";
type Token = {
  key: string;
  rawText: string;
  role: Role;
};

type UseQuizC1bReturn = {
  sentenceMask: Token[];
  wordsBank: Token[];
  audioUrl: string;
  sourceText: string;
  targetText: string;
};

const convertC1b = (quizData: QuizC1bItem) => {
  const ord = quizData.ord;
  const tokens = quizData.tokens.map((token) => {
    return {
      key: token.key,
      rawText: token.raw.text,
      role: "option" as Role,
    };
  });
  //  update role for blank token
  const blankToken = tokens.find((t) => t.rawText === "_____");
  if (blankToken) {
    blankToken.key = blankToken.key;
    blankToken.rawText = blankToken.rawText;
    blankToken.role = "blank" as Role;
  }

  const sentenceMask: Token[] = [];
  ord.forEach((tokenKey) => {
    const token = tokens.find((t) => t.key === tokenKey);
    if (token!.key === quizData.completeToken) {
      sentenceMask.push(blankToken!);
    } else {
      sentenceMask.push(token!);
    }
  });

  const wordsBank: Token[] = [];
  tokens.forEach((token) => {
    if (token.role === "option") {
      wordsBank.push(token);
    }
  });

  // fill audio file from sols[0]
  const audioUrl = getAudioUrl(quizData.sols[0].key);

  return {
    sentenceMask,
    wordsBank,
    audioUrl,
    sourceText: quizData.sols[0].text,
    targetText: quizData.sols[1].text,
  };
};

const useQuizC1b = (quizData: QuizC1bItem) => {
  const state = useHookstate(convertC1b(quizData));

  const sentenceMaskState = state.sentenceMask;
  const wordsBankState = state.wordsBank;
  const actions = {
    checkAnswer: (answer: string) => {},
    setOption: (optionKey: string) => {
      // find option in wordsBankState
      const wordBankOption = wordsBankState.find(
        (token) => token.key.get() === optionKey
      );
      if (wordBankOption) {
        // find blank in sentenceMaskState
        const blank = sentenceMaskState.find(
          (token) => token.role.get() === "blank"
        );
        const option = sentenceMaskState.find(
          (token) => token.key.get() === optionKey
        );
        if (blank) {
          // remove option from wordsBankState
          wordsBankState.set((oldArray) =>
            oldArray.filter((item) => item.key !== optionKey)
          );
          blank.role.set("option");
          blank.key.set(optionKey);
          blank.rawText.set(wordBankOption!.rawText.get());
        }
        if (option) {
          // add option to wordsBankState
          state.wordsBank.set((p) => [
            ...p,
            { key: optionKey, rawText: option!.rawText.get(), role: "option" },
          ]);
        }
      }
    },
  };

  return { state, actions };
};

export default function QuizC1b({ quizData }: { quizData: QuizC1bItem }) {
  const { state, actions } = useQuizC1b(quizData);

  const sentenceWords = state.sentenceMask;
  const wordsBank = state.wordsBank;

  const renderSentence = () => {
    return sentenceWords.map((word) => {
      return (
        <Button variant="outline" disabled key={word.key.get()}>
          {word.rawText.get()}
        </Button>
      );
    });
  };

  const renderOptions = () => {
    return wordsBank.map((word) => {
      return (
        <Button
          onClick={() => actions.setOption(word.key.get())}
          key={word.key.get()}
        >
          {word.rawText.get()}
        </Button>
      );
    });
  };

  const resetQuiz = () => {
    // const { state: newState } = useQuizC1b(quizData);
    // setState(newState);
  };

  return (
    <Card className="flex flex-col gap-4 text-right" dir="rtl">
      <Card>
        <CardContent>{renderSentence()}</CardContent>
        <CardContent>{renderOptions()}</CardContent>
      </Card>
      <CardContent>{<JsonViewerComponent data={state.get()} />}</CardContent>
    </Card>
  );
}
