import { queryClient } from "@/lib/postgres-client"

import { JsonViewerComponent } from "@/components/general/json-viewer-component"
import { QuizW1bItem } from "../mondly/category/quizzer/_components/definitions"

async function getQuizW1b(){
    const quizzes:QuizW1bItem[]=[];
    const data=await queryClient`
        select "quizData" from "Quiz" where "type"="W1b" limit 3;
    `;
    return data;
}

export default  async function QuizW1b() {
    const quizzes=await getQuizW1b();

    return (
        <JsonViewerComponent data={quizzes} />
    )
}