import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const res = {
    message: "Hello World",
    path: "/api/media",
  };
  return NextResponse.json(res);
}
