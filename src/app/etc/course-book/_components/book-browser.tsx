"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { AudioFile, Chapter, Unit } from "./difinitions";
import { ChevronDown } from "lucide-react";
import { getAudioUrl } from "./audio-item";
import { ExpandableChapter } from "./chapter";

export default function BookBrowser({ data }: { data: Unit[] }) {
  const [expandedUnit, setExpandedUnit] = useState<number | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [playingAudio, setPlayingAudio] = useState<AudioFile | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup function to pause audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleUnitToggle = (unitNumber: number) => {
    setExpandedUnit(expandedUnit === unitNumber ? null : unitNumber);
    setExpandedChapter(null); // Collapse chapter when a new unit is selected
  };

  const handleChapterToggle = (chapterNumber: number) => {
    setExpandedChapter(
      expandedChapter === chapterNumber ? null : chapterNumber
    );
  };

  const handlePlayPause = (item: AudioFile) => {
    if (playingAudio?.id === item.id) {
      // Pause if the same audio is playing
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      // Play new audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audioUrl = getAudioUrl(item);
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setPlayingAudio(item);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased text-gray-900">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden md:p-8 p-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-2">
            Book Navigation
          </h1>
          <p className="text-gray-600">
            Browse and listen to your book's audio content.
          </p>
        </header>

        <div className="space-y-6">
          {data.map((unit: Unit) => (
            <div
              key={unit.unit_number}
              className="bg-white rounded-xl shadow-md overflow-hidden ring-1 ring-gray-200"
            >
              <button
                className="flex items-center justify-between w-full p-6 text-left font-bold text-xl text-gray-900 transition-colors duration-200 hover:bg-gray-50"
                onClick={() => handleUnitToggle(unit.unit_number)}
              >
                <span>{unit.unit_title}</span>
                <ChevronDown
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    expandedUnit === unit.unit_number
                      ? "rotate-180"
                      : "rotate-0"
                  }`}
                />
              </button>
              {expandedUnit === unit.unit_number && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Chapters
                  </h3>
                  <div className="space-y-2">
                    {unit.chapters.map((chapter: Chapter) => (
                      <ExpandableChapter
                        key={chapter.chapter_number}
                        chapter={chapter}
                        playingAudio={playingAudio}
                        onPlayPause={handlePlayPause}
                        expanded={expandedChapter === chapter.chapter_number}
                        onToggle={() =>
                          handleChapterToggle(chapter.chapter_number)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 Book Navigation App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
