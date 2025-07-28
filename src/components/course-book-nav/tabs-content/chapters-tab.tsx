"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chapter,
} from "@/data/course-book/ts-definition";

interface ChaptersTabProps {
  chapters: Chapter[];
}

export default function ChaptersTab({ chapters }: ChaptersTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chapters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {chapters.map((chapter) => (
            <div key={chapter.chapterNumber} className="flex flex-col gap-1">
              <div className="font-bold">{chapter.title}</div>
              <div>Page: {chapter.page}</div>
              <div>
               Topics:
               {chapter.topics.map((topic)=>(
                <div key={topic} className="flex flex-col gap-1">
                  <div className="font-bold">{topic}</div>
                </div>
              ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
