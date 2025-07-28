import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { fetchBookData } from "@/data/course-book/utils";
import CourseBookNavigator from "@/components/course-book-nav/navigator";
import { IBookData } from "@/data/course-book/ts-definition";

export default function CourseBookPage() {
  const resData = fetchBookData("/api/json/course-book") as Promise<IBookData>;
  return (
    <Suspense fallback={<Loading />}>
      <CourseBookNavigator bookData={resData} />
    </Suspense>
  );
}
