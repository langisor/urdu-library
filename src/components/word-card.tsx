"use client";
import { JsonViewerComponent } from "./json-viewer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
interface ExampleProps {
  id: string;
  t3: string;
  t1: string;
  t2: string;
}
interface WordProps {
  id: string;
  t3: string;
  t1: string;
  t2: string;
  examples: ExampleProps[];
}

export function WordCard({ word }: { word: WordProps }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="lang-ur hover:bg-gray-100 hover:cursor-pointer hover:transition-all hover:duration-300 hover:scale-105 w-fit">
          {" "}
          {word.t3}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-screen h-screen p-4 overflow-y-auto mt-20">
        <SheetTitle className="lang-ur p-4 text-center text-white font-bold text-2xl">
          {" "}
          {word.t3}
        </SheetTitle>
        <SheetDescription className="lang-ur"> {word.t1}</SheetDescription>
        <JsonViewerComponent data={word} />
      </SheetContent>
    </Sheet>
  );
}
