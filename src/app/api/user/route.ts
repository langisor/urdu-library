import { NextResponse, NextRequest } from "next/server";
import { queryClient } from "@/lib/postgres-client";

type UserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  score: number;
};

async function getUser(id: number) {
  const user = await queryClient`
  SELECT * FROM "User" WHERE "id"=${id}
`;
  return user[0];
}
// as fallback user
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("uId");
  const user = await getUser(Number(id));
  return NextResponse.json(user);
}
