"use client"
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BackButton = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
    return (
       <div className="p-8">
                 <Button
                 variant="default"
                   onClick={() => navigateTo("toc")}
                   className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-300 bg-teal-500 hover:bg-teal-600"
                 >
                  <ArrowLeft className="mr-2 h-4 w-4" />Back to Table of Contents
                 </Button>
                 <h2 className="text-3xl font-bold mb-4 text-teal-700">
                   Chapter 2: Parts of Speech (Ajzaa-e-Kalaam)
                 </h2>
                 <p>
                   This is the content for Chapter 2. We can add sections on Nouns,
                   Pronouns, and Verbs here.
                 </p>
               </div>
    )
   }