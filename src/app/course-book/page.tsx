import { JsonViewerComponent } from "@/components/json-viewer";
import { Suspense } from "react";
import { Loading } from "@/components/loading";

async function fetchMediaData() {
  const response = await fetch("/api/books");
  const data = await response.json();
  return data;
}
export default async function CourseBookPage() {
  const mediaData = await fetchMediaData();
  console.log("mediaData", mediaData);
  return (
    <div>
      <h1>Course Book</h1>
    </div>
  );
}
