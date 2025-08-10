import { Suspense } from "react";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {
  BookOpen,
  Star,
  Trophy,
  GraduationCap,
  BookCheck,
  Play,
} from "lucide-react";

import Link from "next/link";
import { promises } from "fs";

import path from "path";
import { JsonViewer } from "../../../components/json-viewer";

interface Lesson {
  id: string;
  i: number;
  index: number;
  positionIndex: number;
  unitNumber: number | null;
  unitType: number;
  unitStyle: number;
  unitScope: number;
  category: number;
  categoryID: number;
  name: string;
  disabled: number;
  done: number;
  stars: number;
  countDone: number;
}

const basePath = "src/lib/json/urdu/data/";

function getCategoryFilePath(cid: string) {
  //  check if id is exactly 1 digits long
  if (cid.length === 1) {
    // first char is the directory
    let dir = `${cid}`;
    let filename = `${cid}.json`;
    return `${basePath}${dir}/${filename}`;
  }

  // check if id is exactly 2 digits long
  if (cid.length === 2) {
    // first two chars are the directory
    let dir = `${cid[0]}${cid[1]}/`;

    let filename = `${cid}.json`;
    return `${basePath}/${dir}${filename}.json`;
  } else return "un recognized id";
}

async function getCategoryLessons(cid: string) {
  const filepath = getCategoryFilePath(cid);
  const data = await promises.readFile(filepath, "utf-8");
  return JSON.parse(data).lessons;
}
export default async function LessonPage({
  params,
}: {
  params: Promise<{
    cid: string;
  }>;
}) {
  const [cid] = (await params).cid;
  // console.log("cid", cid);
  // await the data fetching function
  const lessons = await getCategoryLessons(cid);
  return (
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {lessons.map((lesson: Lesson) => (
          <Link
            href={`/categories/${cid}/lesson/${lesson.id}`}
            key={lesson.id}
            legacyBehavior>
           <div className="flex flex-col">
 
      <Card
        className="hover:cursor-pointer  transition-all hover:shadow-lg hover:scale-105"
        dir="rtl"
      >
        <CardHeader className="space-y-1 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen
                className={`h-5 w-5 ${
                  lesson.disabled ? "text-gray-400" : "text-blue-500"
                }`}
              />
              <h3
                className={`font-semibold tracking-tight text-lg px-2 ${
                  lesson.disabled ? "text-gray-400" : ""
                }`}
              >
                {lesson.name}
              </h3>
            </div>
            <Badge
              variant={lesson.done ? "default" :lesson.disabled ? "secondary" : "outline"}
              className="capitalize"
            >
              {lesson.done ? "Completed" :lesson.disabled ? "Locked" : "In Progress"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {/* stars */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < lesson.stars!
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <Badge variant="outline" className="capitalize">
              {lesson.unitNumber ? `Unit ${lesson.unitNumber}` : "Unitless"}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between  text-sm">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-orange-500" />
                {/* <span>{lesson.countQuiz} Quizzes</span> */}
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4 text-purple-500" />
                {/* <span>{lesson.countWords} Words</span> */}
              </div>
              <div className="flex items-center space-x-2">
                <BookCheck className="h-4 w-4 text-green-500" />
                {/* <span>{lesson.countPhrases} Phrases</span> */}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {/* {Math.round(lesson.progress.get())}% */}
                </span>
              </div>
              {/* <Progress value={lesson.progress.get()} className="h-2" /> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
