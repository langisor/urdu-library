"use client";
import { convertQ } from "./convertQ";
import { useHookstate, type State } from "@hookstate/core";
import { useStep } from "@/hooks/use-step";
import { QuizQItem, type Feedback } from "../../definitions";
import { useTune } from "@/hooks/use-tone";
export function useQ(quizData: QuizQItem) {
  const questions = useHookstate(convertQ(quizData));
  const [step, actions] = useStep(questions.length);
  const currentQuestion = questions[step-1];
  const { playCorrectTune, playIncorrectTune } = useTune();

  const selectedOption = useHookstate("");

  const selectOption = (optionId: string) => {
    selectedOption.set(optionId);
  };
  const isCorrect = () => {
    console.log(selectedOption.value, currentQuestion.id.get());
    return selectedOption.value === currentQuestion.id.get();
  };
  const isSelected =()=> selectedOption.value !== "";
  const handleNext = (feedback: State<Feedback>) => {
    if(!isSelected()) return;
    if (isCorrect()) {
      playCorrectTune();
      setTimeout(() => {
        feedback.isCorrect.set(true);
        feedback.message.set("أحسنت");
      }, 1000);
    } else {
      playIncorrectTune();
      setTimeout(() => {
        feedback.isCorrect.set(false);
        feedback.message.set(
          "خطاء، الإجابة الصحيحة هي " + currentQuestion.text.get()
        );
      }, 1000);
    }
    if (actions.canGoToNextStep) {
      selectedOption.set("");
      feedback.isCorrect.set(null);
      feedback.message.set("اختر الإجابة الصحيحة ثم اضغط على تأكد");
      actions.goToNextStep();
    } else {
      feedback.isCorrect.set(null);
      feedback.message.set("اختر الإجابة الصحيحة ثم اضغط على تأكد");
      feedback.isAnswered.set(true);

    }
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
      selectedOption,
    },
  };
}
