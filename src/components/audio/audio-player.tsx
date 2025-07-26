"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AudioFile } from "@/lib/audio-mapper";

export interface AudioPlayerProps {
  audioFile: AudioFile;
  isActive?: boolean;
  onPlay?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioFile,
  isActive = false,
  onPlay,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

 

  return (
    <audio controls ref={audioRef}>
      <source src={audioFile.path} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};
