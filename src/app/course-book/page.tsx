import { Suspense } from "react";
import { Loading } from "@/components/loading";

async function getBookData() {
  const res = await fetch("/api/books");
  const data = await res.json();
  return data;
}

export default async function CourseBookPage() {
  const bookData = await getBookData();
  return (
    <Suspense fallback={<Loading />}>
      
    </Suspense>
  );
}