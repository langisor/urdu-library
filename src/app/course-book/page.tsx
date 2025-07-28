"use client";
import { useCourseBook } from "@/hooks/use-course-book";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import BookNavigator from "@/components/course-book-nav/navigator";
import { MediaDirectoryTree } from "@/data/helpers/utils";
export default function CourseBookPage() {
  const courseBook = useCourseBook();
  
  console.log("courseBook", courseBook);
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <h1>Course Book</h1>
        <BookNavigator initialData={courseBook.data as MediaDirectoryTree} />
      </div>
    </Suspense>
  );
}
