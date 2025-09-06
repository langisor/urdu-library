import { getAudioUrl, getImageUrl, shuffleArray } from "@/lib/helpers";

export type QuizPItem = {
 id: number
 alts: Array<{
   key: string
   text: string
   image: string
   phonetic: string
   audio_updated_at: number
   image_updated_at: number
 }>
 sols: Array<{
   key: string
   text: string
   audio_updated_at?: number
 }>
 type: string
 lesson: number
 wordID: number
 modifiers: number
 alternates: Array<number>
}
export interface Question {
  id:number;
  audioFile:string;
  text:string;
  phonetic:string;
  correctAnswer:string;
  options:string[];
}

export type QuizPState = {
  questions:Question[];
  currentQuestionIndex:number;
  isComplete:boolean;
  feedback:{isCorrect:boolean;text:string}|null;
}
 
export function convertToQuestions(quizItem: QuizPItem): Question[] {
  const questions = quizItem.alts.map((alt, index) => ({
    id: alt.audio_updated_at,
    audioFile: getAudioUrl(alt.key),
    text: alt.text,
    phonetic: alt.phonetic,
    correctAnswer: quizItem.sols[index].text,
    options: shuffleArray(quizItem.sols.map((sol) => sol.text)),
  }));
  return shuffleArray(questions);
}