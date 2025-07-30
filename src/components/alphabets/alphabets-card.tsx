"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlphabetsTable } from "./alphabets-table";
import { ChartPron } from "./chart-pron";
import Image from "next/image";
export function AlphabetsCard() {
  const src = `/media/audio-all/BegUrdu_Alphabet.mp3`;
  return (
    <div className="w-full flex flex-col gap-3 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Alphabets</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <audio controls>
            <source src={src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardTitle className="hidden"></CardTitle>

        <CardContent className="flex flex-col gap-3 w-full">
          <Image
            src="/materials/urdu_alphabet.webp"
            alt="Alphabets Image"
            width={700}
            height={700}
            className="max-w-[700px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardTitle>Alphabets Pronunciation Chart</CardTitle>
        <CardContent>
          <ChartPron />
        </CardContent>
      </Card>
      <Card>
        <CardTitle>Alphabets Table</CardTitle>
        <CardContent>
          <AlphabetsTable />
        </CardContent>
      </Card>
    </div>
  );
}
