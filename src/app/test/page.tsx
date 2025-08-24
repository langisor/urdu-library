"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlayer } from "../_components/use-player";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
const audioUrl1 = "/media/mondly/audios/_5j_NWTG4kjCB1YiyYHDH08u1-P1M9Ck";
const audioUrl2 = "/media/mondly/audios/_9YmF7BylhHp2wIS6CYgZlL2tXVINGAF";
const longAudioUrl = "/media/long-5-mins-audio.mp3";
export default function Test() {
  // const {
  //   player: player2,
  //   togglePlayback: togglePlayback2,
  //   isPlaying: isPlaying2,
  // } = usePlayer({ audioUrl: audioUrl2 });
  // const {
  //   player: player3,
  //   togglePlayback: togglePlayback3,
  //   isPlaying: isPlaying3,
  // } = usePlayer({ audioUrl: longAudioUrl });

  return (
    <div>
      <h1 className="text-2xl font-bold">Test</h1>
      <Card>
        <CardHeader>
          <CardTitle>Video Player</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>Sheet Description</SheetDescription>
              <PlayerButton url={audioUrl1} />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </div>
  );
}

function PlayerButton({ url }: { url: string }) {
  const { player, togglePlayback, isPlaying } = usePlayer({
    audioUrl: url,
    autoPlay: false,
  });

  React.useEffect(() => {
    if (player && player.loaded) {
      player.start();
    }
  }, [player]);
  return (
    <>
      <Button
        onClick={togglePlayback}
        disabled={isPlaying}
        className={
          isPlaying ? "text-white bg-red-800" : "text-white bg-green-800"
        }
      >
        Play/Pause
      </Button>
    </>
  );
}
