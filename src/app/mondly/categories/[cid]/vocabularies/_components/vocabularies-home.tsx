"use client";

import * as React from "react";

import { QuizWord } from "../_lib/types";
import { useState, useEffect } from "react";
import { AudioPlayer } from "./audio-player";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCourseAudio } from "../_lib/helpers";
import { Music, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UrduIcon } from "@/assets/custom-icons/urdu-icon";
import "./styles.css";


interface VocabulariesHomePageProps {
  vocs: QuizWord[]
}
export function VocabulariesHomePage({ vocs }: VocabulariesHomePageProps) {
  // font for urdu script naskh | nastaleeq
  const [targetFont, setTargetFont] = React.useState<string | null>(null)

  const toggleTargetFont = () => {
    if (!targetFont) {
      localStorage.setItem("urduFont", 'nastaleeq');
      setTargetFont('nastaleeq');
    }
    else {
      localStorage.removeItem("urduFont")
      setTargetFont(null)
    }
  }



  // read localstore
  React.useEffect(() => {
    // Set the target font based on the user's preference
    const userFont = localStorage.getItem("urduFont");
    if (userFont === 'nastaleeq') {
      setTargetFont(userFont);
    }
    else {
      localStorage.removeItem("urduFont");
      setTargetFont(null);
    }
  }, [targetFont]);


  return (



    <Table className="w-full border text-md sm:text-lg">
      <TableHeader className="bg-green-100 rounded-xl">
        <TableRow className="">
          <TableHead className="text-center">المعنى</TableHead>
          <TableHead className=" ">
            <span className="flex justify-center">
              <Volume2 className="w-8 h-8 text-blue-600" />
            </span>
          </TableHead>
          <TableHead className="flex items-center gap-4 justify-end w-full">
            <div className="">المفردة</div>
            <Button onClick={toggleTargetFont}><UrduIcon className="w-8 h-8" /></Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vocs.map((voc) => (
          <TableRow key={voc.id}>
            <TableCell className="text-center" >{voc.sols[0].text}</TableCell>
            <TableCell className="text-center">
              <AudioPlayer
                audioUrl={getCourseAudio(voc.key)}
                text=""
              />
            </TableCell>
            <TableCell className="text-center text-green-800">
              {/* <span className={targetFont}>{voc.sols[1].text}</span> */}
              <span className={`text-center ${targetFont && targetFont}`}>{voc.sols[1].text}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  )


}


{/* 
      <div className="flex  mb-4 border border-gray-200 p-2 rounded-lg w-fit">
        
       
       
       
      </div>
       */}