"use client";

import { useHookstate, State } from "@hookstate/core";
import { QuizRItem } from "../../definitions";
import { Feedback, getAudioUrl } from "../../helpers-types";
import { useTune } from "@/hooks/use-tone";

interface UseQuizRProps {
  quizData: QuizRItem;
}
export function useQuizR({ quizData }: UseQuizRProps) {
  const selectedTokens = useHookstate<string[]>([]);

  const handleTokenClick = (tokenKey: string) => {
    selectedTokens.set((p) => [...p, tokenKey]);
  };

  const handleRemoveToken = (index: number) => {
    selectedTokens.set((p) => p.filter((_, i) => i !== index));
  };

  const handleConfirm = (feedbackState: State<Feedback>) => {
    const correct =
      selectedTokens.get().length === quizData.ord.length &&
      selectedTokens.every((key, index) => key.get() === quizData.ord[index]);
    if (correct) {
      feedbackState.isCorrect.set(true);
      feedbackState.isAnswered.set(true);
      feedbackState.message.set("الإجابة صحيحة");
      playCorrectTune();
    } else {
      feedbackState.isCorrect.set(false);
      feedbackState.isAnswered.set(true);
      feedbackState.message.set(
        "خطاء، الإجابة الصحيحة: " + quizData.sols[0].text
      );
      playIncorrectTune();
    }
  };

  const handleReset = (feedbackState: State<Feedback>) => {
    selectedTokens.set([]);
    feedbackState.isAnswered.set(false);
    feedbackState.isCorrect.set(false);
    feedbackState.message.set("");
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

  const { playCorrectTune, playIncorrectTune } = useTune();

  return {
    handlers: {
      handleTokenClick,
      handleConfirm,
      handleReset,
      getTokenText,
      handleRemoveToken,
    },
    interactive: {
      availableTokens,
      selectedTokens,
    },
    staticData: {
      text,
      audioFile,
      answer,
    },
  };
}
