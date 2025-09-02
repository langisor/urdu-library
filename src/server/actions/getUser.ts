"use server";
import { queryClient } from "@/lib/postgres-client";
// interface for user data object
export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  score: number;
}
// fake user data
export async function getUser() {
  const userData = await queryClient`
  SELECT * FROM "User"  WHERE id = 1;
`;

  return userData[0] as UserData;
}
