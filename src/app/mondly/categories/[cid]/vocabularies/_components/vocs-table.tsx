"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SolutionOrAlternate } from "@/app/mondly/_types/data-services";

interface IVocabulary {
  id: number;
  key: string;
  sols: SolutionOrAlternate[];
}

interface VocsTableProps {
  vocs: IVocabulary[];
}
export function VocsTable({ vocs }: VocsTableProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const playAudio = (audioUrl: string) => {
    if (isPlaying) {
      return;
    }
    const audio = new Audio(audioUrl);
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  const public_url = process.env.NEXT_PUBLIC_URL;
  return (
    <div className="flex flex-col gap-4 w-full">
      <Table className="w-full border">
        <TableHeader className="bg-gray-100 rounded-xl">
          <TableRow>
            <TableHead className="text-center">المفردة</TableHead>
            <TableHead className="text-center">
              <span className="flex items-center justify-center">
                <Music className="w-4 h-4" />
              </span>
            </TableHead>
            <TableHead className="text-center">المعنى</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vocs.map((voc) => (
            <TableRow key={voc.id}>
              <TableCell className="text-center">{voc.sols[0].text}</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="outline"
                  className="w-12 h-12 bg-blue-500 text-white rounded-full text-center"
                  disabled={isPlaying}
                  onClick={() =>
                    playAudio(`${public_url}/media/mondly/audios/${voc.key}`)
                  }
                >
                  <Play className="w-4 h-4" />
                </Button>
              </TableCell>
              <TableCell className="text-center">{voc.sols[1].text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
