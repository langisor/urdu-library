"use client";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlphabetsTable } from "./_components/alphabets-table";
import AlphabetDrawerTable from "./_components/alphabet-drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const src = `/media/audio-all/BegUrdu_Alphabet.mp3`;
export default function UrduScriptBookPage() {
  const [playMode, setPlayMode] = React.useState(true);
  return (
    <div className="w-full">
      <h1 className="inter-bold text-center my-4">Interactive Alphabets</h1>
      <div className="grid grid-cols-2 gap-2 p-4">
        <div className="flex items-center">
          <Label htmlFor="play-mode" className="sm:text-3xl">
            Display Mode :{" "}
          </Label>
          <Switch
            id="play-mode"
            checked={playMode}
            onCheckedChange={(checked) => setPlayMode(checked)}
            className="ml-2 w-24 h-12 bg-blue-500 rounded-full relative inline-flex items-center"
          />
          <Label htmlFor="play-mode" className="ml-2 sm:text-3xl">
            {playMode ? "Play Mode" : "Drawer Mode"}
          </Label>
        </div>
        <div>
          <Card className="w-full">
            <CardHeader className="hidden">
              <CardTitle className="hidden">Alphabets</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <audio controls className="w-full h-16">
                <source src={src} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </CardContent>
          </Card>
        </div>
      </div>
      <p className="text-red-500 text-center text-lg sm:text-3xl p-4">
        Click on any alphabet to hear its sound. Use the switch to toggle play
        mode or Drawer Mode.
      </p>
      {playMode ? <AlphabetsTable /> : <AlphabetDrawerTable />}
    </div>
  );
}
