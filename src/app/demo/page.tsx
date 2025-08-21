"use client";

import { useTune } from "./_components/use-tune";
import { Button } from "@/components/ui/button";

export default function Demo() {
  const { playCorrectTune, playIncorrectTune } = useTune();
  return (
    <div>
      <h1 className="text-2xl font-bold">demo</h1>
      <Button onClick={playCorrectTune}>Play Correct Tune</Button>
      <Button onClick={playIncorrectTune}>Play Incorrect Tune</Button>
    </div>
  );
}
