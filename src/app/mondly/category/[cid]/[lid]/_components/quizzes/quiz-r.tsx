"use client";
import { QuizRItem } from "../../_hooks/definitions";
import { convertR } from "../../_hooks/converters";
import { useHookstate, State } from "@hookstate/core";
import { useGlobalState } from "../screens/_stores/global-state";
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
import { getAudioUrl, shuffleArray } from "@/lib/helpers";
import * as React from "react";

// Interface for the simplified output structure
interface SimpleToken {
  id: string;
  text: string;
}

interface SimpleQuizData {
  id: number;
  text: string;
  correctAnswer: string;
  correctOrder: SimpleToken[];
  tokens: SimpleToken[];
  isAnswered: boolean;
}


export default function QuizR({ quiz }: { quiz: QuizRItem }) {
  const state = useHookstate({
    question: convertR(quiz),
  });
  const { playCorrectTune, playIncorrectTune } = useTune();
  const selectedTokens = useHookstate<SimpleToken[]>([]);

  const initialTokens = useHookstate<SimpleToken[]>([]);

  const feedBack = useHookstate<{ isCorrect: boolean; text: string } | null>(
    null
  );
   const mainScreenState = useGlobalState();

  const actions = {
    selectToken: (token: SimpleToken) => {
      //   remove from question.tokens
      selectedTokens.set((p) => [...p, token]);
    },
    checkAnswer: () => {
      // get selectedTokens text and remove extra spaces and dots
      const selectedTokensText = selectedTokens
        .get()
        .map((t) => t.text)
        .join(" ")
        .replace(/\./g, "");
      console.log("selectedTokensText", selectedTokensText);
      // get correctOrder text
      const correctOrderText = state.question.correctOrder
        .get()
        .map((t) => t.text)
        .join(" ")
        .replace(/\./g, "");

      console.log("correctOrderText", correctOrderText);
      // compare selectedTokensText with correctOrderText
      if (selectedTokensText === correctOrderText) {
        feedBack.set({ isCorrect: true, text: "أحسنت" });
        playCorrectTune();
        // go to next quiz after 3 seconds
        setTimeout(() => {
          mainScreenState.nextQuiz();
        }, 3000);
        mainScreenState.setScore(mainScreenState.getScore() + 1);
      } else {
        feedBack.set({
          isCorrect: false,
          text: "الترتيب الصحيح هو: " + state.question.correctAnswer.get(),
        });
        playIncorrectTune();
        // go to next quiz after 3 seconds
        setTimeout(() => {
          mainScreenState.nextQuiz();
        }, 3000);
      }
    },
    reset: () => {
      selectedTokens.set([]);
      feedBack.set(null);
      state.question.set(convertR(quiz));
    },
  };
  const renderInitialTokens = () => {
    const tokens = state.question.tokens.get();
    // remove selected tokens from tokens
    const filteredTokens = tokens.filter(
      (token) => !selectedTokens.get().some((t) => t.id === token.id)
    );
    return filteredTokens.map((token) => (
      <Button key={token.id} onClick={() => actions.selectToken(token)}>
        {token.text}
      </Button>
    ));
  };
  const renderSelectedTokens = () => {
    const tokens = selectedTokens.get();

    return tokens.map((token) => (
      <Button key={token.id} onClick={() => actions.selectToken(token)}>
        {token.text}
      </Button>
    ));
  };
  return (
    <Card className="grid grid-cols-2 gap-2">
      <CardContent className="flex flex-col">
        <Card>
          <CardContent>
            <JsonViewerComponent data={quiz} />
          </CardContent>
        </Card>
        <Card>
          <JsonViewerComponent data={state.question.get()} />
        </Card>
      </CardContent>

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
                {renderSelectedTokens()}
              </CardContent>
            </Card>

            {/* available tokens area */}
            <Card className="flex justify-start gap-3 flex-wrap ">
              <CardContent>{renderInitialTokens()}</CardContent>
            </Card>
            {/* actions buttons */}
            <Card className="flex justify-end gap-3">
              <CardContent>
                <Button onClick={actions.checkAnswer} disabled={selectedTokens.get().length === 0}>تأكد</Button>
                <Button onClick={actions.reset} disabled={selectedTokens.get().length === 0}>مسح</Button>
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
    </Card>
  );
}
