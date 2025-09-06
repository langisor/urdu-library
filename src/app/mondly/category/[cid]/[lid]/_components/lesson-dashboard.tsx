"use client";
import { Header } from "@/components/general/header/header";
import { BackToUnit } from "../../vocabularies/_components/back-to-unit";
import { Progress } from "@/components/ui/progress";
import { Pen, SquaresIntersect, Star, TextCursor } from "lucide-react";
import { Quizzer } from "./quizzer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/general/button";
type Lesson = {
  id: number;
  index: number;
  categoryID: number;
  name: string;
  countQuiz: number;
  countPhrases: number;
  countWords: number;
  quizzes: number[];
};

interface LessonDashboardProps {
  categoryName: string;
  lessons: Lesson[];
}
export function LessonDashboard({
  categoryName,
  lessons,
}: LessonDashboardProps) {
  // get random stars between 1 and 5
  const randomStars = Math.floor(Math.random() * 5) + 1;
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i}>
      <Star className="w-5 h-5 text-yellow-500" />
    </span>
  ));
  return (
    <div className="flex flex-col items-center text-right" dir="rtl">
      <div className="w-full mb-6">
        {/* <Header categoryName={categoryName} categoryID={lessons[0].categoryID} /> */}
        <Card>
          <CardContent className="p-2 flex justify-around items-center">
            <h2 className="text-2xl font-bold mt-2 text-center mb-5">
              <Button>{categoryName}</Button>
            </h2>
            <BackToUnit />
          </CardContent>
        </Card>
 
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="flex flex-col gap-2  w-full sm:w-120">
            <Card dir="rtl" className="mt-4 w-full">
              <CardContent className="p-2 h-full">
                <h2 className="text-2xl font-bold mt-2 text-center mb-5">
                  {lesson.name}
                </h2>
                <Progress value={lesson.countQuiz} />
                {/* icons */}
                <div className="w-full flex gap-2 mx-10">
                  <div className="w-full flex gap-4 mt-8 items-center">
                    <span className="rounded-lg text-blue-600 bg-gray-100 p-1">
                      <Pen className="h-6 w-6" />
                    </span>
                    <span className="text-md">{lesson.countQuiz}</span>
                  </div>
                  <div className="w-full flex gap-4 mt-8 items-center">
                    <span className="rounded-lg text-blue-600 bg-gray-100 p-1">
                      <TextCursor className="h-6 w-6" />
                    </span>
                    <span className="text-md">{lesson.countWords}</span>
                  </div>
                  <div className="w-full flex gap-4 mt-8 items-center">
                    <span className="rounded-lg text-blue-600 bg-gray-100 p-1">
                      <SquaresIntersect className="h-6 w-6" />
                    </span>
                    <span className="text-md">{lesson.countPhrases}</span>
                  </div>
                </div>
              </CardContent>
              <CardContent className="p-2 h-full mt-4">
                <div className="flex gap-3 justify-center z-10 mb-5">
                  {stars}
                </div>
                <Quizzer
                  quizzes={lesson.quizzes}
                  lessonID={lesson.id}
                  name={lesson.name}
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
