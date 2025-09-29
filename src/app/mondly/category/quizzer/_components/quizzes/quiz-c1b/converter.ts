import { getAudioUrl, getImageUrl, shuffleArray } from "../../helpers-types";
import * as QuizTypes from "../../definitions";

export type Word ={
  word_key:string;
  word_text:string

}
export const convertC1b = (quizItem: QuizTypes.QuizC1bItem) => {
  const questionText = {
    audioFile: getAudioUrl(quizItem.sols[0].key),
    text: quizItem.sols[0].text,
  };
  const fullAnswer = quizItem.sols[1].text;
  const template_sentence = [];
  for (let i = 0; i < quizItem.ord.length; i++) {
    const word = quizItem.tokens.find((w) => w.key === quizItem.ord[i]);
    const isHidden = word?.key === quizItem.completeToken;
    template_sentence.push({
      word_key: word?.key,
      word_text: word?.text,
      isHidden: isHidden,
    });
  }
  const words_banks:Word[] = quizItem.tokens.map((word) => {
 
    return {
      word_key: word.key,
      word_text: word.raw.text,
    };
  });

  return {
    questionText,
    fullAnswer,
    template_sentence,
    words_banks: shuffleArray(words_banks),
  };
};
