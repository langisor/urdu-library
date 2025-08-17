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
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Repeat,
  Music,
  FastForward,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
interface FullscreenPlayerProps {
  item: AudioFile;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const getAudioUrl = (item: AudioFile): string => {
  const { unit, chapter, id } = item;
  const unit_number = unit;
  // const chapterNumber = String(chapter).padStart(2, "0");
  const chapter_number = chapter;
  return `/media/audio-all/Unit${unit_number}/Chapter${chapter_number}/${id}`;
};

// styles for video player
const videoStyle = ` 
.App {
 text-align: center;
}
.video_container {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100%;
}
.player__wrapper {
   position: relative;
}
.player {
   border: 2px solid #7b2cbf;
   object-fit: cover;
   padding: 0;
   margin: 0;
}
h2 {
 color: #7b2cbf;
}
`;
/**
 * Fullscreen player component: Play an audio file in fullscreen
 * Props: item - as AudioFile
 * State: playing - boolean
 * Methods: play, pause and repeat
 * Events: onPlay, onPause, onStop, onRepeat
 *
 */

export function FullscreenPlayer({
  item,
  disabled = false,
  children,
}: FullscreenPlayerProps) {
  const [open, setOpen] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [repeat, setRepeat] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);

  // clean up audio when sheet closed
  React.useEffect(() => {
    console.log("audioRef.current", audioRef.current);
  
    return () => {
      setPlaying(false);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const audioUrl = getAudioUrl(item);

  const { unit, chapter, type, number, subNumber } = item;

  const handlePlayPause = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
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
      setCurrentTime(0);
      audioRef.current?.play();
    } else {
      setOpen(false);
    }
  };
  const handleSheetClose = () => {
    setCurrentTime(0);
    setOpen(false);
    audioRef.current?.pause();
    setPlaying(false);
    audioRef.current = null;
  };

  const buttonStyle =
    type === "Vocabulary"
      ? {
          backgroundColor: "#8D2B2C",
          color: "white",
          cursor: "pointer",
        }
      : {
          backgroundColor: "#6A7D91",
          color: "white",
          cursor: "pointer",
        };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className="flex flex-row gap-2"
            style={buttonStyle}
          >
            <Music className="w-4 h-4 mr-2" />
            {type === "Vocabulary" ? "Vocabulary" : "Exercise"} {number}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full h-screen" side="bottom">
          <SheetTitle className="text-2xl font-bold text-center">
            {" "}
            {type === "Vocabulary" ? "Vocabulary" : "Exercise"} {number}
          </SheetTitle>
          <SheetDescription></SheetDescription>
          <Card className="w-full h-full">
            <audio
              controls
              className="w-full h-full"
              playsInline
              autoPlay
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              onPlay={handlePlayPause}
              onPause={handlePlayPause}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the video element.
            </audio>
            <div className="flex items-center justify-center mt-2">
              <Button
                variant="outline"
                onClick={handlePlayPause}
                className={playing ? "bg-blue-500" : ""}
              >
                {playing ? <Pause /> : <Play />}
              </Button>
              <Button
                variant="outline"
                onClick={handleRepeat}
                className={repeat ? "bg-blue-500" : ""}
              >
                {repeat ? <Repeat /> : <Repeat />}
              </Button>
              {/* <Button
                variant={"outline"}
                onClick={handleForward}
                className={"bg-blue-500"}
              >
                <FastForward />
              </Button>
              <Button
                variant={"outline"}
                onClick={handleBackward}
                className={"bg-blue-500"}
              >
                <SkipBack />
              </Button> */}
              <SheetClose asChild>
                <Button variant="outline" onClick={handleSheetClose}>
                  Close
                </Button>
              </SheetClose>
            </div>
          </Card>
        </SheetContent>
      </Sheet>
    </>
  );
}
