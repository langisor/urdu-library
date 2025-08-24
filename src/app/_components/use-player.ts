"use client";
import * as React from "react";
import * as Tone from "tone";
import { useState, useRef, useEffect } from "react";

// simple audio player
interface UsePlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
}

export const usePlayer = ({ audioUrl, autoPlay = false }: UsePlayerProps) => {
  const player = useRef<Tone.Player>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    player.current = new Tone.Player({
      url: audioUrl,
      autostart: autoPlay,
      loop: false,
    }).toDestination();
    // clean up
    return () => {
      player.current?.stop();
      setIsPlaying(false);
      player.current?.dispose();
    };
  }, [audioUrl, autoPlay]);

  const play = () => {
    if (player.current) {
      player.current.start(Tone.now());
      setIsPlaying(true);
    }
  };
  const stop = () => {
    if (player.current) {
      player.current.stop();
      setIsPlaying(false);
    }
  };

  return {
    play,
    stop,
    isPlaying,
  };
};
