import { Suspense } from "react";
import Loading from "@/app/loading";
import CategoryDashboard from "./_components/category-dashboard";
import { queryClient } from "@/lib/postgres-client";
import {
  LessonItem,
  Vocabulary,
  CategoryItem,
} from "@/app/mondly/_types/data-services";
import cat_names from "@/app/mondly/_data/category-names.json";

// import { JsonViewerComponent } from "@/components/json-viewer";
import { DynamicBreadcrumb } from "../../_components/dynamic-breadcrumb";
const baseLessonsPath = "src/app/mondly/_data/Lessons/";
const baseVocabularyPath = "src/app/mondly/_data/Vocabularies/";

async function getCategoryLessons(_cid: number) {
  const category = await queryClient`
   SELECT * FROM "Category" WHERE id = ${_cid}
   `;
  const lessonsIds = category[0].lessons as number[];
  const lessonsData: LessonItem[] = [];
  for (const lessonId of lessonsIds) {
    const lesson = await queryClient`
    SELECT * FROM "Lesson" WHERE id = ${lessonId}
    `;
    lessonsData.push(lesson[0] as LessonItem);
  }
  // get vocabulary data with vItems
  const vocabularyId = category[0].vocabularies as number;
  const vocabularyRow = await queryClient`
    SELECT * FROM "Vocabulary" WHERE id = ${vocabularyId}
    `;

  const vocabularyData = vocabularyRow[0] as Vocabulary;
  return { lessonsData, vocabularyData };
}

/**
 *
 * @param param0 generateStaticParams
 * @returns
 */
export function generateStaticParams() {
  return cat_names.map((item) => ({
    cid: item.id.toString(),
  }));
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{
    cid: string;
  }>;
}) {
  const _cid = Number((await params).cid);

  // await the data fetching function
  const { lessonsData, vocabularyData } = await getCategoryLessons(_cid);
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-4">
        {/* <DynamicBreadcrumb /> */}
        <CategoryDashboard
          lessonsData={lessonsData}
          vocabularyData={vocabularyData}
        />
      </div>
    </Suspense>
  );
}
