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
import { IVocabulary } from "@/types/vocabulary";
import { Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
interface VocsTableProps {
  vocs: IVocabulary[];
}
export function VocsTable({ vocs }: VocsTableProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const playAudio = (audioUrl: string) => {
    if (isPlaying) {
      return;
    }
    setIsPlaying(true);
    const audio = new Audio(audioUrl);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  return (
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
                style={isPlaying ? { backgroundColor: "red" } : {}}
                disabled={isPlaying}
                onClick={() =>
                  playAudio(
                    `http://localhost:3000/media/mondly/audios/${voc.key}`
                  )
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
  );
}
