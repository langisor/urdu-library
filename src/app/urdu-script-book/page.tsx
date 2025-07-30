"use client";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlphabetsTable } from "./_components/alphabets-table";
import AlphabetDrawerTable from "./_components/alphabet-drawer";
export default function UrduScriptBookPage() {
  const [playMode, setPlayMode] = React.useState(true);
  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-blue-700 text-yellow-500">
        <h1 className="text-2xl font-bold text-center my-4">
          Interactive Alphabets
        </h1>
        <div className="flex items-center justify-between p-4">
          <Label htmlFor="play-mode">Display Mode : </Label>
          <Switch
            id="play-mode"
            checked={playMode}
            onCheckedChange={(checked) => setPlayMode(checked)}
          />
          <Label htmlFor="play-mode" className="ml-2">
            {playMode ? "Play Mode" : "Drawer Mode"}
          </Label>
        </div>
      </div>
      <p className="text-red-500 text-center text-lg p-4">
        Click on any alphabet to hear its sound. Use the switch to toggle play
        mode or Drawer Mode.
      </p>
      {playMode ? <AlphabetsTable /> : <AlphabetDrawerTable />}
    </div>
  );
}
