"use client";
 
import { useHookstate, State } from "@hookstate/core";
import { QuizRItem } from "../../definitions";
import { getAudioUrl } from "../../helpers-types";

interface UseQuizRProps {
  quizData: QuizRItem;
}
export function useQuizR({ quizData }: UseQuizRProps) {
  const selectedTokens = useHookstate<string[]>([]);
  const isCorrect = useHookstate(false);

  const handleTokenClick = (tokenKey: string) => {
     
  };

  const handleRemoveToken = (index: number) => {
    
  };

  const handleConfirm = () => {
 
  };

  const handleReset = () => {
 
  };

  const getTokenText = (key: string) => {
 
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
 
      isCorrect,
    },
    staticData: {
      text,
      audioFile,
      answer,
    },
  };
}
