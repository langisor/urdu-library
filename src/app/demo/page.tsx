"use client";
import quizzesData from "./quiz-w1b/quiz-w1b.json";
import { QuizW1bItem } from "../mondly/category/quizzer/_components/definitions";
import QuizW1b from "./quiz-w1b/quiz-w1b";

const data=quizzesData as QuizW1bItem[];
 

export default   function QuizW1bPage() {


  return  <QuizW1b quizData={data[1]} />
}
