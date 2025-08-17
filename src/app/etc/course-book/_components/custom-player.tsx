"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Repeat,
} from "lucide-react";
import { AudioFile, getAudioUrl } from "./difinitions";
import { Button } from "react-day-picker";

interface CustomPlayerProps {
  item: AudioFile;
  disabled?: boolean;
}
// Main App component to demonstrate the AudioPlayer
export function CustomPlayer({ item, disabled }: CustomPlayerProps) {
  return (
    <div className="w-full max-w-md">
      <AudioPlayer
        src={getAudioUrl(item)}
        title={
          item.type === "Vocabulary" ? "Vocabulary" : "Exercise" + item.number
        }
        disabled={disabled}
      />
    </div>
  );
}

interface AudioPlayerProps {
  src: string;
  title: string;
  disabled?: boolean;
}
/**
 * Reusable Audio Player component.
 * @param {object} props
 * @param {string} props.src - The URL of the audio file.
 * @param {string} props.title - The title of the track.
 */
const AudioPlayer = ({ src, title, disabled }: AudioPlayerProps) => {
  // Create a ref to the audio element to access its properties
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // State variables for managing player status
  const [isPlaying, setIsPlaying] = useState(true); // Set to true for autoplay
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  // useEffect hook to handle audio events and cleanup
  useEffect(() => {
    const audio = audioRef.current;

    // Check if audio element exists
    if (!audio) return;

    // Event listener for when the audio metadata is loaded
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      audio.volume = volume; // Set initial volume
    };

    // Event listener for time updates (as the audio plays)
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    // Event listener for when the audio ends
    const handleAudioEnded = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    // Add all event listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleAudioEnded);

    // --- Cleanup Function ---
    // The code in this return function runs when the component unmounts.
    // It removes all event listeners to prevent memory leaks.
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, [volume, isRepeating]); // Re-run effect if volume or repeat state changes

  // New useEffect to handle autoplay on component mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Use a try/catch block to handle potential autoplay errors
      audio.play().catch((error) => {
        console.log("Autoplay prevented by browser: ", error);
        // Fallback: If autoplay fails, set isPlaying to false
        setIsPlaying(false);
      });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to toggle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Function to handle changes in the seek bar (progress)
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newTime = parseFloat(e.target.value);
    audio && (audio.currentTime = newTime);
    setCurrentTime(newTime);
  };

  // Function to handle changes in the volume slider
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const audio = audioRef.current;
    audio && (audio.volume = newVolume);
    setVolume(newVolume);
  };

  // Function to skip backward by 5 seconds
  const skipBackward = () => {
    const audio = audioRef.current;
    audio && (audio.currentTime = Math.max(0, audio.currentTime - 5));
  };

  // Function to skip forward by 5 seconds
  const skipForward = () => {
    const audio = audioRef.current;
    audio &&
      (audio.currentTime = Math.min(audio.duration, audio.currentTime + 5));
  };

  // Function to toggle repeat functionality
  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  // Function to format time from seconds to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Track Info */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
          {title}
        </h2>
      </div>

      {/* Main Controls: Skip, Play/Pause, and Repeat */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        {/* Skip Backward Button */}
        <Button
          onClick={skipBackward}
          className="p-3 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Rewind 5 seconds"
        >
          <Rewind size={24} />
        </Button>

        {/* Play/Pause Button */}
        <Button
          onClick={togglePlayPause}
          className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </Button>

        {/* Skip Forward Button */}
        <Button
          onClick={skipForward}
          className="p-3 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Skip forward 5 seconds"
        >
          <FastForward size={24} />
        </Button>

        {/* Repeat Button */}
        <Button
          onClick={toggleRepeat}
          className={`p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
            isRepeating ? "text-purple-600" : "text-gray-600 dark:text-gray-400"
          }`}
          aria-label="Toggle repeat"
        >
          <Repeat size={24} />
        </Button>
      </div>

      {/* Progress Bar & Time */}
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono w-10">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:bg-gray-700"
        />
        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono w-10 text-right">
          {formatTime(duration)}
        </span>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2">
        <Button onClick={() => setVolume(0)} aria-label="Mute">
          {volume === 0 ? (
            <VolumeX size={20} className="text-gray-500" />
          ) : (
            <Volume2 size={20} className="text-gray-500" />
          )}
        </Button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:bg-gray-700"
        />
      </div>
    </div>
  );
};
