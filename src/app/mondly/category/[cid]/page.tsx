import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { queryClient } from "@/lib/postgres-client";
import Link from "next/link";
import MainScreen from "./lessons/_components/screens/main-screen";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
type Category = {
  id: number;
  name: string;
  countLesson: number;
  countDialogue: number;
  countVocabulary: number;
  countReviewLesson: number;
  time: string;
  dialogues: number[];
  lessons: number[];
  vocabularies: number[];
};
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
async function getCategory(cid: number) {
  const category = await queryClient`
   select * from "Category" where id=${cid}
  `;
  const categoryData = {
    id: category[0].id,
    name: category[0].name,
    countLesson: category[0].countLesson,
    countDialogue: category[0].countDialogue,
    countVocabulary: category[0].countVocabulary,
    countReviewLesson: category[0].countReviewLesson,
    time: category[0].time,
    dialogues: category[0].dialogues,
    lessons: category[0].lesson,
    vocabularies: category[0].vocabularies,
  };
  const lessonsData: Lesson[] = [];
  const lessons = await queryClient`
   select * from "Lesson" where "categoryID"=${cid}
  `;
  for (const l of lessons) {
    lessonsData.push({
      id: l.id,
      index: l.index,
      categoryID: l.categoryID,
      name: l.name,
      countQuiz: l.countQuiz,
      countPhrases: l.countPhrases,
      countWords: l.countWords,
      quizzes: l.quizzes,
    });
  }
  return { categoryData, lessonsData };
}

export default async function Category({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  const { categoryData, lessonsData } = await getCategory(Number(cid));

  const renderLessonCards = () => {
    return (
      <div
        className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3"
        dir="rtl"
      >
        {lessonsData.map((lesson) => (
          // <Link href={`/mondly/category/${cid}/${lesson.id}`} key={lesson.id} className="hover:opacity-80 transition">
          <Card
            className="w-full hover:opacity-80 transition cursor-pointer skew-1"
            key={lesson.id}
          >
            <CardHeader>
              <CardTitle>{lesson.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Quizzes: {lesson.countQuiz}</p>
              <p>Phrases: {lesson.countPhrases}</p>
              <p>Words: {lesson.countWords}</p>
            </CardContent>
            <CardFooter>
              <Suspense fallback={<div>Loading...</div>}>
                <Quizzer lid={lesson.id} />
              </Suspense>
            </CardFooter>
          </Card>
          // </Link>
        ))}
      </div>
    );
  };
  return (
    <div>
      <h1>{categoryData.name}</h1>
      <div>{renderLessonCards()}</div>
    </div>
  );
}

async function Quizzer({ lid }: { lid: number }) {
  const quizzes = await queryClient`
   select * from "Quiz" where "lessonID"=${lid}
  `;
  const paresedData: any[] = [];
  for (const q of quizzes) {
    const data = JSON.parse(JSON.stringify(q.quizData));
    paresedData.push(data);
  }
  const lesson = await queryClient`
   select * from "Lesson" where id=${lid}
  `;
 
  return <MainScreen lesson={lesson[0]} quizzes={paresedData} />;
}
