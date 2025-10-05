// "use client";
// import { QuizQItem } from "../../_hooks/definitions";
// import { getAudioUrl } from "@/lib/helpers";
// import { convertQ } from "../../_hooks/converters";
// import { useHookstate } from "@hookstate/core";
// import { useGlobalState } from "../screens/_stores/global-state";
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

// type Option = {
//   id: string;
//   text: string;
// };

// export default function QuizQ({ quiz }: { quiz: QuizQItem }) {
//   const state = useHookstate({
//     questions: convertQ(quiz),
//     currentQuestionIndex: 0,
//     isLastQuestion: false,
 
//   });
//   const { playCorrectTune, playIncorrectTune } = useTune();
//   const feedBack = useHookstate<{ isCorrect: boolean; text: string } | null>(
//     null
//   );
//   const mainScreenState = useGlobalState();
//   const selectectOption = useHookstate<string | null>(null);
//   const currentQuestion = state.questions[state.currentQuestionIndex.get()];

//   // actions
//   const actions = {
//     checkAnswer: () => {
//       currentQuestion.isAnswered.set(true);
//       // check if option is correct
//       if (selectectOption.get() === currentQuestion.correctAnswerId.get()) {
//         playCorrectTune();
//         // add score
//         mainScreenState.setScore(mainScreenState.getScore() + 1);
//         feedBack.set({ isCorrect: true, text: "أحسنت" });
//         actions.nextQuestion();
//       } else {
//         playIncorrectTune();
//         const correctOption = currentQuestion.options.find(
//           (option) => option.id.get() === currentQuestion.correctAnswerId.get()
//         );
//         feedBack.set({
//           isCorrect: false,
//           text: "الإجابة الصحيحة هي: " + correctOption?.text.get(),
//         });
//         actions.nextQuestion();
//       }
//     },
//     nextQuestion: () => {
//       selectectOption.set(null);
//       // wait 2 seconds
//       setTimeout(() => {
//         //  if not last question
//         if (state.currentQuestionIndex.get() < state.questions.length - 1) {
//           state.currentQuestionIndex.set(state.currentQuestionIndex.get() + 1);
//         }
//         currentQuestion.isAnswered.set(false);
//         feedBack.set(null);
//         if (state.currentQuestionIndex.get() === state.questions.length - 1) {
//           state.isLastQuestion.set(true);
//         }
//       }, 2000);
//     },
//     selectOption: (optionId: string) => {
//       actions.playAudio(getAudioUrl(optionId));
//       selectectOption.set(optionId);
//     },
//     playAudio: (url: string) => {
//       const audio = new Audio(url);
//       audio.play();
//     },
//   };
//   const renderPlayerButton = (url: string) => {
//     return (
//       <CardDescription>
//         <TonePlayerButton
//           url={url}
           
//         />
//       </CardDescription>
//     );
//   };
//   console.log("sample: ", state.questions.get());
  
//   // next quiz if last question
//   if (state.isLastQuestion.get()) {
//     // wait 2 seconds
//     setTimeout(() => {
//       mainScreenState.nextQuiz();
//     }, 1000);
//     return;
//   }
//   return (
//     <div className="flex flex-col  text-right" dir="rtl">
//       {/* top progress */}
//       <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
//         <div className="flex items-center justify-between mb-4"></div>

//         <div className="w-full bg-white/20 rounded-full h-2">
//           <div
//             className="bg-white h-2 rounded-full transition-all duration-300"
//             style={{
//               width: `${((state.currentQuestionIndex.get() + 1) / state.questions.length) * 100}%`,
//             }}
//           />
//         </div>
//       </div>
//       {/* Header */}
//       <Card className="h-full">
//         <CardHeader className="flex flex-row text-right gap-6">
//           <CardTitle>
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
//             onValueChange={(value) => actions.selectOption(value)}
//             value={selectectOption.get()}
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
//             disabled={selectectOption.get() === null}
//             onClick={actions.checkAnswer}
//             className="w-full"
//           >
//             تأكد
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

 