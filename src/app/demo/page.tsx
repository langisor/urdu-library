"use client";
import { useGlobalState, accessGlobalState } from "./_stores/global-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

setInterval(() => {
  accessGlobalState().setScore( 1);
}, 1000);

export default function Demo() {
  const state = useGlobalState();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-500">
            Score: {state.getScore()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => state.nextQuiz()}>Next</Button>
          <Button onClick={() => state.setTotalQuizzes(10)}>
            setTotalQuizzes
          </Button>
          <Button onClick={() => state.reset()}>Reset</Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p>currentQuizIndex: {state.getCurrentQuizIndex()}</p>
          <p>totalQuizzes: {state.getTotalQuizzes()}</p>
          <p>isComplete: {state.getIsComplete()}</p>
          <p>score: {state.getScore()}</p>
        </CardContent>
      </Card>
    </div>
  );
}
