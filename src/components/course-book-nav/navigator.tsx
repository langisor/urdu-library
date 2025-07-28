"use client";
import type { BookData } from "@/data/course-book/definition";

import { JsonViewerComponent } from "../json-viewer";
interface NavigatorProps {
  bookData: BookData;
}

export default function Navigator({ bookData }: NavigatorProps) {
  return (
    <div className="flex flex-col h-screen">
      <JsonViewerComponent data={bookData} />
    </div>
  );
}
