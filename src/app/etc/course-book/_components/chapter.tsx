"use client";
import { ChevronDown } from "lucide-react";
import { AudioFile, Chapter } from "./difinitions";
import { Button } from "@/components/ui/button";
import { FullscreenPlayer } from "./fullscrren-player";
// Props for Chapter component
interface ChapterProps {
  chapter: Chapter;
   
  expanded: boolean;
  onToggle: () => void;
}

// Component for a single expandable chapter
export const ExpandableChapter: React.FC<ChapterProps> = ({
  chapter,
  
  expanded,
  onToggle,
}) => {
  const hasAudio = chapter.vocs.length > 0 || chapter.exers.length > 0;

  return (
    <div className="my-2 border-b border-gray-200">
      <Button
        variant="outline"
        className="flex items-center justify-between w-full p-4 text-left font-semibold text-gray-800 bg-white rounded-lg transition-all duration-300 hover:bg-gray-50"
        onClick={onToggle}
        disabled={!hasAudio}
      >
        <span>
          Chapter {chapter.chapter_number}: {chapter.chapter_title}
        </span>
        {hasAudio && (
          <ChevronDown
            className={`w-5 h-5 transform transition-transform duration-300 ${
              expanded ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </Button>
      {expanded && hasAudio && (
        <div className="p-4 bg-gray-50 rounded-b-lg ">
          {chapter.vocs.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-4 ">
              {chapter.vocs.map((voc) => (
                <FullscreenPlayer
                  key={voc.id}
                  item={voc}
                  disabled={!hasAudio}
                />
              ))}
            </div>
          )}
          {chapter.exers.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-4  ">
              {chapter.exers.map((exer) => (
                <FullscreenPlayer
                  key={exer.id}
                  item={exer}
                  disabled={!hasAudio}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
