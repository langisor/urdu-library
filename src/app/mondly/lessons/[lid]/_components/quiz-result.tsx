"use client";
import {
  Card,
  CardContent,
  CardHeader,
 
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import  Link from "next/link";
import { useQuizzerStore } from "./quizzer-store";
export function QuizResult() {
    // const state=useQuizzerStore();
  return (
    <div>
      <hr />
      <Card>
        <CardHeader>
           <h1>Quiz Result</h1>
        </CardHeader>
         <CardContent>
          <div className="flex flex-col gap-5">
            {/* <p>Old Score: {state.score.value}</p> */}
            {/* <p>Earned Marks: {state.earnedMarks.value}</p> */}
            {/* <p>New Score: {state.score.value + state.earnedMarks.value}</p> */}
          </div>
        </CardContent>
        <CardFooter>
            <Link href="/" legacyBehavior>
            <Button>Home</Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
