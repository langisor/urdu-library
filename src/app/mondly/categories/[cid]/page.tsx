import { Suspense } from "react";
import Loading from "@/app/loading";
 import CategoryDashboard from "./_components/category-dashboard";

import { promises } from "fs";
import {
  LessonItem,
  VocabularyData,
} from "@/app/mondly/_types/data-services";
import path from "path";
// import { JsonViewerComponent } from "@/components/json-viewer";
import {DynamicBreadcrumb} from "../../_components/dynamic-breadcrumb";
const baseLessonsPath = "src/app/mondly/_data/Lessons/";
const baseVocabularyPath = "src/app/mondly/_data/Vocabularies/";

async function getVocabularyData(cid: number) {
  // only 1 file for vocabulary cid01.json
  const filepath = path.join(
    process.cwd(),
    baseVocabularyPath,
    `${cid}01.json`
  );
  const data = await promises.readFile(filepath, "utf-8");
  const parsedData = JSON.parse(data) as VocabularyData;
  return parsedData;
}

async function getCategoryLessons(_cid: number) {
  //  create lessons names  [cid01, cid02, cid03, cid04, cid05, cid06]

  const lessonsNames: string[] = [];
  lessonsNames[0] = `${_cid}01`;
  lessonsNames[1] = `${_cid}02`;
  lessonsNames[2] = `${_cid}03`;
  lessonsNames[3] = `${_cid}04`;
  lessonsNames[4] = `${_cid}05`;
  lessonsNames[5] = `${_cid}06`;

  const lessons: LessonItem[] = [];
  for (const lessonName of lessonsNames) {
    const filepath = path.join(
      process.cwd(),
      baseLessonsPath,
      `${lessonName}.json`
    );
    const data = await promises.readFile(filepath, "utf-8");
    //  note parsedData is containing lesson object without quizzes:Quiz[]
    const parsedData = JSON.parse(data).lesson as LessonItem;
    lessons.push(parsedData);
  }
  return lessons;
}
 
export default async function LessonPage({
  params,
}: {
  params: Promise<{
    cid: string;
  }>;
}) {
  const _cid = Number((await params).cid);
  // console.log("cid", _cid);
  // await the data fetching function
  const lessonsData = await getCategoryLessons(_cid);
  // console.log("lessonsData", lessonsData);
  const vocabularyData = await getVocabularyData(_cid);
  // console.log("vocabularyData", vocabularyData);
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-4">
        <DynamicBreadcrumb />
        <CategoryDashboard lessonsData={lessonsData} vocabularyData={vocabularyData} />
      </div>
    </Suspense>
  );
}
