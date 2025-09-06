"use client";
import { useTonePlayer } from "@/hooks/use-tone-player";
import * as React from "react";
import { Button } from "@/components/ui/button";

interface TonePlayerButtonProps{
 url:string;
 autoPlay?:boolean;
}
// TonePlayerButton.tsx
export const TonePlayerButton: React.FC<TonePlayerButtonProps> = ({ url, autoPlay = false }) => {
  const { start, stop, isPlaying, isReady } = useTonePlayer(url);

  React.useEffect(() => {
    if (autoPlay && isReady) {
      start();
    }
  }, [autoPlay, isReady, start]);

  const handleClick = () => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  };

  return (
    <Button onClick={handleClick} disabled={!isReady}>
      {isReady ? (isPlaying ? 'Pause' : 'Play') : 'Loading...'}
    </Button>
  );
};