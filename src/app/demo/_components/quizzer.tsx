"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WordItem } from "../_lib/types";

interface QuizzerProps{
    words:WordItem[];
}
export function Quizzer({words}:QuizzerProps){
    return(
        <Sheet>
            <SheetTrigger asChild>
                <Button>Quiz</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetTitle>Quiz</SheetTitle>
                <SheetDescription>
                    <Card>
                        <CardContent>
                            
                        </CardContent>
                    </Card>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}