"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { AudioFile } from "./difinitions";
import { Play, Pause, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAudioUrl } from "./audio-item";
/**
 * Fullscreen player component: Play an audio file in fullscreen
 * Props: item - as AudioFile
 * State: playing - boolean
 * Methods: play, pause and repeat
 * Events: onPlay, onPause, onStop, onRepeat
 *
 */
export const FullscreenPlayer: React.FC<{ item: AudioFile }> = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [repeat, setRepeat] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);

  // clean up audio when sheet closed
  React.useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const audioUrl = getAudioUrl(item);

  const { unit, chapter, type, number, subNumber } = item;

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      audioRef.current?.play();
      setPlaying(true);
    }
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const handleEnded = () => {
    if (repeat) {
      audioRef.current?.play();
    } else {
      setOpen(false);
    }
  };
  const handleSheetClose = () => {
    setOpen(false);
    audioRef.current?.pause();
    setPlaying(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Play</Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[425px] h-full w-full" side="bottom">
          <SheetTitle>Audio Player</SheetTitle>
          <SheetDescription></SheetDescription>
            <audio
              controls
              playsInline
              autoPlay
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="flex items-center justify-between mt-4">
              <Button variant="outline" onClick={handlePlayPause}>
                {playing ? <Pause /> : <Play />}
              </Button>
              <Button variant="outline" onClick={handleRepeat}>
                {repeat ? <Repeat /> : <Repeat />}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" onClick={handleSheetClose}>
                  Close
                </Button>
              </SheetClose>
            </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
