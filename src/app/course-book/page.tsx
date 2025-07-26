"use client";

import { useState } from "react";
import BookNavigation from "@/components/course-book-nav/navigator";
import AudioPlayer from "@/components/course-book-nav/audio-player";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Headphones } from "lucide-react";
import tocData from "@/data/toc-data.json";

interface MediaFile {
  filename: string;
  path: string;
  type: string;
  title: string;
  exercise_number?: string;
  vocabulary_number?: string;
}

interface TocItem {
  id: string;
  title: string;
  page: string;
  type?: string;
  topics?: string[];
  media_files: MediaFile[];
}

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<TocItem | null>(null);
  const [currentAudio, setCurrentAudio] = useState<MediaFile | null>(null);

  const handleItemSelect = (item: TocItem) => {
    setSelectedItem(item);
  };

  const handleAudioSelect = (audioFile: MediaFile) => {
    setCurrentAudio(audioFile);
  };

  const handleAudioEnded = () => {
    console.log("Audio playback ended");
  };

  const handleAudioError = (error: string) => {
    console.error("Audio error:", error);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BookNavigation
            onItemSelect={handleItemSelect}
            onAudioSelect={handleAudioSelect}
          />
        </div>

        <div className="space-y-4">
          {/* Audio Player */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Headphones className="h-5 w-5" />
                Audio Player
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <AudioPlayer
                src={currentAudio?.path || null}
                title={currentAudio?.title}
                onEnded={handleAudioEnded}
                onError={handleAudioError}
              />
            </CardContent>
          </Card>

          {/* Selected Section Info */}
          {selectedItem && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Book className="h-5 w-5" />
                  Selected Section
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold">{selectedItem.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Page {selectedItem.page}
                  </p>
                </div>

                {selectedItem.topics && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Topics Covered:
                    </h4>
                    <div className="space-y-1">
                      {selectedItem.topics.map((topic, index) => (
                        <div
                          key={index}
                          className="text-sm text-muted-foreground pl-2 border-l-2 border-muted"
                        >
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.media_files &&
                  selectedItem.media_files.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Headphones className="h-4 w-4" />
                        Media Resources ({selectedItem.media_files.length})
                      </h4>
                      <div className="space-y-2">
                        {selectedItem.media_files.map((file, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-2 rounded cursor-pointer hover:opacity-80 ${
                              file.type === "exercise"
                                ? "bg-blue-50 dark:bg-blue-950/20"
                                : file.type === "vocabulary"
                                ? "bg-green-50 dark:bg-green-950/20"
                                : "bg-gray-50 dark:bg-gray-950/20"
                            }`}
                            onClick={() => handleAudioSelect(file)}
                          >
                            <div>
                              <div className="text-sm font-medium">
                                {file.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    file.type === "exercise"
                                      ? "border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300"
                                      : file.type === "vocabulary"
                                      ? "border-green-300 text-green-700 dark:border-green-700 dark:text-green-300"
                                      : "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300"
                                  }`}
                                >
                                  {file.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          )}

          {/* Book Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Book Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Audio Files:</span>
                <Badge variant="secondary">
                  {tocData.statistics.total_audio_files}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Exercise Files:</span>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tocData.statistics.files_by_type.exercise}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vocabulary Files:</span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  {tocData.statistics.files_by_type.vocabulary}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>General Files:</span>
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                >
                  {tocData.statistics.files_by_type.general}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sound & Script Lessons:</span>
                <Badge variant="secondary">
                  {tocData.statistics.total_sound_script_lessons}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Units:</span>
                <Badge variant="secondary">
                  {tocData.statistics.total_units}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Chapters:</span>
                <Badge variant="secondary">
                  {tocData.statistics.total_chapters}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
