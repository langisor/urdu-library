import { Suspense } from "react";
import Loading from "@/app/loading";
import { getVocabulyData } from "./_components/services";
import { Card, CardContent } from "@/components/ui/card";
 
import { VocsTable } from "./_components/vocs-table";

interface Props {
  params: Promise<{ cid: string }>;
  searchParams: Promise<{ vid: string }>;
}

export default async function VocabulariesPage({
  params,
  searchParams,
}: Props) {
  const cid = (await params).cid;
  const vid = (await searchParams).vid;
  
  const { categoryName, vocabulary, vItemData } = await getVocabulyData(vid);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-4 naskh-text">
        {/* <DynamicBreadcrumb /> */}
        <h1 className="text-base sm:text-xl font-extrabold mb-4 text-gray-900">
          {categoryName} - مفردات الوحدة
        </h1>
        <Card>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-center">
              <span className="font-semibold"> الكلمات : </span>
              <span className="font-semibold">{vocabulary.countWords}</span>
              <span className="font-semibold"> العبارات : </span>
              <span className="font-semibold">{vocabulary.countPhrases}</span>
              <span className="font-semibold"> الإجمالي : </span>
              <span className="font-semibold">{vItemData.length}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full h-screen overflow-y-scroll">
          <CardContent>
            <VocsTable vocs={vItemData} />
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
