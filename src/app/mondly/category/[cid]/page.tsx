import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { queryClient } from "@/lib/postgres-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Badge } from "lucide-react";
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
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 naskh-text">
        
        {lessonsData.map((lesson) => (
          <Link
            href={`/mondly/category/quizzer?lid=${lesson.id}`}
            key={lesson.id}
            className="hover:opacity-80 transition"
          >
            <Card
              className="w-full hover:opacity-80 transition cursor-pointer skew-1 bg-gradient-to-b from-blue-500 to-blue-600"
              key={lesson.id}
            >
              <CardHeader>
                <CardTitle>{lesson.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Card>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <CardTitle>الاختبارات</CardTitle>
                      <Button
                        variant="outline"
                        className="text-lg font-bold rounded-2xl"
                      >
                        {lesson.countQuiz}
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <CardTitle>الجمل</CardTitle>
                      <Button
                        variant="outline"
                        className="text-lg font-bold rounded-2xl"
                      >
                        {lesson.countPhrases}
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <CardTitle>الكلمات</CardTitle>
                      <Button
                        variant="outline"
                        className="text-lg font-bold rounded-2xl"
                      >
                        {lesson.countWords}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    );
  };
  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl">{categoryData.name}</CardTitle>
      </CardHeader>
      <CardContent>{renderLessonCards()}</CardContent>
    </Card>
  );
}
