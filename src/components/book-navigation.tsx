"use client";

import React, { useState, useRef, useEffect } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronRight, Book } from "lucide-react";

import audioFilesData from "./audio-book-data";

// Define types for our data structure
interface AudioFile {
  filename: string;
  title?: string;
}

interface Chapter {
  folder_name: string;
  files: AudioFile[];
}

interface Unit {
  folder_name: string;
  chapters: Record<string, Chapter>;
}

interface BookStructure {
  root_files: AudioFile[];
  units: Record<string, Unit>;
  sound_and_script: {
    lessons: Record<
      string,
      {
        folder_name: string;
        path: string;
        files: Array<{
          filename: string;
          type: string;
          exercise_number: string;
          title: string;
        }>;
      }
    >;
  };
}

// The audio book data provided in the JSON file
const bookMetadata = audioFilesData.structure as BookStructure;
const bookToc = audioFilesData.structure as BookStructure;

// Main App component
const BookNavigation = () => {
  // State to manage the open/close state of the Sound and Script sheet
  const [isSoundAndScriptSheetOpen, setIsSoundAndScriptSheetOpen] =
    useState(false);
  // State to manage the open/close state of the Units sheet
  const [isUnitsSheetOpen, setIsUnitsSheetOpen] = useState(false);
  // State to store the currently selected audio file path and title for playback
  const [currentAudio, setCurrentAudio] = useState<{
    path: string;
    title: string;
  } | null>(null);
  // State to store the currently selected unit for navigation within the Units sheet
  const [selectedUnitInSheet, setSelectedUnitInSheet] = useState<string | null>(
    null
  );
  // State to store the currently selected lesson for navigation within the Sound and Script sheet
  const [selectedLessonInSheet, setSelectedLessonInSheet] = useState<
    string | null
  >(null);
  // State to store the currently selected chapter for navigation within the Units sheet
  const [selectedChapterInSheet, setSelectedChapterInSheet] = useState<
    string | null
  >(null);

  // Ref for the audio element to control playback
  const audioRef = useRef<HTMLAudioElement>(null);

  // Function to play an audio file
  const playAudio = (audioFilePath: string, audioTitle: string) => {
    setCurrentAudio({ path: audioFilePath, title: audioTitle });
    // Pause any currently playing audio before starting a new one
    if (audioRef.current) {
      audioRef.current.pause();
    }
    // Set the new audio source and play
    setTimeout(() => {
      // Small delay to ensure the audio element updates its source
      if (audioRef.current) {
        audioRef.current.load(); // Load the new audio source
        audioRef.current
          .play()
          .catch((error) => console.error("Error playing audio:", error));
      }
    }, 0);
  };

  // Function to reset sheet navigation when closing
  const resetSoundAndScriptSheet = () => {
    setSelectedLessonInSheet(null);
    setIsSoundAndScriptSheetOpen(false);
  };

  const resetUnitsSheet = () => {
    setSelectedUnitInSheet(null);
    setSelectedChapterInSheet(null);
    setIsUnitsSheetOpen(false);
  };

  // Function to get unit icon
  const getUnitIcon = (unitNumber: number) => {
    // This is a placeholder - replace with your actual icon components
    return Book; // Default icon
  };

  // State for expanded items
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Function to render a unit
  const renderUnit = (unit: { unit?: number; title?: string }) => {
    if (unit.unit === undefined) {
      console.error("Unit number is undefined for:", unit);
      return null;
    }

    const itemId = `unit-${unit.unit}`;
    const isExpanded = expandedItems.has(itemId);
    const IconComponent = getUnitIcon(unit.unit);

    return (
      <div key={itemId} className="mb-4">
        <div
          className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
          onClick={() => {
            const newExpanded = new Set(expandedItems);
            if (isExpanded) {
              newExpanded.delete(itemId);
            } else {
              newExpanded.add(itemId);
            }
            setExpandedItems(newExpanded);
          }}
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <IconComponent className="h-4 w-4" />
          <span>{unit.title || `Unit ${unit.unit}`}</span>
        </div>
        {isExpanded && (
          <div className="ml-6 mt-2 space-y-2">
            {/* Add unit content here */}
          </div>
        )}
      </div>
    );
  };

  // Interface for lesson object
  interface Lesson {
    folder_name: string;
    path: string;
    files: Array<{
      filename: string;
      type: string;
      exercise_number: string;
      title: string;
    }>;
  }

  // Content for the Sound and Script Sheet
  const renderSoundAndScriptSheetContent = () => {
    if (selectedLessonInSheet) {
      // Get lessons object with proper type assertion
      const lessonsObj = audioFilesData.structure.sound_and_script
        .lessons as Record<string, Lesson>;

      // Find the lesson with matching folder_name
      let lesson: Lesson | null = null;
      for (const key in lessonsObj) {
        if (
          Object.prototype.hasOwnProperty.call(lessonsObj, key) &&
          lessonsObj[key].folder_name === selectedLessonInSheet
        ) {
          lesson = lessonsObj[key];
          break;
        }
      }

      if (!lesson) {
        return (
          <div className="p-4">
            <p>Lesson not found</p>
          </div>
        );
      }

      return (
        <div className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>{lesson.folder_name}</SheetTitle>
            <SheetDescription>Select an audio file to play.</SheetDescription>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            <Button
              onClick={() => setSelectedLessonInSheet(null)}
              className="mb-4 bg-yellow-500 hover:bg-yellow-600"
            >
              Back to Lessons
            </Button>
            {lesson.files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span className="text-gray-800 font-medium">
                  {file.title || file.filename}
                </span>
                <Button
                  onClick={() =>
                    playAudio(file.filename, file.title || file.filename)
                  }
                  className="bg-purple-500 hover:bg-purple-600 text-white text-sm py-2 px-4 rounded-lg"
                >
                  Play
                </Button>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Display list of lessons
      return (
        <div className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Sound and Script</SheetTitle>
            <SheetDescription>
              Select a lesson to view its audio files.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto p-4 grid grid-cols-1 gap-4">
            {Object.entries(
              audioFilesData.structure.sound_and_script.lessons
            ).map(([lessonNumber, lesson]) => (
              <Button
                key={lessonNumber}
                onClick={() => setSelectedLessonInSheet(lessonNumber)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800"
              >
                {lesson.folder_name}
              </Button>
            ))}
          </div>
        </div>
      );
    }
  };

  // Content for the Units Sheet
  const renderUnitsSheetContent = () => {
    if (selectedUnitInSheet && selectedChapterInSheet) {
      // Display files for a selected chapter
      // Access units with proper typing
      const units = (audioFilesData.structure as BookStructure).units;
      const unit = units[selectedUnitInSheet];
      if (!unit) return null;

      const chapters = unit.chapters;
      const chapter = chapters[selectedChapterInSheet];
      if (!chapter) return null;
      return (
        <div className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>
              Unit {selectedUnitInSheet} - Chapter {selectedChapterInSheet}
            </SheetTitle>
            <SheetDescription>Select an audio file to play.</SheetDescription>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            <Button
              onClick={() => setSelectedChapterInSheet(null)}
              className="mb-4 bg-yellow-500 hover:bg-yellow-600"
            >
              Back to Chapters
            </Button>
            {chapter.files.map((file: any, index: any) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span className="text-gray-800 font-medium">
                  {file.title || file.filename}
                </span>
                <Button
                  onClick={() =>
                    playAudio(file.filename, file.title || file.filename)
                  }
                  className="bg-purple-500 hover:bg-purple-600 text-white text-sm py-2 px-4 rounded-lg"
                >
                  Play
                </Button>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (selectedUnitInSheet) {
      // Display chapters for a selected unit
      // Add type assertion to handle string index access
      const units = audioFilesData.structure.units as Record<string, any>;
      const unit = units[selectedUnitInSheet];
      return (
        <div className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>{unit.folder_name}</SheetTitle>
            <SheetDescription>
              Select a chapter to view its audio files.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto p-4 grid grid-cols-1 gap-4">
            <Button
              onClick={() => setSelectedUnitInSheet(null)}
              className="mb-4 bg-yellow-500 hover:bg-yellow-600"
            >
              Back to Units
            </Button>
            {Object.entries(unit.chapters).map(
              ([chapterNumber, chapter]: any) => (
                <Button
                  key={chapterNumber}
                  onClick={() => setSelectedChapterInSheet(chapterNumber)}
                  className="bg-green-100 hover:bg-green-200 text-green-800"
                >
                  {chapter.folder_name}
                </Button>
              )
            )}
          </div>
        </div>
      );
    } else {
      // Display list of units
      return (
        <div className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Units</SheetTitle>
            <SheetDescription>
              Select a unit to view its chapters.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto p-4 grid grid-cols-1 gap-4">
            {Object.entries(audioFilesData.structure.units).map(
              ([unitNumber, unit]) => (
                <Button
                  key={unitNumber}
                  onClick={() => setSelectedUnitInSheet(unitNumber)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800"
                >
                  {unit.folder_name}
                </Button>
              )
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4 font-inter">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 font-inter">
          Audio Book Navigator
        </h1>
        <div className="flex space-x-6 mb-8">
          <SheetTrigger
            onClick={() => setIsSoundAndScriptSheetOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sound and Script
          </SheetTrigger>
          <SheetTrigger
            onClick={() => setIsUnitsSheetOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Units
          </SheetTrigger>
        </div>

        {audioFilesData.structure.root_files &&
          audioFilesData.structure.root_files.length > 0 && (
            <div className="mt-4 w-full max-w-md bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                General Audio Files
              </h2>
              {audioFilesData.structure.root_files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-2 shadow-sm"
                >
                  <span className="text-gray-800 font-medium">
                    {file.description || file.filename}
                  </span>
                  <Button
                    onClick={() =>
                      playAudio(
                        file.filename,
                        file.description || file.filename
                      )
                    }
                    className="bg-purple-500 hover:bg-purple-600 text-white text-sm py-2 px-4 rounded-lg"
                  >
                    Play
                  </Button>
                </div>
              ))}
            </div>
          )}
      </div>

      {/* Sound and Script Sheet */}
      <Sheet
        open={isSoundAndScriptSheetOpen}
        onOpenChange={resetSoundAndScriptSheet}
      >
        <SheetContent side="left" className="w-full md:w-1/3">
          {renderSoundAndScriptSheetContent()}
        </SheetContent>
      </Sheet>

      {/* Units Sheet */}
      <Sheet open={isUnitsSheetOpen} onOpenChange={resetUnitsSheet}>
        <SheetContent side="right" className="w-full md:w-1/3">
          {renderUnitsSheetContent()}
        </SheetContent>
      </Sheet>

      {/* Audio Player Section */}
      {currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col items-center shadow-lg z-50">
          <h3 className="text-lg font-semibold mb-2">
            Now Playing: {currentAudio.title}
          </h3>
          <audio
            ref={audioRef}
            controls
            src={currentAudio.path}
            className="w-full max-w-xl"
            onEnded={() => setCurrentAudio(null)} // Clear current audio when it ends
            onError={(e) => console.error("Audio error:", e)}
          >
            Your browser does not support the audio element.
          </audio>
          <Button
            onClick={() => {
              setCurrentAudio(null);
              if (audioRef.current) {
                audioRef.current.pause();
              }
            }}
            className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-4 rounded-lg"
          >
            Stop Playback
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookNavigation;
