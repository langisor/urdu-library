import { Suspense } from "react";
import { Loading } from "@/components/loading";
import BookBrowser from "./_components/book-browser";
import { BookData } from "./_components/definitions";
import data from "./_components/book-data.json";

export default function CourseBookPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BookBrowser data={data as BookData} />
    </Suspense>
  );
}
