"use client";

import { useEffect, useRef } from "react";

interface AudioPlayerProps {
  src: string | null;
  title?: string;
  onEnded?: () => void;
  onError?: (error: string) => void;
}

export default function AudioPlayer({
  src,
  title,
  onEnded,
  onError,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      onEnded?.();
    };

    const handleError = () => {
      onError?.(`Failed to load audio: ${src}`);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [src, onEnded, onError]);

  if (!src) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>No audio selected</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      {title && (
        <div className="text-sm font-medium text-foreground">
          Now Playing: {title}
        </div>
      )}
      <audio ref={audioRef} controls className="w-full" preload="metadata">
        <source src={src} type="audio/mpeg" />
        <source src={src} type="audio/wav" />
        <source src={src} type="audio/ogg" />
        Your browser does not support the audio element. Please try using a
        modern browser like Chrome, Firefox, or Safari.
      </audio>
    </div>
  );
}
