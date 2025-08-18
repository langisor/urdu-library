"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Speaker } from "lucide-react";
export function AudioPlayer({
  url,
  withIconButton,
  auto,
  text,
  phonetic,
}: {
  url: string;
  withIconButton?: boolean;
  auto?: boolean;
  text?: string;
  phonetic?: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="flex-1 max-w-64 mx-auto">
      {withIconButton && (
        <div className="flex flex-row justify-center items-center gap-2">
          <Button
            onClick={handleReplay}
            variant="default"
            className="w-10 h-10 rounded-full"
          >
            <Speaker />
          </Button>
          <p>{text}</p>
        </div>
      )}
      <p>{phonetic}</p>
      <video
        ref={videoRef}
        src={url}
        autoPlay={auto}
        preload="auto"
        muted={false}
        playsInline
        hidden
        className="z-0"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
