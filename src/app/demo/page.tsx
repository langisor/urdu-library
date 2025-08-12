import { queryClient } from "@/server/postgres-client";

async function getData() {
  const result = await queryClient`SELECT * FROM  "Category"`;
  return result;
}

export default async function Home() {
  const data = await getData();
  console.log(data);
  return <div className="w-full text-center text-3xl">TODO: Home</div>;
}
