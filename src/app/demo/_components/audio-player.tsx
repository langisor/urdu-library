"use client";
import { useState, useEffect, useRef } from "react";
import { useAudio } from "../_hooks/useAudio";
import { Button } from "@/components/ui/button";
// Reusable AudioPlayer Component

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
}

export function AudioPlayer({ src, autoPlay = false }: AudioPlayerProps) {
  const { isLoading, isError, isPlaying, handlePlayPause, audioRef, audio } =
    useAudio({ src, autoPlay });

  if (isLoading) {
    return (
      <Button disabled>
        <LoadingIcon />
      </Button>
    );
  }

  if (isError) {
    return (
      <Button disabled>
        <ErrorIcon />
      </Button>
    );
  }

  if (isPlaying) {
    return (
      <Button onClick={handlePlayPause}>
        <PauseIcon />
      </Button>
    );
  }

  return (
    <Button onClick={handlePlayPause}>
      <PlayIcon />
    </Button>
  );
}

// SVG icons for play and pause buttons
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path d="M18.985 11.026L5.004 2.155C4.249 1.624 3 2.164 3 3.129V20.871C3 21.836 4.249 22.376 5.004 21.845L18.985 12.974C19.74 12.443 19.74 11.557 18.985 11.026Z" />
  </svg>
);

const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <rect x="6" y="5" width="4" height="14" rx="1.5" />
    <rect x="14" y="5" width="4" height="14" rx="1.5" />
  </svg>
);
const LoadingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path d="M18.985 11.026L5.004 2.155C4.249 1.624 3 2.164 3 3.129V20.871C3 21.836 4.249 22.376 5.004 21.845L18.985 12.974C19.74 12.443 19.74 11.557 18.985 11.026Z" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path d="M18.985 11.026L5.004 2.155C4.249 1.624 3 2.164 3 3.129V20.871C3 21.836 4.249 22.376 5.004 21.845L18.985 12.974C19.74 12.443 19.74 11.557 18.985 11.026Z" />
  </svg>
);
