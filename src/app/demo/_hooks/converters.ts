import { getAudioUrl, getImageUrl, shuffleArray } from "./helpers";
import { Question } from "./types";
import * as QuizTypes from "./definitions";

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
    audioFile: getAudioUrl(quizItem.sols[0].key),
    text: quizItem.sols[0].text,
    correctWordsOrder: quizItem.ord.map((ord) => {
      const token = quizItem.tokens.find((t) => t.key === ord);
      return {
        id: token!.key,
        text: token!.raw.text,
        isHidden: token!.key === quizItem.completeToken,
      };
    }),

    tokens: quizItem.tokens.map((token) => {
      return token.raw.text;
    }),
    isAnswered: false,
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
  //  correct order from ord and sols
  const correctOrder = quizItem.ord.map((ord) => {
    const token = quizItem.tokens.filter((t) => t.key === ord);
    return {
      id: token[0].key,
      text: token[0].raw.text,
    };
  });
  // tokens from tokens
  const tokens = quizItem.tokens.map((token) => {
    return {
      id: token.key,
      text: token.text,
    };

  });
  const question = {
    id: quizItem.id,
    audioFile: getAudioUrl(quizItem.sols[0].key),
    text: quizItem.sols[0].text,
    correctOrder: correctOrder,
    tokens: tokens,
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
  convertC1b,
  convertD,
};
