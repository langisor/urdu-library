import { NextRequest, NextResponse } from "next/server";
import BookData from "@/data/course-book/toc-and-media.json";
import { IBookData } from "@/data/course-book/ts-definition";
export async function GET(request: NextRequest) {
  const bookData = BookData as unknown as IBookData;

  return NextResponse.json(bookData);
}
