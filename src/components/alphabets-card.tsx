"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AlphabetsCard() {
  const src = `/media/audio-all/BegUrdu_Alphabet.mp3`;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alphabets</CardTitle>
      </CardHeader>
      <CardContent>
        <audio controls>
          <source src={src} type="audio/mpeg" />
        </audio>
      </CardContent>
    </Card>
  );
}
