import { NextResponse, NextRequest } from "next/server";

import { getUser } from "@/server/actions/getUser";
// as fallback user
export async function GET() {
  return NextResponse.json({ user: await getUser() });
}

