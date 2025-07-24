"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Unit, Chapter, AudioFile } from "@/data/units";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import * as React from "react";
interface ChapterSheetProps {
  chapters: Chapter[];
  unitTitle: string;
  unitNo: number;
}

export function ChapterSheet({
  chapters,
  unitTitle,
  unitNo,
}: ChapterSheetProps) {
  const path = `/media/audio-all/Unit ${unitNo} Audio`;
  const chapterSheets = chapters.map((chapter: Chapter, index) => (
    <div key={index }>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-full text-sm">
            Chapter {chapter.chapterNo} : {chapter.title}
          </Button>
        </SheetTrigger>
        <SheetContent
          className="w-screen h-screen p-4 overflow-y-auto"
          side="bottom"
        >
          <SheetHeader>
            <SheetTitle>
              Chapter {chapter.chapterNo} : {chapter.title}
            </SheetTitle>
            <SheetDescription className="bg-blue-400 rounded-xl p-4 text-center text-white font-bold text-2xl">
              Unit {unitNo} : {unitTitle}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 p-4">
            {chapter.audios.map((audio: AudioFile, index) => (
              <Card
                key={audio.no + new Date().getTime() + index}
                className="p-2"
              >
                <CardContent className="flex flex-wrap gap-4 bg-gray-400 p-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {audio.type} {audio.no}
                      </CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AudioPlayer
                        file={`${path}/Chapter${chapter.chapterNo}/${audio.file}`}
                        no={audio.no}
                      />
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            ))}
          </div>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  ));
  return chapterSheets;
}

function AudioPlayer({ file, no }: { file: string; no: number }) {
  return (
    <audio controls>
      <source src={file} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
