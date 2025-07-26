// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import {
//   Play,
//   Pause,
//   ArrowLeft,
//   Home,
//   BookOpen,
//   Layers,
//   Volume2,
//   SkipBack,
//   SkipForward,
// } from "lucide-react";
// import audioData from "@/data/auto-generated/audio-files.json";
// import { AudioFile } from "@/lib/audio-mapper";
// import { AudioPlayer } from "./audio/audio-player";
// type ViewState =
//   | { type: "home" }
//   | { type: "sound-script" }
//   | { type: "sound-script-lesson"; lessonId: string }
//   | { type: "units" }
//   | { type: "unit"; unitId: string }
//   | { type: "chapter"; unitId: string; chapterId: string };

// // type AudioFile = {
// //   filename: string
// //   type: string
// //   title: string
// //   exercise_number?: string
// //   vocabulary_number?: string
// //   path?: string
// // }

// type CurrentAudio = {
//   file: AudioFile;
//   path: string;
//   context: string;
// };

// export default function AudioBookNavigator() {
//   const [viewState, setViewState] = useState<ViewState>({ type: "home" });
//   const [currentAudio, setCurrentAudio] = useState<CurrentAudio | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef<HTMLAudioElement>(null);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const updateTime = () => setCurrentTime(audio.currentTime);
//     const updateDuration = () => setDuration(audio.duration);
//     const handleEnded = () => setIsPlaying(false);

//     audio.addEventListener("timeupdate", updateTime);
//     audio.addEventListener("loadedmetadata", updateDuration);
//     audio.addEventListener("ended", handleEnded);

//     return () => {
//       audio.removeEventListener("timeupdate", updateTime);
//       audio.removeEventListener("loadedmetadata", updateDuration);
//       audio.removeEventListener("ended", handleEnded);
//     };
//   }, [currentAudio]);

//   const playAudio = (file: AudioFile, path: string, context: string) => {
//     setCurrentAudio({ file, path, context });
//     setIsPlaying(true);
//   };

//   const togglePlayPause = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const renderHome = () => (
//     <div className="space-y-6">
//       <div className="text-center space-y-4">
//         <h1 className="text-4xl font-bold">Audio Book Navigator</h1>
//         <p className="text-lg text-muted-foreground">
//           Navigate through your Urdu learning materials
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         <Card
//           className="cursor-pointer hover:shadow-lg transition-shadow"
//           onClick={() => setViewState({ type: "sound-script" })}
//         >
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <BookOpen className="h-6 w-6" />
//               Sound and Script
//             </CardTitle>
//             <CardDescription>
//               {audioData.statistics.total_sound_script_lessons} lessons with
//               pronunciation exercises
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between text-sm text-muted-foreground">
//               <span>Lessons 1-16</span>
//               <Badge variant="secondary">
//                 {Object.values(
//                   audioData.structure.sound_and_script.lessons
//                 ).reduce((acc, lesson) => acc + lesson.files.length, 0)}{" "}
//                 files
//               </Badge>
//             </div>
//           </CardContent>
//         </Card>

//         <Card
//           className="cursor-pointer hover:shadow-lg transition-shadow"
//           onClick={() => setViewState({ type: "units" })}
//         >
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Layers className="h-6 w-6" />
//               Units
//             </CardTitle>
//             <CardDescription>
//               {audioData.statistics.total_units} units with structured chapters
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between text-sm text-muted-foreground">
//               <span>
//                 {audioData.statistics.total_chapters_with_audio} chapters
//               </span>
//               <Badge variant="secondary">
//                 {audioData.statistics.total_exercise_files +
//                   audioData.statistics.total_vocabulary_files}{" "}
//                 files
//               </Badge>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {audioData.structure.root_files.length > 0 && (
//         <Card>
//           <CardHeader>
//             <CardTitle>General Files</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {audioData.structure.root_files.map((file, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between p-2 border rounded"
//                 >
//                   <span>{file.description}</span>
//                   <AudioPlayer
//                     audioFile={{
//                       filename: file.filename,
//                       type: file.type as "exercise" | "vocabulary",
//                       title: file.description,
//                       number: (index + 1).toString(),
//                       path: file.path,
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );

