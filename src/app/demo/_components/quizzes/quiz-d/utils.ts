import { QuizDItem, Question } from "./types"
import { getAudioUrl, getImageUrl, shuffleArray } from "../helpers";
export function convertToQuestions(quizItem: QuizDItem): Question[] {
  const questions = quizItem.alts.map((alt, index) => ({
    id: alt.audio_updated_at,
    audioFile: getAudioUrl(alt.key),
    text: alt.text,
    image: getImageUrl(alt.image),
    phonetic: alt.phonetic,
    correctAnswer: quizItem.sols[index].text,
    options: shuffleArray(quizItem.sols.map((sol) => sol.text)),
  }));

  return questions;
}