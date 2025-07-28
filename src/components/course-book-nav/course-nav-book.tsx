"use client";
import * as React from "react";
import type { IBookData } from "@/data/course-book/ts-definition";
import useNavigationState from "@/hooks/use-navigation-store";
import { usePathname } from "next/navigation";
import AudioPlayer from "./audio-player";
import BookCover from "./book-cover";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
export default function CourseBookNavigator({
  bookData,
}: {
  bookData: Promise<IBookData>;
}) {
  const data = React.use(bookData);
  const states = useNavigationState();
  const pathname = usePathname();
  
  React.useEffect(() => {

    // initialize the states
    
  }, []);

  return (
    <div className="w-full">
      <BookCover {...data} />
    </div>
  );
}
