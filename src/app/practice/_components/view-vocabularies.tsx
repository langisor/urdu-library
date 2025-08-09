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
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { JsonViewerComponent } from "@/components/json-viewer";
import { fetchVocabularies } from "@/app/practice/server/fetchers";
interface ViewVocabulariesProps {
  categoryId: string | number;
}

export default function ViewVocabularies({ categoryId }: ViewVocabulariesProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCloseSheet=()=>{
    setIsOpen(false);
    setData(null);
    setIsLoading(false);
  }
  async function fetchData() {
    setIsLoading(true);
    const data = await fetchVocabularies(categoryId);
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
  }, [categoryId]);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">View Vocabularies</Button>
        </SheetTrigger>
        {/*  make it responsive  / full height and add scrollbar  */}
        <SheetContent className="sm:min-w-[600px] h-screen  overflow-y-auto" side="top">
          <SheetHeader>
            <SheetTitle>Vocabularies</SheetTitle>
            <SheetDescription>
              This is a description for the sheet
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <CardContent className="h-full overflow-y-auto">
            {isLoading ? <Loading /> : <JsonViewerComponent data={data} />}
          </CardContent>
        </SheetContent>
      </Sheet>
    </>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center transition-all duration-300 text-2xl italic font-bold">
      Loading...
    </div>
  );
}
