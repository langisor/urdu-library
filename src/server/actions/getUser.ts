"use server";
// fake user
export async function getUser() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    name: "Langisor",
    username: "root",
    email: "langisor-app@proton.me",
    role: "root",
    status: "active",
    createdAt: "2025-08-13T23:26:35.000Z",
    updatedAt: "2025-08-13T23:26:35.000Z",
    id: 1,
  };
}
