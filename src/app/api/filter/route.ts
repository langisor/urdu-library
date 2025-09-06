import { NextRequest, NextResponse } from "next/server";
import { queryClient } from "@/lib/postgres-client";
import { isValidQuizType, capitalizeFirstChar } from "@/lib/helpers";
 
export async function GET(request: NextRequest) {
  const limit = Number(request.nextUrl.searchParams.get("limit")) || 1;
  const quiz_type = request.nextUrl.searchParams.get("quiz_type");
  console.log("quiz_type: ", quiz_type, ", limit: ", limit);
  console.log("isValidQuizStypeString: ", isValidQuizType(quiz_type!));
  // check if valid quiz type

  if (!quiz_type || !isValidQuizType(quiz_type)) {
    return NextResponse.json({
      data: null,
      message:
        "No quiz type provided or incorrect quiz type string in your query. Use api/filter?quiz_type='t1'| 'q'| 'f'| 't1b'| 'c2b'| 'r'| 'l1'| 'd'| 'p'| 'w1b'| 'qb'| 'c1b'| 't2'| 't2b'.",
      status: 401,
    });
  }

  const qtype = capitalizeFirstChar(quiz_type);
  try {
    const data = await queryClient`
  SELECT * FROM "Quiz" WHERE type = ${qtype} LIMIT ${limit}
  `;
    if (limit === 1) {
      const parsedQuiz = JSON.parse(JSON.stringify(data[0].quizData as any));
    } else {
      const parsedQuizzes: any[] = [];
      for (const quiz of data) {
        parsedQuizzes.push(JSON.parse(JSON.stringify(quiz.quizData as any)));
      }
      return NextResponse.json(parsedQuizzes);
    }
  } catch {
    return NextResponse.json({
      data: null,
      message: "An error occured during fetch quizzes",
      status: 500,
    });
  }
}
