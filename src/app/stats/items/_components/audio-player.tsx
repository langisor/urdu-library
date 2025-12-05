"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  src: string;
  className?: string;
}

export function AudioPlayer({ src, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      setError(false);
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      setError(true);
      setIsPlaying(false);
      console.error("Error playing audio:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        onEnded={handleEnded}
        onLoadedMetadata={() => setIsLoading(false)}
      />
      <Button
        variant="ghost"
        onClick={togglePlay}
        disabled={error || isLoading}
        className="hover:bg-accent"
        title={error ? "Error loading audio" : isPlaying ? "Pause" : "Play"}
      >
        {error ? "✕" : isPlaying ? "⏸" : "▶"}
      </Button>
    </div>
  );
}
