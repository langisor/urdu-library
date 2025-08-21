import { Suspense } from "react";
import { VocabulariesHomePage } from "./_components/vocabularies-home";
import { VocabulariesQuizzer } from "./_components/quizzer";
import { QuizWord, VocabularyRow, Solution } from "./_lib/types";
import { queryClient } from "@/lib/postgres-client";
import { RowList, Row } from "postgres";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

async function getchVocabulariesData(vid: string) {
  const num_vid = Number(vid);
  const vocRowData: RowList<VocabularyRow[]> = await queryClient`
   SELECT * FROM "Vocabulary" where id=${num_vid}
  ;`;
  const vocObject: VocabularyRow = vocRowData[0];

  const categoryId = vocObject.categoryID;
  const categoryRow = await queryClient`
    select "name" from "Category" where id=${categoryId}
  `;
  const vocRowItemsData = [];

  for (const  item of vocObject.vItems) {
    const data = await queryClient`
    select "vItemData" from "Item" where id=${item}
    `;
    const castedData = JSON.stringify(data[0].vItemData);
    vocRowItemsData.push(JSON.parse(castedData));
  }

  return {
    vocabularyRow: vocObject,
    vocs: vocRowItemsData,
    categoryName: categoryRow[0].name,
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
  const { vocabularyRow, vocs, categoryName } = await getchVocabulariesData(
    vid
  );

  return (
 
      <div className="flex flex-col gap-2 bg-gradient-to-bl from-slate-300 to-slate-100 p-2 rounded-xl">
        <div className="flex flex-col gap-4 naskh-text">
          <div className="flex justify-between px-2" dir="rtl">
            <h1 className="text-xl sm:text-2xl font-extrabold mb-4 mt-4 text-gray-900">
              مفردات الوحدة - {categoryName}
            </h1>
            <TestYourSelfButton vocs={vocs} />
          </div>
     

          <VocabulariesHomePage vocs={vocs} />
        </div>
      </div>
 
  );
}

 