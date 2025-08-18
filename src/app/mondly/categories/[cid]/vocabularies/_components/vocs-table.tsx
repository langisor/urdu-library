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
import { getAudioUrl, getCourseAudio } from "@/app/mondly/_lib/helpers";
import { Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SolutionOrAlternate } from "@/app/mondly/_types/data-services";
import { UrduIcon } from "@/assets/custom-icons/urdu-icon";

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
  const [targetFont, setTargetFont] = React.useState<
    "naskh-text" | "nastaleeq-text"
  >("naskh-text");

  React.useEffect(() => {
    // Set the target font based on the user's preference
    const userFont = localStorage.getItem("targetFont");
    if (userFont) {
      if (userFont === "nastaleeq-text" || userFont === "naskh-text") {
        setTargetFont(userFont as "naskh-text" | "nastaleeq-text");
      }
    }
  }, []);

  // function to toggle the font
  const toggleFont = () => {
    const newFont =
      targetFont === "naskh-text" ? "nastaleeq-text" : "naskh-text";
    setTargetFont(newFont);
    localStorage.setItem("targetFont", newFont);
  };

  // Function to play audio
  const playAudio = (audioUrl: string) => {
    console.log("Playing audio:", audioUrl);
    // url path
    const path = getCourseAudio(audioUrl);
    // If audio is already playing, do not play again
    if (isPlaying) {
      return;
    }
    const audio = new Audio(path);
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex  mb-4 border border-gray-200 p-2 rounded-lg w-fit">
        <Button
          variant="outline"
          onClick={toggleFont}
          className="text-sm text-gray-700 hover:bg-gray-100"
        >
          <UrduIcon className="ml-2 bg-blue-200" />
          {targetFont === "naskh-text" ? "Naskh Font" : "Nastaleeq Font"}
        </Button>
      </div>
      <Table className="w-full border text-md sm:text-lg">
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
                  onClick={() => playAudio(`${voc.key}`)}
                >
                  <Play className="w-4 h-4" />
                </Button>
              </TableCell>
              <TableCell className="text-center text-green-800">
                <span className={targetFont}>{voc.sols[1].text}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
