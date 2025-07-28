"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lesson } from "@/data/course-book/ts-definition";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
interface LessonsTabProps {
  lessons: Lesson[];
}
import * as React from "react";
export default function LessonsTab({ lessons }: LessonsTabProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={lessons[0].lessonNumber.toString()}
    >
      {lessons.map((lesson) => (
        <div key={lesson.lessonNumber} className="flex flex-col gap-3">
          <AccordionItem value={lesson.lessonNumber.toString()}>
            <AccordionTrigger className="w-full cursor-pointer hover:bg-gray-100">
              <Card className="w-full cursor-pointer hover:bg-gray-100">
                <CardContent>
                  <div className="flex flex-row justify-between gap-1">
                    <span className="font-bold">{lesson.lessonNumber}</span>
                    <span className="font-bold text-lg italic">
                      {lesson.title}
                    </span>
                    <span>Page: {lesson.page}</span>
                  </div>
                </CardContent>
              </Card>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <LessonItem lesson={lesson} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
}
interface LessonItemProps {
  lesson: Lesson;
}

function LessonItem({ lesson }: LessonItemProps) {
  const hasExercises = lesson.media?.exercises ? true : false;
  
  const exerciseStyle = "bg-green-300 p-2 bg-white";

  if (!hasExercises) {
    return (
      <Card>
        <CardContent>
          <h3>Lesson {lesson.lessonNumber} has no exercises</h3>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardContent className={hasExercises ? exerciseStyle : ""}>
        {lesson.media?.exercises?.map((exercise) => (
          <div
            key={exercise.number}
            className="flex flex-col justify-between gap-1"
          >
            {hasExercises && (
              <div className="flex flex-row items-center justify-between gap-1 hover:bg-gray-100">
                <p className="font-bold">Exercise {exercise.number}</p>

                <audio controls>
                  <source
                    src={`/media/audio-all/${exercise.audioFile}`}
                    type="audio/mp3"
                  />
                </audio>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
