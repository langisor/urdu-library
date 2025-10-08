// "use client";
// import { QuizQItem } from "../definitions";
// import { getAudioUrl } from "@/lib/helpers";
// import { convertQ } from "../converters";
// import { useHookstate, State } from "@hookstate/core";

// import { Button } from "@/components/ui/button";
// import { useTune } from "@/hooks/use-tone";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { TonePlayerButton } from "@/components/general/tone-button-player";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "@/components/ui/card";
// import * as React from "react";
// import { JsonViewerComponent } from "@/components/general/json-viewer-component";
// import type { Feedback } from "../definitions";
// import { useStep } from "@/hooks/use-step";
// type Option = {
//   id: string;
//   text: string;
// };
// type ScoreState = { userName: string; score: number };
// interface QuizQProps {
//   quizData: QuizQItem;
//   quizzerFeedback: State<Feedback>;
//   scoreState: State<ScoreState>;
// }

// export default function QuizQ({
//   quizData,
//   quizzerFeedback,
//   scoreState,
// }: QuizQProps) {
//   const state = useHookstate({
//     questions: convertQ(quizData),
//   });
//   const [currentQuestionIndex, actions] = useStep(state.questions.length);
//   const { playCorrectTune, playIncorrectTune } = useTune();
//   const feedBack = useHookstate<{ isCorrect: boolean; text: string } | null>(
//     null
//   );
//   const selectedOption = useHookstate<string>("");
//   const currentQuestion = state.questions[currentQuestionIndex];

//   // actions

//   const checkAnswer = () => {
     
//     // check if option is correct
//     if (   selectedOption.get() === currentQuestion.correctAnswerId.get()) {
//       playCorrectTune();
//       // add score

//       feedBack.set({ isCorrect: true, text: "أحسنت" });
//       scoreState.set((p) => ({ ...p, score: p.score + 1 }));
//       nextQuestion();
//     } else {
//       playIncorrectTune();
//       const correctOption = currentQuestion.options.find(
//         (option) => option.id.get() === currentQuestion.correctAnswerId.get()
//       );
//       feedBack.set({
//         isCorrect: false,
//         text: "الإجابة الصحيحة هي: " + correctOption?.text.get(),
//       });
//       nextQuestion();
//     }
//   };
//   const nextQuestion = () => {
//     currentQuestion.isAnswered.set(false);
//     selectedOption.set("");
//     feedBack.set(null);
//     // wait 2 seconds

//     //  if not last question
//     if (actions.canGoToNextStep) {
//       actions.goToNextStep();
//     } else {
//       quizzerFeedback.isAnswered.set(true);
//     }
//   };

//   const selectOption = (optionId: string) => {
//     playAudio(getAudioUrl(optionId));
//     selectedOption.set(optionId);
//   };

//   const playAudio = (url: string) => {
//     const audio = new Audio(url);
//     audio.play();
//   };

//   const renderPlayerButton = (url: string) => {
//     return (
//       <CardDescription>
//         <TonePlayerButton url={url} />
//       </CardDescription>
//     );
//   };
//   console.log("QuizQ : ", quizData);

//   return (
//     <div className="flex flex-col  text-right" dir="rtl">
//       {/* top progress */}
//       <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
//         <div className="flex items-center justify-between mb-4"></div>

//         <div className="w-full bg-white/20 rounded-full h-2">
//           <div
//             className="bg-white h-2 rounded-full transition-all duration-300"
//             style={{
//               width: `${((currentQuestionIndex + 1) / state.questions.length) * 100}%`,
//             }}
//           />
//         </div>
//       </div>
//       {/* Header */}
//       <Card className="h-full">
//         <CardHeader className="flex flex-row text-right gap-6 items-center">
//           <CardTitle className="urdu-text">
//             <p>{currentQuestion.text.get()}</p>
//           </CardTitle>

//           <CardDescription>
//             {renderPlayerButton(currentQuestion.audioFile.get())}
//           </CardDescription>
//         </CardHeader>
//         {/* options area */}
//         <CardContent>
//           <RadioGroup
//             className="flex flex-col gap-2 text-right"
//             dir="rtl"
//             onValueChange={(value) =>  selectOption(value)}
//             value={ selectedOption.get()}
//           >
//             {currentQuestion.options.map((option) => (
//               <Card
//                 className={`flex flex-row px-2  gap-3 hover:bg-gray-100 cursor-pointer transition-all hover:scale-105 text-xl  `}
//                 key={option.id.get()}
//               >
//                 <RadioGroupItem value={option.id.get()} id={option.id.get()} />
//                 <Label htmlFor={option.id.get()} className="w-full ">
//                   {option.text.get()}
//                 </Label>
//               </Card>
//             ))}
//           </RadioGroup>
//           {feedBack && (
//             <Card>
//               <CardContent>
//                 <p
//                   className={
//                     feedBack.get()?.isCorrect
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }
//                 >
//                   {feedBack.get()?.text}
//                 </p>
//               </CardContent>
//             </Card>
//           )}
//         </CardContent>
//       </Card>
//       <Card>
//         <CardContent>
//           <Button
//             disabled={selectedOption.get() === ""}
//             onClick={checkAnswer}
//             className="w-full"
//           >
//             تأكد
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
