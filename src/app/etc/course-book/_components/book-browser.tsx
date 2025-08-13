"use client";
import React, { useState, FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  PlayCircle,
  LibraryBig,
  Volume2,
  Search,
  Menu,
  X,
} from "lucide-react";
import { BookData } from "./definitions";
import { AudioFile, Chapter, Lesson, Part, Unit } from "./definitions";
import BookCover from "./book-cover";

// Define a type for the selected item, which can be a chapter or a lesson
type SelectedItem =
  | (Chapter & { type: "chapter"; unitNumber: number })
  | (Lesson & { type: "lesson"; partNumber: number });

interface AudioPlayerProps {
  src: string | undefined;
}

export default function BookBrowser({ data }: { data: BookData }) {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [openCollapsibles, setOpenCollapsibles] = useState<
    Record<string, boolean>
  >({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const baseUrl: string = data.media.baseUrl;

  const handleItemClick = (
    item: Chapter | Lesson,
    type: "chapter" | "lesson",
    parentNumber: number
  ) => {
    if (type === "chapter") {
      setSelectedItem({ ...(item as Chapter), type, unitNumber: parentNumber });
    } else {
      setSelectedItem({ ...(item as Lesson), type, partNumber: parentNumber });
    }
    // Close sidebar on mobile after an item is selected
    setIsSidebarOpen(false);
  };

  const handleCollapsibleToggle = (key: string) => {
    setOpenCollapsibles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredUnits: Unit[] = data.units.filter(
    (unit) =>
      unit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.chapters.some((chapter) =>
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const filteredParts: Part[] = data.parts.filter(
    (part) =>
      part.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.lessons.some((lesson) =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const renderAudioButtons = (
    files: AudioFile[] | undefined,
    title: string,
    type: "vocabulary" | "exercise"
  ) => {
    if (!files || files.length === 0) {
      return (
        <p className="text-gray-500 italic">
          No {title.toLowerCase()} files available.
        </p>
      );
    }
    return (
      <div className="space-y-2">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <Button
              key={index}
              onClick={() => playAudio(`${baseUrl}${file.audioFile}`)}
              className="flex items-center space-x-1"
            >
              <PlayCircle className="h-4 w-4 mr-1" />
              {type === "vocabulary"
                ? `V${file.number}`
                : `Ex${file.number}${
                    file.subNumber ? `.${file.subNumber}` : ""
                  }`}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const playAudio = (audioFile: string) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  return (
    <div
      className="flex min-h-screen  font-sans text-left"
     
    >
      {/* Sidebar Toggle Button for Mobile */}
      <div className="md:hidden fixed top-16 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className=""
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 w-full md:w-1/4 lg:w-1/5 bg-white border-r border-gray-200 shadow-lg p-4 z-40
                     transform transition-transform duration-300 md:relative md:translate-x-0
                     ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center mb-6">
          <LibraryBig className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-xl font-bold text-indigo-600 truncate">
            {data.title}
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search chapters or lessons..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="w-full pl-9 rounded-full"
          />
        </div>

        <ScrollArea className="h-[calc(100vh-160px)]">
          {/* Render Filtered Units */}
          {filteredUnits.length > 0 ? (
            filteredUnits.map((unit) => (
              <Collapsible
                key={unit.unitNumber}
                open={openCollapsibles[`unit-${unit.unitNumber}`]}
                onOpenChange={() =>
                  handleCollapsibleToggle(`unit-${unit.unitNumber}`)
                }
                className="mb-2"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                    <h2 className="font-semibold text-base flex-1">
                      Unit {unit.unitNumber}: {unit.title}
                    </h2>
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-200"
                      style={{
                        transform: openCollapsibles[`unit-${unit.unitNumber}`]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-4 space-y-1">
                    {unit.chapters
                      .filter((chapter) =>
                        chapter.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((chapter) => (
                        <div
                          key={chapter.chapterNumber}
                          onClick={() =>
                            handleItemClick(chapter, "chapter", unit.unitNumber)
                          }
                          className={`p-2 rounded-md cursor-pointer transition-colors duration-200
                          ${
                            selectedItem?.title === chapter.title
                              ? "bg-indigo-100 text-indigo-700 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          Chapter {chapter.chapterNumber}: {chapter.title}
                        </div>
                      ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No units found.</p>
          )}

          {/* Render Filtered Parts */}
          {filteredParts.length > 0 ? (
            filteredParts.map((part) => (
              <Collapsible
                key={part.partNumber}
                open={openCollapsibles[`part-${part.partNumber}`]}
                onOpenChange={() =>
                  handleCollapsibleToggle(`part-${part.partNumber}`)
                }
                className="mb-2"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                    <h2 className="font-semibold text-base flex-1">
                      Part {part.partNumber}: {part.title}
                    </h2>
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-200"
                      style={{
                        transform: openCollapsibles[`part-${part.partNumber}`]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-4 space-y-1">
                    {part.lessons
                      .filter((lesson) =>
                        lesson.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((lesson) => (
                        <div
                          key={lesson.lessonNumber}
                          onClick={() =>
                            handleItemClick(lesson, "lesson", part.partNumber)
                          }
                          className={`p-2 rounded-md cursor-pointer transition-colors duration-200
                          ${
                            selectedItem?.title === lesson.title
                              ? "bg-indigo-100 text-indigo-700 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          Lesson {lesson.lessonNumber}: {lesson.title}
                        </div>
                      ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No parts found.</p>
          )}
        </ScrollArea>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:ml-0 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          {selectedItem ? (
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-indigo-700">
                  {selectedItem.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {"unitNumber" in selectedItem
                    ? `Unit ${selectedItem.unitNumber}, Chapter ${selectedItem.chapterNumber}`
                    : `Part ${selectedItem.partNumber}, Lesson ${selectedItem.lessonNumber}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Use a type guard to conditionally render vocabulary for chapters */}
                {"unitNumber" in selectedItem &&
                  selectedItem.media &&
                  selectedItem.media.vocabulary && (
                    <div className="border-b pb-4">
                      {renderAudioButtons(
                        selectedItem.media.vocabulary,
                        "Vocabulary",
                        "vocabulary"
                      )}
                    </div>
                  )}
                {selectedItem.media && selectedItem.media.exercises && (
                  <div>
                    {renderAudioButtons(
                      selectedItem.media.exercises,
                      "Exercises",
                      "exercise"
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between items-center text-gray-500 italic text-sm">
                <span>Page: {selectedItem.page}</span>
              </CardFooter>
            </Card>
          ) : (
            <BookCover
              title={data.title}
              language={data.language}
              coverImage={data.coverImage}
              totalPages={data.totalPages}
              structure={data.structure}
            />
          )}
        </div>
      </main>
    </div>
  );
}

const AudioPlayer: FC<AudioPlayerProps> = ({ src }) => {
  if (!src) {
    return null;
  }
  return (
    <div className="mt-4 flex items-center space-x-2">
      <Volume2 className="h-6 w-6 text-gray-500" />
      <audio controls className="w-full rounded-full">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};
