import { getAudioUrl, getImageUrl, shuffleArray } from "./helpers";
import { Question } from "./types";
import * as QuizTypes from "./definitions";

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
    t.raw.text
  })
  const question = {
    id: quizItem.id,
    audioFile: quizItem.sols[0].key,
    text: quizItem.sols[0].text,
    correctAnswer: quizItem.sols[1].text,
    tokens: shuffleArray(tokens)
  }
}

export  {
  convertF,
  convertT1
};