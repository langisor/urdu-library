"use client";
 
import { useHookstate, State } from "@hookstate/core";
import { QuizRItem } from "../../definitions";
import { getAudioUrl } from "../../helpers-types";

interface UseQuizRProps {
  quizData: QuizRItem;
}
export function useQuizR({ quizData }: UseQuizRProps) {
  const selectedTokens = useHookstate<string[]>([]);
  const showResult = useHookstate(false);
  const isCorrect = useHookstate(false);

  const handleTokenClick = (tokenKey: string) => {
    if (showResult) return;
    selectedTokens.set((p) => [...p, tokenKey]);
  };

  const handleRemoveToken = (index: number) => {
    if (showResult) return;
    selectedTokens.get().filter((_, i) => i !== index);
  };

  const handleConfirm = () => {
    const correct =
      selectedTokens.get().length === quizData.ord.length &&
      selectedTokens.every((key, index) => key.get() === quizData.ord[index]);
    isCorrect.set(correct);
    showResult.set(true);
  };

  const handleReset = () => {
    selectedTokens.set((p) => []);
    showResult.set(false);
    isCorrect.set(false);
  };

  const getTokenText = (key: string) => {
    return quizData.tokens.find((t) => t.key === key)?.text || "";
  };

  const availableTokens = quizData.tokens.filter(
    (token) => !selectedTokens.get().includes(token.key)
  );
  const text = quizData.sols[0].text;
  const audioFile = getAudioUrl(quizData.sols[0].key);
  const answer = quizData.sols[0].text;

  return {
    handlers: {
      handleTokenClick,
      handleConfirm,
      handleReset,
      getTokenText,
      handleRemoveToken
    },
    interactive: {
     availableTokens,
      selectedTokens,
      showResult,
      isCorrect,
    },
    staticData: {
      text,
      audioFile,
      answer,
    },
  };
}
