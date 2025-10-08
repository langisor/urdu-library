"use client";
import { convertQ } from "./convertQ";
import { useHookstate, type State } from "@hookstate/core";
import { useStep } from "@/hooks/use-step";
import { QuizQItem, type Feedback } from "../../definitions";
import { useTune } from "@/hooks/use-tone";
export function useQ(quizData: QuizQItem) {
  const questions = useHookstate(convertQ(quizData));
  const [step, actions] = useStep(questions.length);
  const currentQuestion = questions[step];
  const selectedOption = useHookstate("");
  const feedback = useHookstate({
    isCorrect: false,
    score: 0,
    message: "",
  });
  const { playCorrectTune, playIncorrectTune } = useTune();
  const selectOption = (optionId: string) => {
    selectedOption.set(optionId);
  };
  const isCorrect = () => {
    return selectedOption.value === currentQuestion.id.get();
  };
  const isSelected = selectedOption.value !== "";
  const handleNext = () => {
    if (isCorrect()) {
      setTimeout(() => {
        feedback.set({
          isCorrect: true,
          score: feedback.score.get() + 1,
          message: "Correct",
        });
      }, 1000);
      playCorrectTune();
    } else {
      setTimeout(() => {
        feedback.set({
          isCorrect: false,
          score: feedback.score.get(),
          message: "Incorrect",
        });
        playIncorrectTune();
      }, 1000);
    }

    if (actions.canGoToNextStep) {
      actions.goToNextStep();
      reset();
    } else {
      return null;
    }
  };
  const reset = () => {
    selectedOption.set("");
    feedback.set({
      isCorrect: false,
      score: 0,
      message: "",
    });
    actions.reset();
  };
  return {
    actions: {
      selectOption,
      handleNext,
      isCorrect,
      isSelected,
    },
    interactiveState: {
      currentQuestion,
      feedback,
      selectedOption,
      score: feedback.score.get(),
    },
  };
}
