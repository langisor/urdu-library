import { NextRequest, NextResponse } from "next/server";
import { queryClient } from "@/lib/postgres-client";
import { isValidCatId } from "@/lib/helpers";
type Category = {
    id: number;
    name: string;
    countLesson: number;
    countDialogue: number;
    countVocabulary: number;
    time: number;
    dialogues: number[];
    lessons: number[];
    vocabularies: number[];
}
export async function GET(request: NextRequest) {
  // check if cid is provided
  const cid = request.nextUrl.searchParams.get("cid");
  if (!cid) {
    try {
      const categories = await queryClient`
     SELECT * FROM "Category" order by "id" asc
     `;
      const categoriesData: Category[] = categories.map((category: any) => ({
        id: category.id,
        name: category.name,
        countLesson: category.countLesson,
        countDialogue: category.countDialogue,
        countVocabulary: category.countVocabulary,
        dialogues: category.dialogues,
        lessons: category.lessons,
        vocabularies: category.vocabularies,
        time: category.time,
      }));
      return NextResponse.json({
        data: categoriesData,
        message: "Categories fetched successfully",
        status: 200,
      });
    } catch {
      return NextResponse.json({
        data: null,
        message:
          "No category ID provided or incorrect category ID string in your query.",
        status: 400,
      });
    }
  }

  // check if cid is valid
  if (!isValidCatId(Number(cid))) {
    return NextResponse.json({
      data: null,
      message:
        "Invalid category ID, use api/c?cid={1| 2| 3| 4| 5| 6| 7| 8| 9| 10| 11| 12| 13| 14| 15| 16| 17| 22| 23| 24| 25| 26| 27| 28| 29| 30| 31| 34| 35| 36| 37| 38| 39| 40| 88| 89| 90| 91}",
      status: 404,
    });
  }
  try {
    const category = await queryClient`
   SELECT * FROM "Category" WHERE "id"=${cid}
`;
    if (!category) {
      return NextResponse.json({
        data: null,
        message: "Category not found",
        status: 404,
      });
    }
    return NextResponse.json({
      category: {
        id: category[0].id,
        name: category[0].name,
        countLesson: category[0].countLesson,
        countDialogue: category[0].countDialogue,
        countVocabulary: category[0].countVocabulary,
        countReviewLesson: category[0].countReviewLesson,
        time: category[0].time,
        dialogues: category[0].dialogues,
        lessons: category[0].lessons,
        vocabularies: category[0].vocabularies,
    
      },
      message: "Category fetched successfully",
      status: 200,
    });
  } catch {
    return NextResponse.json({
      data: null,
      message: "An error occured during fetch category",
      status: 500,
    });
  }
}
