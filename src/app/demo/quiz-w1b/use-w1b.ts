"use client";
import {
  getAudioUrl,
  getImageUrl,
  shuffleArray,
} from "../../mondly/category/quizzer/_components/helpers-types";
import {
  Feedback,
  QuizW1bItem,
} from "../../mondly/category/quizzer/_components/definitions";
import { useHookstate, type State } from "@hookstate/core";

interface Token {
  id: string;
  text: string;
}
function convertW1b(quizItem: QuizW1bItem) {
  const _correctTokensOrder: Token[] = [];
  for (let item of quizItem.ord) {
    let token = quizItem.tokens.find((t) => t.key === item);
    if (token) {
      _correctTokensOrder.push({
        id: token.key,
        text: token.text,
      });
    }
  }
  const audioFile = getAudioUrl(quizItem.sols[0].key);
  const image = getImageUrl(quizItem.sols[1].image!);
  const wordText = quizItem.sols[0].text;
  const shuffledTokens = shuffleArray(_correctTokensOrder);

  return {
    wordText,
    audioFile,
    image,
    availableTokens: shuffledTokens,
    correctTokensOrder: [..._correctTokensOrder],
  };
}

export function useQuizW1b(quizItem: QuizW1bItem) {
  const { wordText, audioFile, image, availableTokens, correctTokensOrder } =
    useHookstate(convertW1b(quizItem));
  const selectedTokens = useHookstate<Token[]>([]);

  // functions
  const handleAvailableTokensClick = (token: Token) => {
    const newSelectedToken = new Set<Token>(
      Array.from(
        selectedTokens.get({
          noproxy: true,
        })
      )
    );
    const newAvailableTokens = new Set<Token>(
      Array.from(availableTokens.get({ noproxy: true }))
    );
    // add to newSelectedTokens
    newSelectedToken.add(token);
    newAvailableTokens.delete(token);
    availableTokens.set(Array.from(newAvailableTokens));
    selectedTokens.set(Array.from(newSelectedToken));
  };
  const handleSelectedTokenClick = (token: Token) => {
    const newSelectedToken = new Set<Token>(
      Array.from(selectedTokens.get({ noproxy: true }))
    );
    const newAvailableTokens = new Set<Token>(
      Array.from(availableTokens.get({ noproxy: true }))
    );
    // add to availableTokens
    newSelectedToken.add(token);
    newAvailableTokens.delete(token);

    // update
    console.log("Available Tokens", newAvailableTokens);
    selectedTokens.set(Array.from(newSelectedToken));
    availableTokens.set(Array.from(newAvailableTokens));
  };

  return {
    quizActions: {
      handleAvailableTokensClick,
      handleSelectedTokenClick,
    },
    staticData: {
      wordText,
      audioFile,
      image,
      correctTokensOrder,
    },
    interactiveData: {
      selectedTokens: Array.from(selectedTokens),
      availableTokens: Array.from(availableTokens),
    },
  };
}
