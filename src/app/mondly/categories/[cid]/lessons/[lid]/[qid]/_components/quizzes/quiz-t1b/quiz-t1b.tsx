"use client" 
 import {Quiz} from "@/app/mondly/_types/data-services"

 export function QuizT1b({quiz}: {quiz: Quiz}) {
    return (
        <div className="flex flex-col gap-2">
            <h1>{quiz.type}</h1>
            <hr />
            <pre>{JSON.stringify(quiz, null, 2)}</pre>
        </div>
    )
}