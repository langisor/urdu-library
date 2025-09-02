import { queryClient } from "@/lib/postgres-client";
import { Quizzer } from "./_components/quizzer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BackToUnit } from "./_components/back-to-unit";

async function getVocabularyItems(vid: number) {
  const vItems = await queryClient`
 SELECT * from "VItems" where "vocabulary"=${vid}
 `;

  const vocs: any[] = [];

  for (const item of vItems) {
    vocs.push(item.vItemData);
  }
  // get words count and phrases count
  const vocData = await queryClient`
  SELECT "countItem", "countWords","countPhrases","categoryID" from "Vocabulary" where id=${vid}
  `;
  const categoryName = await queryClient`
  SELECT "name" from "Category" where id=${vocData[0].categoryID}
  `;
  return {
    vocs,
    categoryName,
    countItem: vocData[0].countItem,
    countWords: vocData[0].countWords,
    countPhrases: vocData[0].countPhrases,
    total:
      vocData[0].countItem + vocData[0].countWords + vocData[0].countPhrases,
  };
}

interface VocabularyPageProps {
  params: Promise<{ cid: string }>;
  searchParams: Promise<{ vid: string }>;
}
export default async function VocabularyPage({
  params,
  searchParams,
}: VocabularyPageProps) {
  const { cid } = await params;
  const { vid } = await searchParams;
  const vocs = await getVocabularyItems(Number(vid));
  console.log("cid", cid);
  console.log("vid", vid);
  return (
    <div>
      <InfoCard
        categoryName={vocs.categoryName[0].name || ""}
        countItem={vocs.countItem || 0}
        countWords={vocs.countWords || 0}
        countPhrases={vocs.countPhrases || 0}
        total={vocs.total || 0}
      >
        <BackToUnit />
      </InfoCard>
      <Quizzer vocs={vocs.vocs} />
    </div>
  );
}

function InfoCard({
  categoryName,
  countItem,
  countWords,
  countPhrases,
  total,
  children,
}: {
  categoryName: string;
  countItem: number;
  countWords: number;
  countPhrases: number;
  total: number;
  children?: React.ReactNode;
}) {
  return (
    <Card className="text-right" dir="rtl">
      <CardHeader className="flex justify-start items-center">
        <h1 className="text-xl sm:text-2xl font-extrabold mb-4 mt-4 text-gray-900">
          مفردات الوحدة - {categoryName}
        </h1>
        {children}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-center underline">
          <span className="font-semibold"> الكلمات : </span>
          <span className="font-semibold"> {countWords}</span>
          <span className="font-semibold"> العبارات : </span>
          <span className="font-semibold"> {countPhrases}</span>
          <span className="font-semibold"> المفردات : </span>
          <span className="font-semibold"> {countItem}</span>
          <span className="font-semibold"> الإجمالي : </span>
          <span className="font-semibold"> {total}</span>
        </div>
      </CardContent>
    </Card>
  );
}
