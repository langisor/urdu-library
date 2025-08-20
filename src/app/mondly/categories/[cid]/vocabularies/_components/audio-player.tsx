"use client";
import React, { useState, useRef, useEffect } from "react";
import { useIsMobile } from "../_hooks/use-mobile";
import { Play, BookCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
interface AudioPlayerProps {
  audioUrl?: string;
  text: string;
  autoPlay?: boolean;
  onPlay?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  text,
  autoPlay = false,
  onPlay,
}) => {
  const isMobile = useIsMobile();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulate audio since we don't have real audio files
  // const simulateAudio = () => {
  //   setIsPlaying(true);
  //   onPlay?.();

  //   // Simulate audio duration
  //   setTimeout(() => {
  //     setIsPlaying(false);
  //     setHasPlayed(true);
  //   }, 2000);
  // };

  useEffect(() => {
    if (autoPlay && !hasPlayed) {
      // setTimeout(simulateAudio, 500);
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setHasPlayed(true);
      };
    }
  }, [autoPlay, hasPlayed]);

  const handlePlay = () => {
    if (!isPlaying) {
      // simulateAudio();
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setHasPlayed(true);
      };
    }
  };

  //  Desktop
  if (!isMobile)
    return (
      <div className="flex  items-center justify-center space-y-4 p-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <Button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`
          flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 transform hover:scale-105
          ${
            isPlaying
              ? "bg-orange-500 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          }
        `}
        >
          {isPlaying ? (
            <div className="flex space-x-1">
              <div className="w-1 h-6 bg-white animate-pulse"></div>
              <div
                className="w-1 h-6 bg-white animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1 h-6 bg-white animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </Button>

        {hasPlayed ? (
          <p className="text-sm text-gray-600 text-center border flex gap-2">
            <span className="font-medium">{text}</span>
            <span>
              <BookCheck className="w-8 h-8" />
            </span>
          </p>
        ) : (
          <p className="text-xs text-gray-500">
            {isPlaying ? "Playing audio..." : "Click to play pronunciation"}
          </p>
        )}
      </div>
    );

  // mobile
  return (
    <Button
      onClick={handlePlay}
      disabled={isPlaying}
      className={`
          flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-105
          ${
            isPlaying
              ? "bg-orange-500 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          }
        `}
    >
      {isPlaying ? (
        <div className="flex space-x-1">
          <div
            className="w-1 h-1 bg-white animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      ) : (
        <Play className="w-8 h-8 ml-1" />
      )}
      {hasPlayed && <BookCheck className="w-8 h-8 ml-2" />}
    </Button>
  );
};
