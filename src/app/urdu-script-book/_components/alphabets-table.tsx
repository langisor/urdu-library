"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import alphabetsData from "@/data/additional/alphabet-tabel.json";
interface AlphabetsData {
  title: string;
  alphabets: {
    letter_alone: string;
    initial_form: string;
    medial_form: string;
    final_form: string;
    name_romanized: string;
    basic_sound_romanized: string;
    audio_link: string;
  }[];
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function AlphabetsTable() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const handlePlay = (audioLink: string) => {
    audioRef.current!.src = audioLink;
    audioRef.current!.play();
    setIsPlaying(true);
  };
  return (
    <div className="">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-zinc-700 text-xl font-bold ">
            <TableHead className="border w-full text-center bg-slate-600 text-white text-center self-center ">
              Letter Alone
            </TableHead>
            <TableHead className="border w-full text-center bg-slate-600 text-white text-center self-center ">
              Initial Form
            </TableHead>
            <TableHead className="border w-full text-center bg-slate-600 text-white text-center self-center ">
              Medial Form
            </TableHead>
            <TableHead className="border w-full text-center bg-slate-600 text-white text-center self-center ">
              Final Form
            </TableHead>
            <TableHead className="border w-full text-center bg-slate-600 text-white text-center self-center ">
              Name (Romanized)
            </TableHead>
            <TableHead className="border w-full text-center bg-slate-600 text-white text-center self-center ">
              Basic Sound (Romanized)
            </TableHead>
            <TableHead className="hidden">Audio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alphabetsData.alphabets.map((alphabet, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-100 p-2"
              onClick={() => handlePlay(alphabet.audio_link)}
            >
              <TableCell className="flex gap-2">
                <span className="text-xl border rounded-full text-white bg-green-600 w-8 text-center">
                  {index + 1}
                </span>
                <span className="ur text-lg">{alphabet.letter_alone}</span>
              </TableCell>
              <TableCell className="ur text-4xl text-center">
                <span className="">{alphabet.initial_form}</span>
              </TableCell>
              <TableCell className="ur text-4xl text-center">
                <span className="">{alphabet.medial_form}</span>
              </TableCell>
              <TableCell className="ur text-4xl text-center">
                <span className="">{alphabet.final_form}</span>
              </TableCell>
              <TableCell className="">{alphabet.name_romanized}</TableCell>
              <TableCell className="">
                {alphabet.basic_sound_romanized}
              </TableCell>

              <TableCell className="hidden">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handlePlay(alphabet.audio_link)}
                  disabled={isPlaying}
                >
                  {isPlaying ? "Playing..." : "Play Sound"}
                </Button>
                <audio ref={audioRef} playsInline autoPlay={false} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
