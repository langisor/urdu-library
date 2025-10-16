"use client";

import { Card } from "@/components/ui/card";
export function ResultScreen({score}: {score: number}) {
  return (
    <Card>
      <h1 className="text-2xl">Result Screen</h1>
      <p className="text-xl">Score: {score}</p>
    </Card>
  );
}
