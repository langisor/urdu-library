"use client";
import { QuizRItem } from "../../_hooks/definitions";
// import { convertR } from "../../_hooks/converters";
import { useHookstate, State } from "@hookstate/core";
import { useMainScreen } from "../screens/use-main-screen";
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

function convertR(quizItem: QuizRItem) {
  const tokens = quizItem.tokens.map((token, index) => {
    return {
      id: "token" + token.key + index,
      text: token.text,
    };
  });
  const correctOrder = quizItem.ord.map((ord, index) => {
    const token = quizItem.tokens.filter((t) => t.key === ord);
    return {
      id: "order" + token[0].key + index,
      text: token[0].raw.text,
    };
  });
  const question = {
    id: quizItem.id,
    audioFile: getAudioUrl(quizItem.sols[0].key),
    text: quizItem.sols[0].text,
    correctAnswer: quizItem.sols[1].text,
    correctOrder: correctOrder,
    tokens: shuffleArray(tokens),
    isAnswered: false,
  };
  return question;
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
  const { state: mainScreenState, actions: mainScreenActions } =
    useMainScreen();

   
  const actions = {
    selectToken: (token: SimpleToken) => {
      //    add token to selectedTokens and remove it from initialTokens
      selectedTokens.set((p) => [...p, token]);
      initialTokens.set((p) => p.filter((t) => t.id !== token.id));
    },
    checkAnswer: () => {
      const selectedTokensIds = selectedTokens.get().map((t) => t.id);
      //   compare selectedTokensIds with state.question.correctOrder
      let isCorrect: boolean = false;
      for (let i = 0; i < selectedTokensIds.length; i++) {
        // check if one or more of selectedTokensIds are not in state.question.correctOrder
        if (
          !state.question.correctOrder.some(
            (token) => token.id.get() === selectedTokensIds[i]
          )
        ) {
          isCorrect = false;
          break;
        }

        isCorrect = true;
      }
      if (isCorrect) {
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
          text: "الترتيب الصحيح هو: " + state.question.correctAnswer.get(),
        });
        playIncorrectTune();
        // go to next quiz after 3 seconds
        setTimeout(() => {
          mainScreenActions.nextQuiz();
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
    const tokens =  state.question.tokens.get();

    return tokens.map((token) => (
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
    </Card>
  );
}
