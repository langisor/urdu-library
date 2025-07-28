"use client";
import { useCourseBook } from "@/hooks/use-course-book";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import BookNavigator from "@/components/course-book-nav/navigator";
import { MediaDirectoryTree } from "@/data/helpers/utils";
export default function CourseBookPage() {
  const { data: courseBook, error, isLoading } = useCourseBook();
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!courseBook) return <div>No data available</div>;
  
  console.log("courseBook", courseBook);
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <h1>Course Book</h1>
        <BookNavigator initialData={courseBook as MediaDirectoryTree} />
      </div>
    </Suspense>
  );
}
