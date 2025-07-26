// "use client";

// import * as React from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// // import { AudioPlayer, type AudioPlayerProps } from "./audio-player";
// import { Headphones, BookOpen } from "lucide-react";
// import audioFilesData from "@/data/auto-generated/audio-files.json";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// interface MediaSheetProps {
//   title: string;
//   audioFiles: Record<
//     string,
//     {
//       folder_name: string;
//       base_path: string;
//       files: {
//         filename: string;
//         type: string;
//         itemNumber: string;
//         title: string;
//       }[];
//     }
//   >;
// }

// const getLessonAudioFiles = (id: string) => {
//   //  search by key in audioFilesData.structure.sound_and_script.lessons and push all files to array
//   const audioFiles: Record<
//     string,
//     {
//       folder_name: string;
//       base_path: string;
//       files: {
//         filename: string;
//         type: string;
//         itemNumber: string;
//         title: string;
//       }[];
//     }
//   > = audioFilesData.structure.sound_and_script.lessons;
//   return audioFiles[id];
// };
 
 
// export default function MediaSheet({
//   id,
//   title,
// }: {
//   id: string;
//   title: string;
// }) {
//   const [isOpen, setIsOpen] = React.useState(false);
  
//   return (
//     <Sheet open={isOpen} onOpenChange={setIsOpen}>
//       <SheetTrigger asChild>{title}</SheetTrigger>
//       <SheetContent side="right">
//         <SheetHeader>
//           <SheetTitle>{title}</SheetTitle>
//           <SheetDescription>
//             <ScrollArea className="h-[calc(100vh-10rem)]">
//               <LessonPlaylist id={id} open={isOpen} setIsOpen={setIsOpen}/>
//             </ScrollArea>
//           </SheetDescription>
//         </SheetHeader>
//       </SheetContent>
//     </Sheet>
//   );
// }

// function LessonPlaylist({
//   id,
//   open,
//   setIsOpen,
// }: {
//   id: string;
//   open: boolean;
//   setIsOpen: (open: boolean) => void;
// }) {
//   const lessonAudioFiles = getLessonAudioFiles(id);
//   return (
//     <ScrollArea className="h-[calc(100vh-10rem)]">
//       {lessonAudioFiles.files.map((file, index) => (
//         <Card key={index}>
//           <CardHeader>
//             <CardTitle>
//               {file.type === "exercise"
//                 ? `Exercise ${file.itemNumber}`
//                 : `Vocabulary ${file.itemNumber}`}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <AudioPlayer
//               audioFile={lessonAudioFiles.base_path + "/" + file.filename}
//             />
//           </CardContent>
//         </Card>
//       ))}
//     </ScrollArea>
//   );
// }
// function AudioPlayer({ audioFile }: { audioFile: string }) {
//   return (
//     <audio controls>
//       <source src={audioFile} type="audio/mpeg" />
//       Your browser does not support the audio element.
//     </audio>
//   );
// }
