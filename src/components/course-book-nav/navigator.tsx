"use client";
import * as React from "react";
import type { IBookData } from "@/data/course-book/ts-definition";
import useNavigationState from "@/data/course-book/use-navigation-store";
import { usePathname } from "next/navigation";
import AudioPlayer from "./audio-player";
import BookCover from "./book-cover";

export default function CourseBookNavigator({
  bookData,
}: {
  bookData: Promise<IBookData>;
}) {
  const data = React.use(bookData);
  const navigationStates = useNavigationState();
  const pathname = usePathname();

  return (
    <div className="w-full">
      <BookCover {...data} />
    </div>
  );
}
