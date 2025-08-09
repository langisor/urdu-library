"use client";

import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ViewVocabulariesProps {
  lessonId: string | number;
}

// get data dynamically from json file using import(...)
async function getData(id: string | number) {
  const data = await import(`@/app/practice/data/Vocabularies/${id}.json`);
  return data.default;
}

export default function ViewVocabularies({ lessonId }: ViewVocabulariesProps) {


}

