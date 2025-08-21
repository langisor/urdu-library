"use client";
import { useState, useRef, useEffect } from "react";
export   function AudioPlayer({ src, autoPlay = false }: { src: string; autoPlay?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Effect to set up event listeners on the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Handle when audio metadata is loaded
    const handleLoadedMetadata = () => {
      setLoaded(true);
    };

    // Handle when the audio playback ends
    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    // Cleanup function to remove event listeners on unmount
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [src, autoPlay]);

  return (
    <div className="flex items-center gap-2">
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
      {loaded ? (
        <LoadingIcon />
      ) : (
        <audio
          ref={audioRef}
          src={src}
          playsInline
          muted
          autoPlay={autoPlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedData={() => setLoaded(true)}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
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
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);
