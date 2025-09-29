import { getAudioUrl, getImageUrl, shuffleArray } from "./helpers-types";
import { Question } from "./helpers-types";
import * as QuizTypes from "../_components/definitions";

function convertD(quizItem: QuizTypes.QuizDItem) {
  const options = quizItem.alts.map((alt, index) => {
    return {
      id: alt.key,
      text: quizItem.sols[index].text,
      image: getImageUrl(alt.image),
    };
  });
  const questions = quizItem.alts.map((alt, index) => {
    return {
      id: alt.key,
      audioFile: getAudioUrl(alt.key),
      text: alt.text,
      correctAnswer: quizItem.sols[index].text,
      isAnswered: false,
      options: shuffleArray(options),
    };
  });
  return shuffleArray(questions);
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
  const options = quizItem.alts.map((alt, index) => {
    return {
      id: alt.key,
      text: quizItem.sols[index].text,
      image: getImageUrl(alt.image),
    };
  });
  const questions = quizItem.alts.map((alt, index) => {
    return {
      id: alt.key,
      audioFile: getAudioUrl(alt.key),
      text: alt.text,
      correctAnswer: quizItem.sols[index].text,
      isAnswered: false,
      options: shuffleArray(options),
    };
  });
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
    // remove dots and ? mark from correct answer
    correctAnswer: quizItem.sols[1].text.replace(/\./g, "").replace(/\؟/g, ""),

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


function convertQ(quizItem: QuizTypes.QuizQItem) {
  //  question from sols
  const questions = quizItem.sols.map((sol, index) => {
    return {
      id: sol.key,
      audioFile: getAudioUrl(sol.key),
      text: sol.text,
      correctAnswerId: quizItem.alts[index].key,
      isAnswered: false,
      options: shuffleArray(
        quizItem.alts.map((alt) => {
          return {
            id: alt.key,
            text: alt.text,
          };
        })
      ),
    };
  });
  return shuffleArray(questions);
}
function convertQb(quizItem: QuizTypes.QuizQbItem) {
  const questions = quizItem.sols.map((sol, index) => {
    return {
      id: sol.key,
      audioFile: getAudioUrl(sol.key),
      text: sol.text,
      correctAnswerId: quizItem.alts[index].key,
      isAnswered: false,
      options: shuffleArray(
        quizItem.alts.map((alt) => {
          return {
            id: alt.key,
            text: alt.text,
          };
        })
      ),
    };
  });
  return shuffleArray(questions);
}

function convertR(quizItem: QuizTypes.QuizRItem) {
  const tokens = quizItem.tokens.map((token, index) => {
    return {
      id: "token" + token.key + index,
      text: token.text,
    };
  });
  const correctOrder = quizItem.ord.map((ord, index) => {
    const token = quizItem.tokens.filter((t) => t.key === ord);
    return {
      id: "order" + token[0].key + index,
      text: token[0].raw.text,
    };
  });
  const question = {
    id: quizItem.id,
    audioFile: getAudioUrl(quizItem.sols[0].key),
    text: quizItem.sols[0].text,
    correctAnswer: quizItem.sols[1].text,
    correctOrder: correctOrder,
    tokens: shuffleArray(tokens),
    isAnswered: false,
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

  convertD,
};
