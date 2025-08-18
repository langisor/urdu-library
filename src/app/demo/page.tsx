import Loading from "@/app/loading";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { JsonViewerComponent } from "@/components/json-viewer";
import { Quiz } from "@/app/mondly/_types/data-services";
import { getQuizzes, TQuizType, GetQuizzesProps } from "./services";

export default async function DemoPage() {
  let quizQueryProps: GetQuizzesProps = {
    type: TQuizType.T1,
    limit: 1,
  };
  const fQuizzes = await getQuizzes(quizQueryProps);

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-2">
        {/* <pre>{JSON.stringify(fQuizzes[0], null, 2)}</pre> */}
        <JsonViewerComponent data={fQuizzes[0]} />

        <SelectQuiz quiz={fQuizzes[0]} />
      </div>
    </Suspense>
  );
}
function SelectQuiz({quiz}: {quiz: Quiz}) {
   const quizType = quiz.type;
   switch (quizType) {
     case TQuizType.T1:
       return <QuizT1 quiz={quiz} />;
    //  case TQuizType.T1b:
    //    return <QuizT1b quiz={quiz} />;
    //  case TQuizType.T2:
    //    return <QuizT2 quiz={quiz} />;
    //  case TQuizType.T2b:
    //    return <QuizT2b quiz={quiz} />;
    //  case TQuizType.W1b:
    //    return <QuizW1b quiz={quiz} />;
     default:
       return <div>Unknown Quiz Type</div>;
   }
}
function QuizT1({ quiz }: { quiz: Quiz }) {
  const ord = quiz.ord;
  const sols = {
    key: quiz.sols[0].key,
    targetText: quiz.sols[0].text,
    phonetic: quiz.sols[0].phonetic,
    motherText: quiz.sols[1].text,
    targetTokens: quiz.sols[0].text_tokens?.map((token) => {
      return {
        token: token.raw.text,
        location: token.raw.location,
      };
    }),
    motherTokens: quiz.tokens?.map((token) => {
      return {
        key: token.key, // this is the key of the token compared to quiz.ord
        token: token.raw.text,
        location: token.raw.location,
         
      };
    }),
    tokensEqualSize: quiz.tokensEqualSize,
  };
  return (
    <Card>
      <CardContent>
        <pre>{JSON.stringify(sols, null, 2)}</pre>
      </CardContent>
    </Card>
  );
}
