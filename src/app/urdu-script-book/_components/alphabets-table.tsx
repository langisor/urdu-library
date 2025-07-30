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
      <h1>{alphabetsData.title}</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-zinc-700 text-xl font-bold ">
            <TableHead className="text-white">Letter Alone</TableHead>
            <TableHead className="text-white">Initial Form</TableHead>
            <TableHead className="text-white">Medial Form</TableHead>
            <TableHead className="text-white">Final Form</TableHead>
            <TableHead className="text-white">Name (Romanized)</TableHead>
            <TableHead className="text-white">
              Basic Sound (Romanized)
            </TableHead>
            <TableHead className="hidden">Audio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alphabetsData.alphabets.map((alphabet, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-100"
              onClick={() => handlePlay(alphabet.audio_link)}
            >
              <TableCell className="ur">{alphabet.letter_alone}</TableCell>
              <TableCell className="ur">{alphabet.initial_form}</TableCell>
              <TableCell className="ur">{alphabet.medial_form}</TableCell>
              <TableCell className="ur">{alphabet.final_form}</TableCell>
              <TableCell className="ur">{alphabet.name_romanized}</TableCell>
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
                <audio ref={audioRef} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
