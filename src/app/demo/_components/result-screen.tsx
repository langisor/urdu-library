"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useRouter } from "next/navigation";
interface ResultScreenProps {
  score: number;
}

export function ResultScreen({ score }: ResultScreenProps) {
  const router = useRouter();
  const [exit, setExit] = React.useState(false);
  // if exit is true, return to demo page
  if (exit) {
    router.push("/demo");
  }
  return (
    <Card className="flex flex-col gap-4 text-right" dir="rtl">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Result</h2>
        <p className="text-2xl font-bold">Your score is {score}</p>
        <Button onClick={() => setExit(true)}>Play Again</Button>
      </CardContent>
    </Card>
  );
}
