import { NextRequest, NextResponse } from "next/server";
import CourseBookDB from "@/data/db.json";
export async function GET() {
  return Promise.resolve(NextResponse.json(CourseBookDB));
}
