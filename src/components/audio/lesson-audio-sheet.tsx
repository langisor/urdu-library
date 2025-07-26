"use client";

import type React from "react";
import { useState } from "react";
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
import { AudioPlayer } from "./audio-player";
import { getAudioForLesson, type LessonAudio } from "@/lib/audio-mapper";
import { Headphones, BookOpen } from "lucide-react";

interface LessonAudioSheetProps {
  children: React.ReactNode;
  lessonTitle: string;
  unitNumber?: number;
  chapterNumber?: number;
  lessonNumber?: number;
  page?: string | number;
}

export const LessonAudioSheet: React.FC<LessonAudioSheetProps> = ({
  children,
  lessonTitle,
  unitNumber,
  chapterNumber,
  lessonNumber,
  page,
}) => {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const lessonAudio: LessonAudio = getAudioForLesson(
    unitNumber,
    chapterNumber,
    lessonNumber
  );
  const hasAudio =
    lessonAudio.exercises.length > 0 || lessonAudio.vocabulary.length > 0;

  const handleAudioPlay = (audioId: string) => {
    setActiveAudioId(audioId);
  };

  if (!hasAudio) {
    return <>{children}</>;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild onClick={() => setIsOpen(true)}>
        <div className="relative cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-primary rounded-full flex items-center justify-center">
              <Headphones className="h-2 w-2 text-primary-foreground" />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <SheetTitle className="text-left">{lessonTitle}</SheetTitle>
              <SheetDescription className="text-left">
                {unitNumber && chapterNumber ? (
                  <>
                    Unit {unitNumber}, Chapter {chapterNumber}
                  </>
                ) : lessonNumber ? (
                  <>Lesson {lessonNumber}</>
                ) : null}
                {page && <> • Page {page}</>}
              </SheetDescription>
            </div>
          </div>

          <div className="flex gap-2">
            {lessonAudio.exercises.length > 0 && (
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
              >
                {lessonAudio.exercises.length} Exercise
                {lessonAudio.exercises.length !== 1 ? "s" : ""}
              </Badge>
            )}
            {lessonAudio.vocabulary.length > 0 && (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
              >
                {lessonAudio.vocabulary.length} Vocabulary
              </Badge>
            )}
          </div>
        </SheetHeader>

        <Separator className="my-4" />

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {/* Exercises Section */}
            {lessonAudio.exercises.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">📝 Exercises</h3>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {lessonAudio.exercises.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {lessonAudio.exercises.map((exercise, index) => (
                    <AudioPlayer
                      key={`exercise-${index}`}
                      audioFile={exercise}
                      isActive={activeAudioId === `exercise-${index}`}
                      onPlay={() => handleAudioPlay(`exercise-${index}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Vocabulary Section */}
            {lessonAudio.vocabulary.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">📚 Vocabulary</h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    {lessonAudio.vocabulary.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {lessonAudio.vocabulary.map((vocab, index) => (
                    <AudioPlayer
                      key={`vocabulary-${index}`}
                      audioFile={vocab}
                      isActive={activeAudioId === `vocabulary-${index}`}
                      onPlay={() => handleAudioPlay(`vocabulary-${index}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
