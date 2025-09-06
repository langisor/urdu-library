import { getAudioUrl, getImageUrl, shuffleArray } from "../helpers";
import { Question } from "./types";
import { QuizFItem } from "../definitions";

export function convertF(quizItem: QuizFItem): Question[] {
  const getOptions = (quizItem: QuizFItem) => {
    return quizItem.alts.map((alt, index) => ({
      text: quizItem.sols[index].text,
      image: getImageUrl(alt.image),
      phonetic: alt.phonetic,
    }));
  };
  const questions = quizItem.alts.map((alt, index) => ({
    id: alt.audio_updated_at,
    audioFile: getAudioUrl(alt.key),
    text: alt.text,
    correctAnswer: quizItem.sols[index].text,
    isAnswered: false,
    options: shuffleArray(getOptions(quizItem)),
  }));

  return questions;
}
