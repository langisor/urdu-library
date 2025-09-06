"use client";

// useTonePlayer.ts
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export const useTonePlayer = (url: string) => {
  const playerRef = useRef<Tone.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    playerRef.current = new Tone.Player({
      url: url,
      onload: () => setIsReady(true),
      onstop: () => setIsPlaying(false)
    }).toDestination();

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  const start = async () => {
    if (playerRef.current && isReady) {
      if (Tone.Transport.state !== 'started') {
        await Tone.start();
      }
      playerRef.current.start();
      setIsPlaying(true);
    }
  };

  const stop = () => {
    if (playerRef.current) {
      playerRef.current.stop();
    }
  };

  return { start, stop, isPlaying, isReady };
};