//   const renderSoundScript = () => (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Button
//           variant="outline"
//           onClick={() => setViewState({ type: "home" })}
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Home
//         </Button>
//         <h1 className="text-3xl font-bold">Sound and Script Lessons</h1>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {Object.entries(audioData.structure.sound_and_script.lessons).map(
//           ([lessonId, lesson]) => (
//             <Card
//               key={lessonId}
//               className="cursor-pointer hover:shadow-lg transition-shadow"
//               onClick={() =>
//                 setViewState({ type: "sound-script-lesson", lessonId })
//               }
//             >
//               <CardHeader>
//                 <CardTitle>Lesson {lessonId}</CardTitle>
//                 <CardDescription>
//                   {lesson.files.length} exercises
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Badge variant="outline">{lesson.folder_name}</Badge>
//               </CardContent>
//             </Card>
//           )
//         )}
//       </div>
//     </div>
//   );

//   const renderSoundScriptLesson = (lessonId: number) => {
//     const lesson = Object.values(audioData.structure.sound_and_script.lessons)[
//       lessonId
//     ];
//     if (!lesson) return null;

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-4">
//           <Button
//             variant="outline"
//             onClick={() => setViewState({ type: "sound-script" })}
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Lessons
//           </Button>
//           <h1 className="text-3xl font-bold">Lesson {lessonId}</h1>
//         </div>

//         <div className="grid gap-4">
//           {lesson.files.map((file, index) => (
//             <Card key={index}>
//               <CardContent className="flex items-center justify-between p-4">
//                 <div>
//                   <h3 className="font-semibold">{file.title}</h3>
//                   <p className="text-sm text-muted-foreground">
//                     {file.filename}
//                   </p>
//                 </div>
//                 <AudioPlayer
//                   audioFile={{
//                     filename: file.filename,
//                     type: file.type as "exercise" | "vocabulary",
//                     title: file.title,
//                     number: (index + 1).toString(),
//                     path: lesson.path + "/" + file.filename,
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderUnits = () => (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Button
//           variant="outline"
//           onClick={() => setViewState({ type: "home" })}
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Home
//         </Button>
//         <h1 className="text-3xl font-bold">Units</h1>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {Object.entries(audioData.structure.units).map(([unitId, unit]) => {
//           const chapterCount = Object.keys(unit.chapters).length;
//           const fileCount = Object.values(unit.chapters).reduce(
//             (acc, chapter) => acc + chapter.files.length,
//             0
//           );

//           return (
//             <Card
//               key={unitId}
//               className="cursor-pointer hover:shadow-lg transition-shadow"
//               onClick={() => setViewState({ type: "unit", unitId })}
//             >
//               <CardHeader>
//                 <CardTitle>Unit {unitId}</CardTitle>
//                 <CardDescription>
//                   {chapterCount} chapters • {fileCount} files
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Badge variant="outline">{unit.folder_name}</Badge>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );

//   const renderUnit = (unitId: number) => {
//     const unit = getAudioForLesson(unitId);

