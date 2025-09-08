import { getAudioUrl, getImageUrl, shuffleArray } from "./helpers";
import { Question } from "./types";
import * as QuizTypes from "./definitions";

function convertD(quizItem: QuizTypes.QuizDItem) {
  const question = {
    id: quizItem.id,
  };
  return question;
}

// Quiz F: return 2 questions
export interface QuestionF {
  id: number;
  audioFile: string;
  text: string; //question
  correctAnswer: string; //sols
  isAnswered: boolean;
  options: {
    text: string;
    image: string;
  }[];
}

function convertF(quizItem: QuizTypes.QuizFItem) {
  return quizItem.sols.map((sol, index) => {
    return {
      id: sol.key,
      audioFile: getAudioUrl(sol.key),
      text: sol.text,
      correctAnswer: quizItem.alts[index].text,
      isAnswered: false,
      options: quizItem.alts.map((alt) => {
        return {
          text: alt.text,
          image: getImageUrl(alt.image),
        };
      }),
    };
  });
}

function convertT1(quizItem: QuizTypes.QuizT1Item) {
  const tokens = quizItem.tokens.map((t) => {
    return t.raw.text;
  });
  const question = {
    id: quizItem.id,
    audioFile: getAudioUrl(quizItem.sols[0].key),
    text: quizItem.sols[0].text,
    // remove dots from correct answer
    correctAnswer: quizItem.sols[1].text.replace(/\./g, ""),

    tokens: shuffleArray(tokens),
  };
  return question;
}
function convertT1b(quizItem: QuizTypes.QuizT1bItem) {
  const tokens = quizItem.tokens.map((t) => {
    return t.raw.text;
  });
  const question = {
    id: quizItem.id,
    audioFile: getAudioUrl(quizItem.sols[0].key),
    text: quizItem.sols[0].text,
    // remove dots from correct answer
    correctAnswer: quizItem.sols[1].text.replace(/\./g, ""),
    tokens: shuffleArray(tokens),
  };
  return question;
}
function convertC1b(quizItem: QuizTypes.QuizC1bItem) {
  const question = {
    id: quizItem.id,
  };
  return question;
}

function convertQ(quizItem: QuizTypes.QuizQItem) {
  const question = {
    id: quizItem.id,
  };
  return question;
}
function convertQb(quizItem: QuizTypes.QuizQbItem) {
  const question = {
    id: quizItem.id,
  };
  return question;
}
function convertR(quizItem: QuizTypes.QuizRItem) {
  const question = {
    id: quizItem.id,
  };
  return question;
}

export {
  convertF,
  convertT1,
  convertT1b,
  convertQ,
  convertQb,
  convertR,
  convertC1b,
  convertD,
};
