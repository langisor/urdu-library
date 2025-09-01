"use server";

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
export async function getUser(): Promise<UserData> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    name: "Langisor",
    username: "admin",
    email: "langisor-app@proton.me",
    role: "root",
    status: "active",
    createdAt: "2025-08-13T23:26:35.000Z",
    updatedAt: "2025-08-13T23:26:35.000Z",
    id: 1,
    score: 10
  };
}
