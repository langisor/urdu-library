"use client";
import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCourseAudio } from "@/app/mondly/_lib/helpers";
import { Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UrduIcon } from "@/assets/custom-icons/urdu-icon";
import { HomeScreen } from "./home-screen";
import { QuizItem } from "./utils";

interface VocsTableProps {
  vocs: QuizItem[];
}
export function VocsTable({ vocs }: VocsTableProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [targetFont, setTargetFont] = React.useState<
    "naskh-text" | "nastaleeq-text"
  >("naskh-text");
  // reference to sheet status
  const [sheetOpen, setSheetOpen] = React.useState(false);
  // reference to audio element
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

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
    // Check if audio is already playing
    if (isPlaying) {
      console.warn("Audio is already playing.");
      return;
    }
    const audioSrc = getCourseAudio(audioUrl);
    console.log("Audio source:", audioSrc);
    audioRef.current = new Audio(audioSrc);
    audioRef.current.play();
    setIsPlaying(true);
    audioRef.current.onended = () => {
      setIsPlaying(false);
    };
  };
  console.log("currentItem vocs:", vocs);
  // Ensure audio is paused when component unmounts
  React.useEffect(() => {
    console.log("Cleaning up audio player");
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsPlaying(false);
      }
    };
  }, []);
  // console.log("VocsTable rendered with vocs:", vocs);
  return (
    <div className="flex flex-col gap-4 w-full" dir="rtl">
      <div className="flex  mb-4 border border-gray-200 p-2 rounded-lg w-fit">
        <Button
          variant="outline"
          onClick={toggleFont}
          className="text-sm text-gray-700 hover:bg-gray-100"
        >
          <UrduIcon className="ml-2 bg-blue-200" />
          {targetFont === "naskh-text" ? "Naskh Font" : "Nastaleeq Font"}
        </Button>
        <span className="mx-2 text-gray-500">|</span>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="text-sm text-gray-700 hover:bg-gray-100"
            >
              <span className="flex items-center justify-center">
                <Music className="w-4 h-4 mr-1" />
                أختبر نفسك
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-screen h-full">
            <SheetTitle className="text-lg font-semibold mb-4">Quiz</SheetTitle>
            <HomeScreen vocabularies={vocs} />
            <SheetClose asChild>
              <Button
                variant="outline"
                className="absolute top-2 right-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setSheetOpen(false)}
              >
                Close
              </Button>
            </SheetClose>
            <div className="flex flex-col items-center justify-center h-full"></div>
          </SheetContent>
        </Sheet>
      </div>
      <Table className="w-full border text-lg sm:text-xl">
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
