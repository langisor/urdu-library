"use client";
import { Button } from "@/components/ui/button";
import { AudioFile } from "./difinitions";
import { Play, Pause, Music } from "lucide-react";
// Helper function to dynamically construct the audio URL
export const getAudioUrl = (item: AudioFile): string => {
  const { unit, chapter, id } = item;
  // const unitNumber = String(unit).padStart(2, "0");
  const unit_number=unit;
  console.log("unitNumber", unit_number);

  const chapterNumber = String(chapter).padStart(2, "0");
  console.log("chapterNumber", chapterNumber);
  console.log("id", id);
  return `/media/audio-all/Unit${unit_number}/Chapter${chapterNumber}/${id}`;
};

// Props for AudioItem component
export interface AudioItemProps {
  item: AudioFile;
  isPlaying: boolean;
  onPlayPause: (item: AudioFile) => void;
}

// Component for a single audio item
export const AudioItem: React.FC<AudioItemProps> = ({
  item,
  isPlaying,
  onPlayPause,
}) => {
  return (
    <div className="flex items-center justify-between p-2 my-2 bg-gray-100 rounded-lg shadow-sm">
      <div className="flex items-center flex-grow">
        <Music className="w-5 h-5 mr-2 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          {item.type} {item.number}
        </span>
      </div>
      <Button
        variant="outline"
        onClick={() => onPlayPause(item)}
        className="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};
