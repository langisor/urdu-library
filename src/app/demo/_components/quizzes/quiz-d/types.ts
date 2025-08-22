export interface QuizDItem  {
 id: number;
 alts: Array<Alt>
 sols: Array<Sol>
 type: string
 lesson: number
 wordID: number
 modifiers: number
 alternates: Array<number>
}
 export interface Alt { 
   key: string
   text: string
   image: string
   phonetic: string
   audio_updated_at: number
   image_updated_at: number
}
 
 export interface Sol { 
   key: string
   text: string
   audio_updated_at: number
 }
 
export interface Question {
  id: number; // audio_updated_at
  audioFile: string;
  text: string;
  image: string;
  phonetic: string;
  correctAnswer: string;
  options: Array<string>; // sols
}
export type QuizDState = {
  currentQuestionIndex: number
  questions: Array<Question>
  score: number
  isComplete: boolean
}