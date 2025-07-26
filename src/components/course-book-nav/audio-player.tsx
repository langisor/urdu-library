"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  Pause,
  Home,
  SkipBack,
  SkipForward,
  Volume2,
  X,
  List,
  Shuffle,
  Repeat,
  Repeat1,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { AudioPlayerProps } from "./audio-data";
import type { FileType } from "./audio-data";

export function AudioPlayer({
  currentAudio,
  queue,
  onClose,
  onHomeClick,
  onQueueUpdate,
  onPlayFromQueue,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showQueue, setShowQueue] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      handleTrackEnd();
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadStart = () => {
      setCurrentTime(0);
      setDuration(0);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("loadstart", handleLoadStart);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("loadstart", handleLoadStart);
    };
  }, [currentAudio]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentAudio) return;

    // Auto-play when new audio is loaded
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Auto-play prevented:", error);
        setIsPlaying(false);
      });
    }
  }, [currentAudio]);

  const handleTrackEnd = () => {
    if (queue.repeatMode === "one") {
      // Repeat current track
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play();
        setIsPlaying(true);
      }
      return;
    }

    // Move to next track
    playNext();
  };

  const playNext = () => {
    if (queue.items.length === 0) return;

    let nextIndex = queue.currentIndex + 1;

    if (nextIndex >= queue.items.length) {
      if (queue.repeatMode === "all") {
        nextIndex = 0;
      } else {
        // End of queue
        setIsPlaying(false);
        return;
      }
    }

    onPlayFromQueue(nextIndex);
  };

  const playPrevious = () => {
    if (queue.items.length === 0) return;

    let prevIndex = queue.currentIndex - 1;

    if (prevIndex < 0) {
      if (queue.repeatMode === "all") {
        prevIndex = queue.items.length - 1;
      } else {
        prevIndex = 0;
      }
    }

    onPlayFromQueue(prevIndex);
  };

  const toggleShuffle = () => {
    const newQueue = { ...queue, isShuffled: !queue.isShuffled };

    if (newQueue.isShuffled) {
      // Shuffle the queue while keeping current track at current position
      const currentItem = queue.items[queue.currentIndex];
      const otherItems = queue.items.filter(
        (_, index) => index !== queue.currentIndex
      );
      const shuffledOthers = [...otherItems].sort(() => Math.random() - 0.5);

      newQueue.items = [currentItem, ...shuffledOthers];
      newQueue.currentIndex = 0;
    } else {
      // Restore original order (this is simplified - in a real app you'd store the original order)
      newQueue.items = [...queue.items].sort((a, b) =>
        a.id.localeCompare(b.id)
      );
      // Find current item in restored order
      const currentItem = currentAudio;
      if (currentItem) {
        newQueue.currentIndex = newQueue.items.findIndex(
          (item) => item.file.filename === currentItem.file.filename
        );
      }
    }

    onQueueUpdate(newQueue);
  };

  const toggleRepeat = () => {
    let newRepeatMode;

    switch (queue.repeatMode) {
      case "none":
        newRepeatMode = "all";
        break;
      case "all":
        newRepeatMode = "one";
        break;
      case "one":
        newRepeatMode = "none";
        break;
    }

    onQueueUpdate({
      ...queue,
      repeatMode: newRepeatMode as "none" | "one" | "all",
    });
  };

  const removeFromQueue = (index: number) => {
    const newItems = queue.items.filter((_, i) => i !== index);
    let newCurrentIndex = queue.currentIndex;

    if (index < queue.currentIndex) {
      newCurrentIndex = queue.currentIndex - 1;
    } else if (index === queue.currentIndex && newItems.length > 0) {
      // If removing current item, adjust index
      if (newCurrentIndex >= newItems.length) {
        newCurrentIndex = newItems.length - 1;
      }
    }

    const newQueue = {
      ...queue,
      items: newItems,
      currentIndex: Math.max(0, newCurrentIndex),
    };

    onQueueUpdate(newQueue);

    // If we removed the current track and there are still items, play the new current
    if (index === queue.currentIndex && newItems.length > 0) {
      onPlayFromQueue(newQueue.currentIndex);
    } else if (newItems.length === 0) {
      onClose();
    }
  };

  const moveQueueItem = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const newItems = [...queue.items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);

    // Adjust current index
    let newCurrentIndex = queue.currentIndex;
    if (fromIndex === queue.currentIndex) {
      newCurrentIndex = toIndex;
    } else if (
      fromIndex < queue.currentIndex &&
      toIndex >= queue.currentIndex
    ) {
      newCurrentIndex = queue.currentIndex - 1;
    } else if (
      fromIndex > queue.currentIndex &&
      toIndex <= queue.currentIndex
    ) {
      newCurrentIndex = queue.currentIndex + 1;
    }

    onQueueUpdate({
      ...queue,
      items: newItems,
      currentIndex: newCurrentIndex,
    });
  };

  const clearQueue = () => {
    onQueueUpdate({
      ...queue,
      items: [],
      currentIndex: 0,
    });
    onClose();
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Play failed:", error);
          setIsPlaying(false);
        });
      }
    }
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const newTime = (value[0] / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0] / 100;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, video.currentTime - 10);
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.min(duration, video.currentTime + 10);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getFileTypeColor = (type: FileType) => {
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
  };

  const getRepeatIcon = () => {
    switch (queue.repeatMode) {
      case "one":
        return <Repeat1 className="h-4 w-4" />;
      case "all":
        return <Repeat className="h-4 w-4" />;
      default:
        return <Repeat className="h-4 w-4" />;
    }
  };

  const getRepeatColor = () => {
    return queue.repeatMode !== "none" ? "default" : "outline";
  };

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

      {/* Queue Panel */}
      {showQueue && (
        <div className="fixed bottom-32 right-4 w-96 max-h-96 bg-background border rounded-lg shadow-lg">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Queue ({queue.items.length})
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearQueue}
                    disabled={queue.items.length === 0}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowQueue(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {queue.items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-2 p-2 rounded border ${
                        index === queue.currentIndex
                          ? "bg-muted border-primary"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            moveQueueItem(index, Math.max(0, index - 1))
                          }
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            moveQueueItem(
                              index,
                              Math.min(queue.items.length - 1, index + 1)
                            )
                          }
                          disabled={index === queue.items.length - 1}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>

                      <div
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => onPlayFromQueue(index)}
                      >
                        <p className="font-medium text-sm truncate">
                          {item.file.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.context}
                        </p>
                        <Badge
                          variant={getFileTypeColor(item.file.type)}
                          className="text-xs mt-1"
                        >
                          {item.file.type}
                        </Badge>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromQueue(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  {queue.items.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      Queue is empty
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}

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
                    {queue.items.length > 1 && (
                      <Badge variant="secondary" className="text-xs">
                        {queue.currentIndex + 1} of {queue.items.length}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playPrevious}
                    disabled={queue.items.length <= 1}
                    title="Previous track"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={skipBackward}
                    title="Skip back 10s"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={togglePlayPause}
                    size="lg"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={skipForward}
                    title="Skip forward 10s"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playNext}
                    disabled={queue.items.length <= 1}
                    title="Next track"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground min-w-[40px]">
                  {formatTime(currentTime)}
                </span>
                <div className="flex-1">
                  <Progress
                    value={duration ? (currentTime / duration) * 100 : 0}
                    className="cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const percent =
                        ((e.clientX - rect.left) / rect.width) * 100;
                      handleSeek([percent]);
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground min-w-[40px]">
                  {formatTime(duration)}
                </span>

                {/* Queue Controls */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant={queue.isShuffled ? "default" : "outline"}
                    size="sm"
                    onClick={toggleShuffle}
                    title="Shuffle"
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={getRepeatColor()}
                    size="sm"
                    onClick={toggleRepeat}
                    title={`Repeat: ${queue.repeatMode}`}
                  >
                    {getRepeatIcon()}
                  </Button>
                  <Button
                    variant={showQueue ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowQueue(!showQueue)}
                    title="Show queue"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2 ml-4">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <div className="w-20">
                    <Progress
                      value={volume * 100}
                      className="cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent =
                          ((e.clientX - rect.left) / rect.width) * 100;
                        handleVolumeChange([percent]);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
