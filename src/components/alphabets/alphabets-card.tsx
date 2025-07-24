"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlphabetsTable } from "./alphabets-table";
import { ChartPron } from "./chart-pron";
import Image from "next/image";
export function AlphabetsCard() {
  const src = `/media/audio-all/BegUrdu_Alphabet.mp3`;
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle>Alphabets</CardTitle>
        </CardHeader>
        <CardContent>
          <audio controls>
            <source src={src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </CardContent>
      </Card>
      <div className="p-10 my-20">
        <Card className="">
          <CardContent className="flex flex-col gap-3 my-4">
            <Image
              src="/materials/urdu_alphabet.webp"
              alt="Alphabets Image"
              width={500}
              height={500}
            />
          </CardContent>
        </Card>
      </div>
      <div className="p-10 my-20">
        <Card>
          <CardContent>
            <ChartPron />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <AlphabetsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