//     if (!unit) return null;

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-4">
//           <Button
//             variant="outline"
//             onClick={() => setViewState({ type: "units" })}
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Units
//           </Button>
//           <h1 className="text-3xl font-bold">Unit {unitId}</h1>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {Object.entries(unit).map(([chapterId, chapter]) => (
//             <Card
//               key={chapterId}
//               className="cursor-pointer hover:shadow-lg transition-shadow"
//               onClick={() =>
//                 setViewState({
//                   type: "chapter",
//                   unitId: unitId.toString(),
//                   chapterId: chapterId.toString(),
//                 })
//               }
//             >
//               <CardHeader>
//                 <CardTitle>Chapter {chapterId}</CardTitle>
//                 <CardDescription>{chapter.files.length} files</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex gap-2">
//                   {chapter.files.some((f: any) => f.type === "exercise") && (
//                     <Badge variant="secondary">Exercises</Badge>
//                   )}
//                   {chapter.files.some((f: any) => f.type === "vocabulary") && (
//                     <Badge variant="outline">Vocabulary</Badge>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderChapter = (unitId: string, chapterId: string) => {
//     const chapterFiles = getAudioForLesson(Number(unitId), Number(chapterId));
//     const exercises = chapterFiles.exercises;
//     const vocabulary = chapterFiles.vocabulary;

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-4">
//           <Button
//             variant="outline"
//             onClick={() => setViewState({ type: "unit", unitId })}
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Unit {unitId}
//           </Button>
//           <h1 className="text-3xl font-bold">Chapter {chapterId}</h1>
//         </div>

//         {exercises.length > 0 && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Exercises</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               {exercises.map((file, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between p-2 border rounded"
//                 >
//                   <div>
//                     <span className="font-medium">{file.title}</span>
//                     <p className="text-sm text-muted-foreground">
//                       {file.filename}
//                     </p>
//                   </div>
//                   <AudioPlayer audioFile={file} />
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         )}

//         {vocabulary.length > 0 && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Vocabulary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               {vocabulary.map((file, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between p-2 border rounded"
//                 >
//                   <div>
//                     <span className="font-medium">{file.title}</span>
//                     <p className="text-sm text-muted-foreground">
//                       {file.filename}
//                     </p>
//                   </div>
//                   <AudioPlayer audioFile={file} />
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     );
//   };

//   const renderCurrentView = () => {
//     switch (viewState.type) {
//       case "home":
//         return renderHome();
//       case "sound-script":
//         return renderSoundScript();
//       case "sound-script-lesson":
//         return renderSoundScriptLesson(Number(viewState.lessonId));
//       case "units":
//         return renderUnits();
//       case "unit":
//         return renderUnit(Number(viewState.unitId));
//       case "chapter":
//         return renderChapter(viewState.unitId, viewState.chapterId);
//       default:
//         return renderHome();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto p-6 pb-32">{renderCurrentView()}</div>

//       {/* Audio Player */}
//       {currentAudio && (
//         <>
//           <audio
//             ref={audioRef}
//             src={`/placeholder.mp3?query=${encodeURIComponent(
//               currentAudio.file.filename
//             )}`}
//             autoPlay
//           />

//           <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
//             <div className="container mx-auto">
//               <div className="flex items-center gap-4">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setViewState({ type: "home" })}
//                 >
//                   <Home className="h-4 w-4" />
//                 </Button>

//                 <div className="flex-1">
//                   <div className="flex items-center justify-between mb-2">
//                     <div>
//                       <h4 className="font-semibold">
//                         {currentAudio.file.title}
//                       </h4>
//                       <p className="text-sm text-muted-foreground">
//                         {currentAudio.context}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Button variant="outline" size="sm">
//                         <SkipBack className="h-4 w-4" />
//                       </Button>
//                       <Button onClick={togglePlayPause}>
//                         {isPlaying ? (
//                           <Pause className="h-4 w-4" />
//                         ) : (
//                           <Play className="h-4 w-4" />
//                         )}
//                       </Button>
//                       <Button variant="outline" size="sm">
//                         <SkipForward className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <span className="text-sm text-muted-foreground">
//                       {formatTime(currentTime)}
//                     </span>
//                     <Progress
//                       value={duration ? (currentTime / duration) * 100 : 0}
//                       className="flex-1"
//                     />
//                     <span className="text-sm text-muted-foreground">
//                       {formatTime(duration)}
//                     </span>
//                     <Volume2 className="h-4 w-4 text-muted-foreground" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
