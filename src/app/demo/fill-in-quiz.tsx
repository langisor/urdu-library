"use client";

import { QuizC1bItem } from "@/app/mondly/category/quizzer/_components/definitions";
import { useHookstate } from "@hookstate/core";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import quizData from "./c1b.json";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";

const quiz: QuizC1bItem = quizData;

type Token = {
  index: number;
  text: string;
  isCorrect: boolean;
};
type Word = {
  word_key: string;
  token: Token;
};



const convertC1b = (quiz: QuizC1bItem) => {
  const sentence:Word[]=[]
  const options:Word[]=[]
  const sourceText=quiz.sols[0].text;
  const targetText=quiz.sols[1].text;



  
 
export default function FillInQuiz() {
  const fillInQuizState = useHookstate(convertC1b(quiz));

  const selectedOption = useHookstate<string | null>(null);
  const correctOption = useHookstate<string | null>(null);

  return (
    <div className="flex flex-col gap-2 text-right  " >
      <div> demo</div>
     <JsonViewerComponent data={quiz} />
    </div>
  );
}
