"use client";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { LessonNode } from "@/data/sound-and-script";
import { findLessonByIndex } from "@/lib/helpers";

interface LessonSheetProps {
  lesson: LessonNode;
}

export function LessonSheet({ lesson }: LessonSheetProps) {
  const lessonData = findLessonByIndex(lesson.lesson - 1);
  const title = lessonData?.title;
  const path = `/media/audio-all/Sound and Script/Lesson${lesson.lesson}`;
  const audioFiles = lesson.audios.map((audio) => {
    return {
      no: audio.exercise,
      file: `${path}/${audio.file}`,
    };
  });
  console.log(audioFiles);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button> {title || ""}</Button>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col w-screen h-screen overflow-y-auto"
        side="bottom"
      >
        <SheetHeader>
          <SheetTitle>{title || ""}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-wrap gap-4">
          {audioFiles.map((audio) => (
            <Card key={audio.no}>
              <CardHeader>
                <CardTitle>Exercise {audio.no}</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer file={audio.file} no={audio.no} />
              </CardContent>
            </Card>
          ))}
        </div>
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface AudioPlayerProps {
  file: string;
  no: number;
}

function AudioPlayer({ file, no }: AudioPlayerProps) {
  return (
    <div className="flex flex-col gap-2">
      <audio controls>
        <source src={file} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
