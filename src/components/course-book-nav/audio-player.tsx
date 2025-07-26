"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  Home,
  SkipBack,
  SkipForward,
  Volume2,
  X,
  Heart,
} from "lucide-react";
import type {
  AudioPlayerProps,
  AudioPlayerState,
  FileTypeColor,
  KeyboardEventHandler,
  ClickEventHandler,
} from "@/types/audio-data";
import * as React from "react";
import { useFavorites } from "@/hooks/use-favorites";

export function AudioPlayer({
  currentAudio,
  onClose,
  onHomeClick,
}: AudioPlayerProps): React.ReactNode | null {
  const [playerState, setPlayerState] = React.useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
  });

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const favorites = useFavorites();

  const updatePlayerState = React.useCallback(
    (updates: Partial<AudioPlayerState>): void => {
      setPlayerState((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  React.useEffect((): (() => void) | void => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = (): void =>
      updatePlayerState({ currentTime: video.currentTime });
    const updateDuration = (): void =>
      updatePlayerState({ duration: video.duration });
    const handleEnded = (): void => {
      updatePlayerState({ isPlaying: false });
      handleTrackEnd();
    };
    const handlePlay = (): void => updatePlayerState({ isPlaying: true });
    const handlePause = (): void => updatePlayerState({ isPlaying: false });
    const handleLoadStart = (): void => {
      updatePlayerState({ currentTime: 0, duration: 0 });
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("loadstart", handleLoadStart);

    return (): void => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("loadstart", handleLoadStart);
    };
  }, [currentAudio, updatePlayerState]);

  React.useEffect((): void => {
    const video = videoRef.current;
    if (!video || !currentAudio) return;

    // Auto-play when new audio is loaded
    const playPromise: Promise<void> | undefined = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error: Error): void => {
        console.log("Auto-play prevented:", error);
        updatePlayerState({ isPlaying: false });
      });
    }
  }, [currentAudio, updatePlayerState]);

  // Keyboard shortcuts
  React.useEffect((): (() => void) => {
    const handleKeyDown: KeyboardEventHandler = (
      event: KeyboardEvent
    ): void => {
      // Only handle keyboard shortcuts when audio player is active
      if (!currentAudio) return;

      // Prevent default behavior if we're handling the key
      const isHandled: boolean = [
        "Space",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
      ].includes(event.code);

      // Don't handle shortcuts if user is typing in an input field
      const activeElement: Element | null = document.activeElement;
      const isInputFocused: boolean =
        activeElement !== null &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.getAttribute("contenteditable") === "true");

      if (isInputFocused) return;

      if (isHandled) {
        event.preventDefault();
      }

      switch (event.code) {
        case "Space":
          togglePlayPause();
          break;
        case "ArrowLeft":
          skipBackward();
          break;
        case "ArrowRight":
          skipForward();
          break;
        case "ArrowUp":
          adjustVolume(0.1);
          break;
        case "ArrowDown":
          adjustVolume(-0.1);
          break;
      }
    };

    // Add event listener to document
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return (): void => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentAudio, playerState.isPlaying, playerState.volume]);

  const handleTrackEnd = React.useCallback((): void => {
    updatePlayerState({ isPlaying: false });
  }, [updatePlayerState]);

  const togglePlayPause = React.useCallback((): void => {
    const video = videoRef.current;
    if (!video) return;

    if (playerState.isPlaying) {
      video.pause();
    } else {
      const playPromise: Promise<void> | undefined = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error: Error): void => {
          console.error("Play failed:", error);
          updatePlayerState({ isPlaying: false });
        });
      }
    }
  }, [playerState.isPlaying, updatePlayerState]);

  const handleSeek = React.useCallback(
    (value: number[]): void => {
      const video = videoRef.current;
      if (!video || !playerState.duration) return;

      const newTime: number = (value[0] / 100) * playerState.duration;
      video.currentTime = newTime;
      updatePlayerState({ currentTime: newTime });
    },
    [playerState.duration, updatePlayerState]
  );

  const handleVolumeChange = React.useCallback(
    (value: number[]): void => {
      const video = videoRef.current;
      if (!video) return;

      const newVolume: number = value[0] / 100;
      video.volume = newVolume;
      updatePlayerState({ volume: newVolume });
    },
    [updatePlayerState]
  );

  const adjustVolume = React.useCallback(
    (delta: number): void => {
      const video = videoRef.current;
      if (!video) return;

      const newVolume: number = Math.max(
        0,
        Math.min(1, playerState.volume + delta)
      );
      video.volume = newVolume;
      updatePlayerState({ volume: newVolume });
    },
    [playerState.volume, updatePlayerState]
  );

  const skipBackward = React.useCallback((): void => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, video.currentTime - 10);
  }, []);

  const skipForward = React.useCallback((): void => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.min(playerState.duration, video.currentTime + 10);
  }, [playerState.duration]);

  const formatTime = React.useCallback((time: number): string => {
    if (!isFinite(time)) return "0:00";
    const minutes: number = Math.floor(time / 60);
    const seconds: number = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const getFileTypeColor = React.useCallback((type: string): FileTypeColor => {
    switch (type) {
      case "exercise":
        return "default";
      case "vocabulary":
        return "secondary";
      case "general":
        return "outline";
      default:
        return "outline";
    }
  }, []);

  const handleProgressClick: ClickEventHandler = React.useCallback(
    (e: React.MouseEvent): void => {
      const rect: DOMRect = e.currentTarget.getBoundingClientRect();
      const percent: number = ((e.clientX - rect.left) / rect.width) * 100;
      handleSeek([percent]);
    },
    [handleSeek]
  );

  const handleVolumeClick: ClickEventHandler = React.useCallback(
    (e: React.MouseEvent): void => {
      const rect: DOMRect = e.currentTarget.getBoundingClientRect();
      const percent: number = ((e.clientX - rect.left) / rect.width) * 100;
      handleVolumeChange([percent]);
    },
    [handleVolumeChange]
  );

  const toggleFavorite = React.useCallback((): void => {
    if (!currentAudio) return;

    const isFav = favorites.isFavorite(
      currentAudio.file.filename,
      currentAudio.path
    );

    if (isFav) {
      // Find and remove the favorite
      const favoriteItem = favorites.items.find(
        (item) =>
          item.file.filename === currentAudio.file.filename &&
          item.path === currentAudio.path
      );
      if (favoriteItem) {
        favorites.removeFromFavorites(favoriteItem.id);
      }
    } else {
      // Add to favorites
      favorites.addToFavorites({
        file: currentAudio.file,
        path: currentAudio.path,
        context: currentAudio.context,
      });
    }
  }, [currentAudio, favorites]);

  const isFavorited = currentAudio
    ? favorites.isFavorite(currentAudio.file.filename, currentAudio.path)
    : false;

  if (!currentAudio) return null;

  return (
    <>
      {/* Hidden video element for audio playback */}
      <video
        ref={videoRef}
        src={`/placeholder.mp3?query=${encodeURIComponent(
          currentAudio.file.filename
        )}`}
        preload="metadata"
        style={{ display: "none" }}
      />

      {/* Audio Player UI */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-4">
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onHomeClick}
                title="Go to Home"
              >
                <Home className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                title="Close Player"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Main Player Content */}
            <div className="flex-1">
              {/* Track Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold truncate">
                    {currentAudio.file.title}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {currentAudio.context}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={getFileTypeColor(currentAudio.file.type)}
                      className="text-xs"
                    >
                      {currentAudio.file.type}
                    </Badge>
                    {currentAudio.file.exercise_number && (
                      <Badge variant="outline" className="text-xs">
                        Ex. {currentAudio.file.exercise_number}
                      </Badge>
                    )}
                    {currentAudio.file.vocabulary_number && (
                      <Badge variant="outline" className="text-xs">
                        Vocab {currentAudio.file.vocabulary_number}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFavorite}
                    title={
                      isFavorited ? "Remove from favorites" : "Add to favorites"
                    }
                    className={
                      isFavorited ? "text-red-500 hover:text-red-600" : ""
                    }
                  >
                    <Heart
                      className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={skipBackward}
                    title="Skip back 10s (←)"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={togglePlayPause}
                    size="lg"
                    title={
                      playerState.isPlaying ? "Pause (Space)" : "Play (Space)"
                    }
                  >
                    {playerState.isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={skipForward}
                    title="Skip forward 10s (→)"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground min-w-[40px]">
                  {formatTime(playerState.currentTime)}
                </span>
                <div className="flex-1">
                  <Progress
                    value={
                      playerState.duration
                        ? (playerState.currentTime / playerState.duration) * 100
                        : 0
                    }
                    className="cursor-pointer"
                    onClick={handleProgressClick}
                  />
                </div>
                <span className="text-sm text-muted-foreground min-w-[40px]">
                  {formatTime(playerState.duration)}
                </span>

                {/* Volume Control */}
                <div className="flex items-center gap-2 ml-4">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <div className="w-20">
                    <Progress
                      value={playerState.volume * 100}
                      className="cursor-pointer"
                      onClick={handleVolumeClick}
                      title={`Volume: ${Math.round(
                        playerState.volume * 100
                      )}% (↑↓)`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="container mx-auto px-4 pb-2">
          <div className="text-xs text-muted-foreground text-center">
            Keyboard shortcuts:{" "}
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Space</kbd>{" "}
            Play/Pause •
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs mx-1">←</kbd>{" "}
            Skip back •
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">→</kbd> Skip
            forward •
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs mx-1">↑↓</kbd>{" "}
            Volume
          </div>
        </div>
      </div>
    </>
  );
}
