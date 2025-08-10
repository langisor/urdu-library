"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { fetchVocabularies } from "@/app/practice/_server/fetchers";
import { VocabularyData } from "../_lib/voc-interfaces";
import { VocabulariesTabs } from "./vocabularies-tabs";
interface ViewVocabulariesProps {
  categoryId: string | number;
}

export default function ViewVocabularies({
  categoryId,
}: ViewVocabulariesProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState<VocabularyData | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const selectedTabStyle = {
    backgroundColor: "blue",
    color: "white",
  };
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
  const handleCloseSheet = () => {
    setIsOpen(false);
    setData(null);
    setIsLoading(false);
  };
  async function fetchData() {
    setIsLoading(true);
    const data = await fetchVocabularies(categoryId);
    setData(data);
    setIsLoading(false);
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">View Vocabularies</Button>
        </SheetTrigger>
        {/*  make it responsive  / full height and add scrollbar  */}
        <SheetContent
          className="sm:min-w-[600px] h-screen  overflow-y-auto"
          side="top"
        >
          {/*  header  */}
          <div className="flex justify-between items-center">
            <SheetHeader className="inter-bold">
              <SheetTitle>Vocabularies {categoryId}</SheetTitle>

              <SheetDescription className="hidden"></SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </div>
          <VocabulariesTabs data={data} isLoading={isLoading} />
        </SheetContent>
      </Sheet>
    </>
  );
}
