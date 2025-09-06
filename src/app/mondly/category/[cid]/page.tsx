import { Card, CardContent } from "@/components/general/card";
import { LessonDashboard } from "./[lid]/_components/lesson-dashboard";
import { queryClient } from "@/lib/postgres-client";

import { JsonViewerComponent } from "@/components/general/json-viewer-component";

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
  for (let l of lessons) {
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

  return (
    <Card>
      <CardContent className="">
        <LessonDashboard
          categoryName={categoryData.name}
          lessons={lessonsData}
        />
      </CardContent>
    </Card>
  );
}
