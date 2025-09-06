"use client";
import * as React from "react";
 
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
 SheetDescription,
} from "@/components/ui/sheet";
import {
 Button,
} from "@/components/ui/button";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
 
interface QuizzerProps {
 quizzes: any[];
 lessonID: number;
 name:string;
}

export   function Quizzer({ quizzes,lessonID,name }: QuizzerProps) {
 const [open, setOpen] = React.useState(false);

 return (
  <Sheet>
   <SheetTrigger asChild className="w-full cursor-pointer ">
    <Button onClick={() => setOpen(true)} className="mt-5">إبدأ</Button>
   </SheetTrigger>

   <SheetContent side="bottom" dir="rtl" className=" h-screen overflow-hidden">
   <SheetDescription className="mt-10">اختبارات {lessonID} - {name}</SheetDescription>
    <SheetHeader>
     <SheetTitle>اختبارات {lessonID} - {name}</SheetTitle>
    </SheetHeader>
    <JsonViewerComponent data={quizzes} />
   </SheetContent>
  </Sheet>
 );
}