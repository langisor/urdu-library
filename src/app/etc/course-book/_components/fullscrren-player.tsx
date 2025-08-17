"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { AudioFile } from "./difinitions";
import { Button } from "@/components/ui/button";
import { getAudioUrl } from "./difinitions";
import { Music } from "lucide-react";
import { CustomPlayer } from "./custom-player";
interface FullscreenPlayerProps {
  item: AudioFile;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function FullscreenPlayer({
  item,
  disabled = false,
  children,
}: FullscreenPlayerProps) {
  const [open, setOpen] = React.useState(false);

  const audioUrl = getAudioUrl(item);

  const { unit, chapter, type, number, subNumber } = item;
  const handleSheetClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            
            className={
              item.type === "Vocabulary"
                ? "bg-yellow-700 text-white"
                : "bg-gray-500 text-white"
            }
          >
            <Music className="w-4 h-4 mr-2" />
            {item.type === "Vocabulary" ? "Vocabulary" : "Exercise"} {number}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full h-full flex flex-col p-4" side="bottom">
          <SheetTitle className="text-2xl font-bold text-center">
            {type === "Vocabulary" ? "Vocabulary" : "Exercise"} {number}
          </SheetTitle>
          <SheetDescription></SheetDescription>

          <CustomPlayer item={item} disabled={disabled} />
          <ItemCardOutline item={item}>
            <SheetClose asChild>
              <Button variant="default" onClick={handleSheetClose}>
                Close
              </Button>
            </SheetClose>
          </ItemCardOutline>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface ItemCardOutlineProps {
  item: AudioFile;
  children?: React.ReactNode;
}

function ItemCardOutline({ item, children }: ItemCardOutlineProps) {
  return (
    <Card className="w-full h-full">
      <CardContent className="p-4 grid grid-cols-2 gap-4">
        <p>Number : {item.number}</p>
        <p>Id : {item.id}</p>
        <p>SubNumber : {item.subNumber}</p>
        <p>Type : {item.type}</p>
        <p>Unit Number : {item.unit}</p>
        <p>Chapter Number : {item.chapter}</p>
        {children}
      </CardContent>
    </Card>
  );
}
