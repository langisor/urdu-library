"use client";

import { useRef, useState, useEffect } from "react";

interface Props {
  src: string;
  autoPlay?: boolean;
}


export const useAudio = ({ src, autoPlay = false }: Props) => {
  const url = `/api/audio/${src}`;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // create audio element and load data
  useEffect(() => {
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.addEventListener("loadedmetadata", () => {
      audioRef.current?.play();
    });
    // is browser agent is ios then set gautoPlay to false
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (autoPlay && !isIOS) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    audioRef.current.onended = () => {
      setIsPlaying(false);
    };
  }, [url, autoPlay]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };
  const isLoading = !audioRef.current;
  const isError = audioRef.current?.error;

  return {
    isLoading,
    isError,
    handlePlayPause,
    audio: audioRef.current,
  };
};
