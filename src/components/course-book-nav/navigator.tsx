"use client";

import { useState, useEffect, useRef } from "react";
import {
  fetchMediaData,
  Directory,
  AudioFile,
  MediaDirectoryTree,
} from "@/data/helpers/utils";

// Shadcn UI Components
import { Button } from "@/components/ui/button"; // Assuming path to Shadcn Button
import { Card, CardContent } from "@/components/ui/card"; // Assuming path to Shadcn Card
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Assuming path to Shadcn Breadcrumb

// Lucide React Icons
import { Folder, FileAudio, ChevronLeft, Volume2 } from "lucide-react";
import React from "react";

// Define a type for the current path in the navigation
type PathSegment = {
  name: string;
  long_name?: string;
  contents?: (Directory | AudioFile)[]; // Store contents for easier navigation
};

interface BookNavigationProps {
  initialData: MediaDirectoryTree | null;
}

/**
 * @function BookNavigation
 * @description The main React component for the Book Navigation application.
 * This component handles rendering the navigation tree and managing audio playback.
 * It accepts initial data as a prop and uses Shadcn UI components for a modern look and feel.
 */
export default function BookNavigation({ initialData }: BookNavigationProps) {
  const [mediaTree, setMediaTree] = useState<MediaDirectoryTree | null>(
    initialData
  );
  const [currentPath, setCurrentPath] = useState<PathSegment[]>([]);
  const [currentDirectoryContents, setCurrentDirectoryContents] = useState<
    (Directory | AudioFile)[] | null
  >(null);
  const [selectedAudio, setSelectedAudio] = useState<AudioFile | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loading, setLoading] = useState<boolean>(!initialData); // Set loading true if initialData is not provided
  const [error, setError] = useState<string | null>(null);

  /**
   * @useEffect
   * @description Initializes the component with initialData or fetches it if not provided.
   * Sets the initial media tree and the contents of the root directory.
   */
  useEffect(() => {
    const initializeData = async () => {
      if (initialData) {
        setMediaTree(initialData);
        if (initialData.length > 0 && initialData[0].type === "directory") {
          setCurrentPath([
            {
              name: initialData[0].name,
              long_name: initialData[0].name,
              contents: initialData[0].contents,
            },
          ]);
          setCurrentDirectoryContents(initialData[0].contents);
        }
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const data = await fetchMediaData(); // Use the embedded fetchMediaData
          setMediaTree(data);
          if (data && data.length > 0 && data[0].type === "directory") {
            setCurrentPath([
              {
                name: data[0].name,
                long_name: data[0].name,
                contents: data[0].contents,
              },
            ]);
            setCurrentDirectoryContents(data[0].contents);
          }
        } catch (err) {
          console.error("Failed to fetch media data:", err);
          setError("Failed to load book data. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };
    initializeData();
  }, [initialData]); // Depend on initialData to re-initialize if it changes

  /**
   * @function handleDirectoryClick
   * @description Handles navigation into a sub-directory.
   * Updates the current path and the displayed contents.
   * @param directory The Directory object to navigate into.
   */
  const handleDirectoryClick = (directory: Directory) => {
    setCurrentPath((prevPath) => [
      ...prevPath,
      {
        name: directory.name,
        long_name: directory.long_name,
        contents: directory.contents,
      },
    ]);
    setCurrentDirectoryContents(directory.contents);
  };

  /**
   * @function handleBackClick
   * @description Handles navigating up one level in the directory tree.
   * Updates the current path and the displayed contents.
   */
  const handleBackClick = () => {
    setCurrentPath((prevPath) => {
      const newPath = prevPath.slice(0, prevPath.length - 1);
      if (newPath.length === 0 && mediaTree) {
        // Go back to the root if no more segments in path
        return [
          {
            name: mediaTree[0].name,
            long_name: mediaTree[0].name,
            contents: mediaTree[0].contents,
          },
        ];
      } else if (newPath.length > 0) {
        return newPath;
      }
      return prevPath; // Should not happen if logic is correct
    });
  };

  /**
   * @useEffect
   * @description Updates the current directory contents when the path changes.
   * This ensures the displayed list matches the current navigation level.
   */
  useEffect(() => {
    if (!mediaTree || currentPath.length === 0) return;

    let currentNavContents: (Directory | AudioFile)[] | null = mediaTree;

    // Traverse the mediaTree based on the currentPath to find the correct contents
    for (let i = 0; i < currentPath.length; i++) {
      const segment = currentPath[i];
      if (!currentNavContents) {
        currentNavContents = null;
        break;
      }
      const found = currentNavContents.find(
        (item) => item.type === "directory" && item.name === segment.name
      ) as Directory | undefined;
      if (found) {
        currentNavContents = found.contents;
      } else {
        currentNavContents = null; // Path segment not found
        break;
      }
    }
    setCurrentDirectoryContents(currentNavContents);
  }, [currentPath, mediaTree]);

  /**
   * @function handleAudioClick
   * @description Handles playing an audio file.
   * Sets the selected audio, updates the audio player source, and plays the audio.
   * @param audioFile The AudioFile object to play.
   */
  const handleAudioClick = (audioFile: AudioFile) => {
    setSelectedAudio(audioFile);
    if (audioRef.current) {
      // Construct a dummy URL for demonstration. In a real app, this would be a valid audio file URL.
      audioRef.current.src = `https://example.com/audio/${audioFile.name}`;
      audioRef.current.load(); // Load the new audio source
      audioRef.current
        .play()
        .catch((e) => console.error("Error playing audio:", e));
      setIsPlaying(true);
    }
  };

  /**
   * @function handlePlayPause
   * @description Toggles the play/pause state of the audio player.
   */
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.error("Error playing audio:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  /**
   * @function renderBreadcrumbs
   * @description Renders the breadcrumb navigation for the current path using Shadcn Breadcrumb.
   * @returns JSX for the breadcrumbs.
   */
  const renderBreadcrumbs = () => (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {currentPath.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                className={
                  index === currentPath.length - 1
                    ? "text-primary"
                    : "text-muted-foreground cursor-pointer hover:text-primary"
                }
              >
                {segment.long_name ||
                  segment.name
                    .replace("/media/audio-all", "Home")
                    .replace("ssl", "Lessons")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < currentPath.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <div className="text-xl font-semibold text-foreground">
          Loading book data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
        <div className="text-xl font-semibold">{error}</div>
      </div>
    );
  }

  if (!mediaTree || currentDirectoryContents === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <div className="text-xl font-semibold text-foreground">
          No data available.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-6 text-center">
          Urdu Language Book Navigation
        </h1>

        {/* Breadcrumbs */}
        {renderBreadcrumbs()}

        {/* Back Button */}
        {currentPath.length > 1 && (
          <Button onClick={handleBackClick} variant="outline" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        )}

        {/* Directory and File List */}
        <div className="space-y-3">
          {currentDirectoryContents.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
              onClick={() => {
                if (item.type === "directory") {
                  handleDirectoryClick(item);
                } else {
                  handleAudioClick(item);
                }
              }}
            >
              <CardContent className="flex items-center p-4">
                {item.type === "directory" ? (
                  <Folder className="h-6 w-6 text-blue-500 mr-3" />
                ) : (
                  <FileAudio className="h-6 w-6 text-green-500 mr-3" />
                )}
                <span className="font-medium">
                  {(item as Directory).long_name || item.name}
                </span>
                {(item as Directory).page_number && (
                  <span className="ml-auto text-muted-foreground text-sm">
                    Page: {(item as Directory).page_number}
                  </span>
                )}
                {item.type === "file" && (
                  <span className="ml-auto text-muted-foreground text-sm flex items-center">
                    {selectedAudio?.name === item.name && isPlaying ? (
                      <span className="text-green-600 font-semibold flex items-center">
                        <Volume2 className="h-4 w-4 mr-1" /> Playing...
                      </span>
                    ) : (
                      (item as AudioFile).type_audio || "Audio"
                    )}
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Audio Player */}
        {selectedAudio && (
          <div className="mt-8 p-4 bg-secondary text-secondary-foreground rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Now Playing:</h3>
            <p className="text-center mb-4">{selectedAudio.name}</p>
            <audio
              ref={audioRef}
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="w-full max-w-md"
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}
