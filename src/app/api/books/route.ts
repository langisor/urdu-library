import { NextRequest, NextResponse } from "next/server";
import CourseBookDB from "@/data/db.json";
export async function GET(request: NextRequest) {
  return NextResponse.json(CourseBookDB);
}
