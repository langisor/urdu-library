"use client";
import { QuizPItem } from "../../definitions";
import {
  shuffleArray,
  getAudioUrl,
  getImageUrl,
  Feedback,
} from "../../helpers-types";
import * as React from "react";
import { useHookstate, type State } from "@hookstate/core";
import { useStep } from "@/hooks/use-step";
import { useTune } from "@/hooks/use-tone";

type Answer = {
  id: string;
  text: string;
  image: string;
};
type Question = {
  id: string;
  audio: string;
  answers: Answer[];
};
export function convertP(quizData: QuizPItem) {
  const questions: Question[] = quizData.sols.map((sol) => {
    return {
      id: sol.key,
      audio: getAudioUrl(sol.key),

      answers: quizData.alts.map((alt) => {
        return {
          id: alt.key,
          text: alt.text,
          image: getImageUrl(alt.image),
        };
      }),
    };
  });
//  shuffle answers
  const shuffledQuestionAnswers=questions.map((question)=>{
    return {
      ...question,
      answers:shuffleArray([...question.answers]),
    }
  })
  return  shuffledQuestionAnswers 
}

interface UseQuizP {
  quizData: QuizPItem;
}

export function useQuizP({ quizData }: UseQuizP) {
  const questions = useHookstate(convertP(quizData));
  const [currentStep, actions] = useStep(questions.length);
  const { playCorrectTune, playIncorrectTune } = useTune();
  
  const currentQuestion=questions[currentStep];
  console.log("useQuizP, Current question", currentQuestion,
    "Current step", currentStep,
    
  );
  const nextQuestion = () => {
    // shuffle answers
   
    actions.goToNextStep();
  };
  const handleAnswer = (answerId: string, feedbackState: State<Feedback>) => {
    console.log(answerId);
    if (answerId === currentQuestion.id.get()) {
      playCorrectTune();
      setTimeout(() => {
        feedbackState.isCorrect.set(true);
        feedbackState.message.set("أحسنت");
      }, 1000);
    } else {
      playIncorrectTune();
      setTimeout(() => {
        feedbackState.isCorrect.set(false);
        feedbackState.message.set(
          "خطاء، الإجابة الصحيحة " + currentQuestion.id.get()
        );
      }, 1000);

      if (actions.canGoToNextStep) {
        nextQuestion();
      } else {
        feedbackState.isAnswered.set(true);
      }
    }
  };
 
  
  return {
    currentQuestion,
    handleAnswer,
  };
}
