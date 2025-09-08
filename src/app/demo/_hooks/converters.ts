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
function convertF(quizItem: QuizTypes.QuizFItem): Question[] {
  const getOptions = (quizItem: QuizTypes.QuizFItem) => {
    return quizItem.alts.map((alt, index) => ({
      text: quizItem.sols[index].text,
      image: getImageUrl(alt.image),
      phonetic: alt.phonetic,
    }));
  };
  const questions = quizItem.alts.map((alt, index) => ({
    id: quizItem.id,
    audioFile: getAudioUrl(alt.key),
    text: alt.text,
    correctAnswer: quizItem.sols[index].text,
    isAnswered: false,
    options: shuffleArray(getOptions(quizItem)),
  }));

  return questions;
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
