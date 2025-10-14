"use client";
import quizzesData from "./quiz-w1b/quiz-w1b.json";
import { QuizW1bItem } from "../mondly/category/quizzer/_components/definitions";
import QuizW1b from "./quiz-w1b/quiz-w1b";
import {
  getAudioUrl,
  getImageUrl,
  shuffleArray,
} from "@/app/mondly/category/quizzer/_components/helpers-types";
import { useHookstate } from "@hookstate/core";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quizData = quizzesData as QuizW1bItem[];

interface TokenItem {
  id: string;
  text: string;
  isSelected: boolean;
}

const convertW1b = (quizItem: QuizW1bItem) => {
  const tokenItems: TokenItem[] = [];
  for (let item of quizItem.ord) {
    let token = quizItem.tokens.find((t) => t.key === item);
    if (token) {
      tokenItems.push({
        id: token.key,
        text: token.text,
        isSelected: false,
      });
    }
  }
  const audioFile = getAudioUrl(quizItem.sols[0].key);
  const image = getImageUrl(quizItem.sols[1].image!);
  const wordText = quizItem.sols[0].text;
  const availableTokens = shuffleArray(tokenItems);

  return {
    audioFile,
    image,
    wordText,
    availableTokens,
    tokenItems,
  };
};

const useQuizW1b = (quizItem: QuizW1bItem) => {
  const { audioFile, image, wordText, availableTokens, tokenItems } =
    useHookstate(convertW1b(quizItem));
  const selectedTokens = useHookstate([]);
  const moveToSelected = (token: TokenItem) => {
    const filteredTokens = [...availableTokens.get()].filter((item) => {
      return item.id !== token.id;
    });
    availableTokens.set(filteredTokens);
    selectedTokens.merge({ ...token });

    console.log("availableTookens", availableTokens.value);
    console.log("selectedTokens", selectedTokens.value);
  };

  return {
    actions: {
      moveToSelected,
    },
    data: {
      audioFile,
      image,
      wordText,
      availableTokens,
    },
  };
};

export default function QuizW1bPage() {
  const { actions, data } = useQuizW1b(quizData[0]);

  return (
    <Card className="flex flex-row gap-2 text-right urdu-text" dir="rtl">
      {data.availableTokens.get().map((item) => {
        return (
          <Button key={item.id} onClick={() => actions.moveToSelected(item)}>
            {item.text}
          </Button>
        );
      })}
    </Card>
  );
}
