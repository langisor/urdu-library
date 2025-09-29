"use client";
import { QuizC1bItem } from "../../definitions";
import { convertC1b  } from "./converter";
import { useHookstate, State } from "@hookstate/core";
import { RefreshCcw, CheckCircle, XCircle } from "lucide-react";

import { useTune } from "@/hooks/use-tone";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "../../loading-spinner";
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
import { Feedback } from "../../helpers-types";
import * as React from "react";



interface Word {
  word_key: string;
  word_text: string;
}

interface SentenceTemplateWord extends Word {
  isHidden: boolean;
}

interface QuizC1bProps {
  quiz: QuizC1bItem;
  quizzerFeedback: State<Feedback>;
  onNextQuiz: () => void;
}
export default function QuizC1b({
  quiz,
  quizzerFeedback,
  onNextQuiz,
}: QuizC1bProps) {
  const quizState = useHookstate(() => convertC1b(quiz));

  // state
  // State to hold the user's selected word for the blank
  const selectedWord = useHookstate<Word | null>(null);
  // Determine the correct word key that should fill the blank
  const correctHiddenWord = React.useMemo(() => {
    return quizState.template_sentence.find((w) => w.isHidden);
  }, []);

  // renders
  const renderQuestion = () => {
    return (
      <div className="flex flex-col gap-2">
        <CardTitle className="text-md">اكمل الفراغ لترجمة الجملة</CardTitle>
        <Card className="px-2 m-1   border-0 italic font-bold bg-gradient-to-l from-blue to-green-50">
          <CardContent>{quizState.questionText.text.get()}</CardContent>
        </Card>
      </div>
    );
  };
 
  const renderSentence = () => {
    const sentence = quizState.template_sentence;
    return (
      <Card className="flex flex-row items-center gap-2">
        {sentence.get().map((word, index) =>
          word.isHidden ? (
            <Button
              variant={"ghost"}
              key={index}
              className="w-border-0 border-b-2"
            >
              {word.word_text}
            </Button>
          ) : (
            <Button  variant={"ghost"}>
              {word.word_text}
            </Button>
          )
        )}
      </Card>
    );
  };

  const renderWordsBank = () => {
    const wordsBank = quizState.words_banks

    return (
      <Card className="flex flex-row items-center gap-2">
        {wordsBank.map((word) => {
          return (
            <Button
              key={word.get().word_key}
              onClick={() => selectedWord.set((p) => p)}
            >
              {word.get().word_text}
            </Button>
          );
        })}
      </Card>
    );
  };

  const renderCheckButton=()=>{

  }
  const setSelectedWord = (word: Word) => {
    // remove from words_bank
    selectedWord.set({
      word_key: word.word_key,
      word_text: word.word_text,
    });
  };
  console.log("C1b quiz: ", quizState.words_banks.get());
 console.log("Selected word",selectedWord.get())
  return (
    <div dir="rtl" className="text-right naskh-text px-2 flex flex-col gap-2">
      <div> {renderQuestion()}</div>
      <div>{renderSentence()}</div>
      <div>{renderWordsBank()}</div>
    </div>
  );
}
