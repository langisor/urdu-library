"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { JsonViewerComponent } from "@/components/json-viewer";
import { fetchVocabularies } from "@/server/fetchers";
interface ViewVocabulariesProps {
  lessonId: string | number;
}

export default function ViewVocabularies({ lessonId }: ViewVocabulariesProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  async function fetchData() {
    setIsLoading(true);
    const data = await fetchVocabularies(lessonId);
    setData(data);
    console.log("data: ", data);
    setIsLoading(false);
  }
  React.useEffect(() => {
    
    fetchData();

    //  clean up if Sheet is closed
    return () => {
      setIsOpen(false);
      // clean up data
      setData(null);
      setIsLoading(false);
    };
  }, [lessonId]);
  if (isLoading) return <Loading />;
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">View Vocabularies</Button>
        </SheetTrigger>
        {/*  make it responsive  / full height and add scrollbar  */}
        <SheetContent className="sm:max-w-[600px] h-screen overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Vocabularies</SheetTitle>
          </SheetHeader>
          <CardContent className="h-full overflow-y-auto">
            <JsonViewerComponent data={data} />
          </CardContent>
        </SheetContent>
      </Sheet>
    </>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen transition-all duration-300 text-2xl italic font-bold">
      Loading...
    </div>
  );
}
