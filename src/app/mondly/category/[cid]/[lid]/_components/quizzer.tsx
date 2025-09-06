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
 lessonId:number;
 name:string;
}

export   function Quizzer({ quizzes,lessonId,name }: QuizzerProps) {
 const [open, setOpen] = React.useState(false);

 return (
  <Sheet>
   <SheetTrigger asChild className="w-full cursor-pointer ">
    <Button onClick={() => setOpen(true)} className="mt-5 text-xl">إبدأ</Button>
   </SheetTrigger>

   <SheetContent side="bottom" dir="rtl" className=" h-screen overflow-hidden">
   <SheetDescription className="mt-10">اختبارات {lessonId} - {name}</SheetDescription>
    <SheetHeader>
     <SheetTitle>اختبارات {lessonId} - {name}</SheetTitle>
    </SheetHeader>
    <JsonViewerComponent data={quizzes} />
   </SheetContent>
  </Sheet>
 );
}