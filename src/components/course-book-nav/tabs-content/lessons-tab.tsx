"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lesson } from "@/data/course-book/ts-definition";

interface LessonsTabProps {
  lessons: Lesson[];
}

export default function LessonsTab({ lessons }: LessonsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lessons</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {lessons.map((lesson) => (
            <div key={lesson.lessonNumber} className="flex flex-col gap-1 ml-2">
              <div className="font-bold">{lesson.title}</div>
              <div>Page: {lesson.page}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
