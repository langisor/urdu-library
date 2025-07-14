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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  return chapters.map((chapter: Chapter, index) => (
    <Sheet key={index}>
      <SheetTrigger
        asChild
        className="w-full hover:transform hover:scale-105 transition-all text-white bg-amber-500 hover:cursor-pointer"
      >
        <Button>
          Chapter {chapter.chapterNo} : {chapter.title}
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-screen h-screen p-4 overflow-y-auto"
        side="bottom"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription className="bg-blue-400 rounded-xl p-4 text-center text-white font-bold text-2xl">
            Unit {unitNo} : {unitTitle}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          {chapter.audios.map((audio: AudioFile, index) => (
            <Card key={index} className="p-2">
              <CardHeader className="bg-orange-800 text-center text-white rounded-xl p-4">
                <CardTitle>
                  Chapter {chapter.chapterNo} : {chapter.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 bg-gray-400 p-4">
                {chapter.audios.map((audio: AudioFile, index) => (
                  <div key={index}>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {audio.type} {audio.no}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <AudioPlayer
                          file={`${path}/Chapter${chapter.chapterNo}/${audio.file}`}
                          no={audio.no}
                        />
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ));
}

function AudioPlayer({ file, no }: { file: string; no: number }) {
  return (
    <audio controls>
      <source src={file} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
