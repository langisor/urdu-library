"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VocabularyItem } from "../_lib/types";
import { useQuiz } from "../_hooks/useQuiz";
interface QuizzerProps {
  vocs: VocabularyItem[];
}
export function Quizzer({ vocs }: QuizzerProps) {
  const { questions } = useQuiz({ vocs });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>ابدا التدرب على المفردات ({vocs.length})</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="w-full h-full overflow-y-scroll">
        <SheetTitle>Quiz</SheetTitle>
        <SheetDescription></SheetDescription>
        <Card>
          <CardContent>
            {questions.map((q) => (
              <div key={q.id}>
                <p>{q.queston}</p>
                <ul>
                  {q.options.map((option) => (
                    <li key={option}>
                      <span
                        className={
                          q.correctAnswer === option ? "text-green-500" : ""
                        }
                      >
                        {option}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
}
