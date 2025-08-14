"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import bookData from "@/app/etc/course-book/_components/book-data.json";
import { JsonViewerComponent } from "@/components/json-viewer";
import { Badge } from "@/components/ui/badge";
import {
  BookData,
  Lesson,
  Chapter,
} from "@/app/etc/course-book/_components/definitions";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const book_data: BookData = bookData as BookData;

interface FullLesson {
  lessonNumber: number;
  title: string;
  parentNumber: number;
  parentTitle: string;
  page: string;
  exercises: {
    exerciseNumber: number;
    audioFile: string;
    sub: {
      subNumber: number;
      audioFile: string;
    }[];
  }[];
}
interface FullChapter {
  chapterNumber: number;
  title: string;
  parentNumber: number;
  parentTitle: string;
  page: string;
  topics: string[];
  vocabularies: {
    vNumber: number;
    audioFile: string;
    sub?: {
      subNumber: number;
      audioFile: string;
    }[];
  }[];

  exercises: {
    number: number;
    subNumber?: number;
    audioFile: string;
  }[];
}

const baseMediaUrl = book_data.media.baseUrl;
export default function EtcPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const parts = book_data.parts;
  const units = book_data.units;
  const lessons: FullLesson[] = [];
  const chapterMedia: FullChapter[] = [];

  //   process parts and their lessons to create a flat list of lessons
  parts.forEach((part) => {
    part.lessons.forEach((lesson) => {
      lessons.push({
        lessonNumber: lesson.lessonNumber,
        title: lesson.title,
        parentNumber: part.partNumber,
        parentTitle: part.title,
        page: lesson.page,
        exercises:
          lesson.media?.exercises?.map((exercise) => ({
            exerciseNumber: exercise.number,
            audioFile: `${baseMediaUrl}${exercise.audioFile}`,
            sub: exercise.subNumber
              ? [
                  {
                    subNumber: exercise.subNumber,
                    audioFile: `${baseMediaUrl}${exercise.audioFile}`,
                  },
                ]
              : [],
          })) || [],
      });
    });
  });
  //   process Units and their chapters to create a flat list of chapters
  units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      chapterMedia.push({
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        parentNumber: unit.unitNumber,
        parentTitle: unit.title,
        page: chapter.page,
        topics: chapter.topics || [],
        vocabularies:
          chapter.media?.vocabulary?.map((vocab) => ({
            vNumber: vocab.subNumber || 0,
            audioFile: `${baseMediaUrl}${vocab.audioFile}`,
            sub: vocab.subNumber
              ? [
                  {
                    subNumber: vocab.subNumber,
                    audioFile: `${baseMediaUrl}${vocab.audioFile}`,
                  },
                ]
              : [],
          })) || [],
        exercises:
          chapter.media?.exercises?.map((exercise) => ({
            number: exercise.subNumber || 0,
            subNumber: exercise.subNumber,
            audioFile: `${baseMediaUrl}${exercise.audioFile}`,
          })) || [],
      });
    });
  });

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Course Book Data</h1>
      <div className="flex-flex-col gap-3">
        <h2 className="text-xl font-semibold">Lessons Data</h2>
        <JsonViewerComponent data={lessons} />
      </div>

      <h2 className="text-xl font-semibold">Chapters Data</h2>
      <JsonViewerComponent data={chapterMedia} />
    </div>
  );
}
