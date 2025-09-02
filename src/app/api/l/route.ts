import { queryClient } from "@/lib/postgres-client";
import { NextRequest, NextResponse } from "next/server";
import { LessonItem } from "@/app/mondly/_types/data-services";

export async function GET(request: NextRequest) {
  const lid = request.nextUrl.searchParams.get("lid");
  const lesson = await queryClient`
  SELECT * FROM "Lesson" WHERE "id"=${lid}
`;
  const parsedLesson = JSON.parse(JSON.stringify(lesson[0] as LessonItem));
  return NextResponse.json(parsedLesson);
}
