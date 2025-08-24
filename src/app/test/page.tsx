"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlayer } from "../_components/use-player";

const audioUrl1 = "/media/mondly/audios/_5j_NWTG4kjCB1YiyYHDH08u1-P1M9Ck";
const audioUrl2 = "/media/mondly/audios/_9YmF7BylhHp2wIS6CYgZlL2tXVINGAF";

export default function Test() {
  const { play, stop, isPlaying } = usePlayer({ audioUrl: audioUrl1, autoPlay: false });

 
  return (
    <div>
      <h1 className="text-2xl font-bold">Test</h1>
      <Card>
        <CardHeader>
          <CardTitle>Video Player</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button onClick={() => play()} className="w-1/3">Play</Button>
          <Button onClick={() => stop()} className="w-1/3">Stop</Button>
          <p className={isPlaying ? "text-green-500" : "text-red-500"}>
            {isPlaying ? "Playing" : "Not Playing"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function VideoPlayer({ url }: { url: string }) {
  return (
    <figure id="videoContainer">
      <video id="video" controls preload="metadata" poster="img/poster.jpg">
        <source src={url} type="video/mp4" />
        <source src={url} type="video/webm" />
        <source src={url} type="video/ogg" />
        {/* Offer download */}
        <a href="video/tears-of-steel-battle-clip-medium.mp4">Download MP4</a>
      </video>
      <figcaption>
        © Blender Foundation |
        <a href="http://mango.blender.org">mango.blender.org</a>
      </figcaption>
    </figure>
  );
}
