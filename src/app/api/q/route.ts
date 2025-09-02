import { queryClient } from "@/lib/postgres-client";
import { NextRequest, NextResponse } from "next/server";
 

export async function GET(request: NextRequest) {
  const qid = request.nextUrl.searchParams.get("qid");
  const quiz = await queryClient`
  SELECT * FROM "Quiz" WHERE "id"=${qid}
`;
  const parsedQuiz = JSON.parse(JSON.stringify(quiz[0].quizData as any));
  return NextResponse.json(parsedQuiz);
}
