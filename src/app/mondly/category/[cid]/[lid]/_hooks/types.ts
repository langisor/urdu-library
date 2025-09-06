export interface Question {
  id: number;
  audioFile: string;
  text: string; //question
  correctAnswer: string; //sols
  phonetic?: string;

  isAnswered: boolean;
  options: Option[] | string[];
}
export interface Option {
  image: string;
  text: string;
  phonetic: string;
}

export type QuizState = {
  questions: Question[];
  currentQuestionIndex: number;
  isComplete: boolean;
  feedback: { isCorrect: boolean; text: string } | null;
};
