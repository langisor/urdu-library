"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LessonsTab from "./lessons-tab";
import { Part } from "@/data/course-book/ts-definition";
interface PartsTabProps {
  parts: Part[];
}

export default function PartsTab({ parts }: PartsTabProps) {
  //  flat the parts array

  return (
    <Card>
    
      <CardContent>
        <div className="flex flex-col gap-3">
          {parts.map((part) => (
            <Card key={part.partNumber} className="flex flex-col gap-1">
              <CardHeader>
                <CardTitle className="text-center border-b border-gray-200 p-2">
                  {part.partNumber === 1 ? "I" : "II"}: {part.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LessonsTab lessons={part.lessons} />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
