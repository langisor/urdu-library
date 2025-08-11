"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Star,
  Trophy,
  GraduationCap,
  BookCheck,
  Play,
} from "lucide-react";

// import { QuizzesManager } from "./quizzes-mananger";
// import { useLessonStore } from "@/store/lesson-store";
import { useHookstate, State } from "@hookstate/core";
import * as React from "react";
import { Lesson } from "@/generated/prisma";
import { useQuizzes } from "@/hooks/use-quizzes";
interface LessonCardProps {
  lesson: Lesson;
  // quizzesData: Promise<QuizData[]>;
}
export function LessonCard({ lesson }: LessonCardProps) {
  const {
    id,
    name,
    disabled,
    done,
    stars,
    difficulty,
    countQuiz,
    countWords,
    countPhrases,
    countDone,
 
 
  } = lesson;
  const [isQuizOpen, setIsQuizOpen] = React.useState(false);
  // const completedQuizzes = useLessonStore((state) => state.completedQuizzes);

  const lessonQuizzes = useQuizzes(id);
  const result = useHookstate(0);
  const progress: State<number> = useHookstate(() =>
    countDone && countDone > 0 ? (countDone / countQuiz!) * 100 : 0
  );

  // const progress =
  //   countDone && countDone > 0 ? (countDone / countQuiz) * 100 : 0;

  const lessonProgressStates = {
    started: "!bg-blue-500",
    completed: "!bg-green-500",
    waiting: "!bg-red-500",
  };
  const lessonProgressState = done
    ? "completed"
    : countDone && countDone > 0
    ? "started"
    : "waiting";

  const handleStartLessonClick = () => {
    setIsQuizOpen(true);
  };

  return (
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
                  disabled ? "text-gray-400" : "text-blue-500"
                }`}
              />
              <h3
                className={`font-semibold tracking-tight text-lg px-2 ${
                  disabled ? "text-gray-400" : ""
                }`}
              >
                {name}
              </h3>
            </div>
            <Badge
              variant={done ? "default" : disabled ? "secondary" : "outline"}
              className="capitalize"
            >
              {done ? "Completed" : disabled ? "Locked" : "In Progress"}
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
                    i < stars!
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <Badge variant="outline" className="capitalize">
              {difficulty}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between  text-sm">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-orange-500" />
                <span>{countQuiz} Quizzes</span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4 text-purple-500" />
                <span>{countWords} Words</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookCheck className="h-4 w-4 text-green-500" />
                <span>{countPhrases} Phrases</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {Math.round(progress.get())}%
                </span>
              </div>
              <Progress value={progress.get()} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
