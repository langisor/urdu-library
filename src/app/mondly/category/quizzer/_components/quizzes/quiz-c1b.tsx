// "use client";
// import { QuizC1bItem } from "../definitions";
// import { convertC1b } from "../converters";
// import { useHookstate, State } from "@hookstate/core";

// import { useTune } from "@/hooks/use-tone";
// import { Button } from "@/components/ui/button";
// import { TonePlayerButton } from "@/components/general/tone-button-player";
// import { Card, CardContent, CardDescription } from "@/components/ui/card";
// import { shuffleArray } from "@/lib/helpers";
// import * as React from "react";
// import { Feedback } from "../helpers-types";

// interface QuizC1bState {
//   question: QuizC1bItem;
//   quizzerFeedback: State<Feedback>;
//   onNextQuiz: () => void;
// }
// export default function QuizC1b({
//   quiz,
//   quizzerFeedback,
//   onNextQuiz,
// }: {
//   quiz: QuizC1bItem;
//   quizzerFeedback: State<Feedback>;
//   onNextQuiz: () => void;
// }) {
//   const state = useHookstate({
//     question: convertC1b(quiz),
//   });
//   const { playCorrectTune, playIncorrectTune } = useTune();
//   const filledToken: State<{ key: string; text: string }> = useHookstate({
//     key: state.question.sentence.find((t) => t.isHidden)!.key.get(),
//     text: "______",
//   });
//   console.log("quiz", quiz);
//   const checkAnswer = () => {
//     console.log("checkAnswer()...");
//     if (filledToken.key.get() === state.question.sentence.find((t) => t.isHidden)!.key.get()) {
//       playCorrectTune();
//     } else {
//       playIncorrectTune();
//     }     
//   };

//   const renders = {
//     renderHeader: () => {
//       return (
//         <Card className="px-2 flex flex-row gap-2 items-center py-2">
//           <CardContent className="flex flex-row gap-2 items-center">
//             <div>{state.question.text.get()}</div>
//             <div>
//               <TonePlayerButton url={state.question.audioFile.get()} />
//             </div>
//           </CardContent>
//         </Card>
//       );
//     },
//     renderSentence: () => {
//       const hiddenToken = state.question.sentence.find((t) => t.isHidden);
//       return (
//         <Card className="px-2 flex flex-row gap-2 items-center py-2">
//           <CardContent>
//             {state.question.sentence.map((token, index) =>
//               token.key.get() === filledToken.key.get() ? (
//                 <span key={index}>{filledToken.text.get()}</span>
//               ) : (
//                 <span key={index}>{token.text.get()}</span>
//               )
//             )}
//           </CardContent>
//         </Card>
//       );
//     },
//     renderTokens: () => {
//       return (
//         <CardContent>
//           {state.question.tokens.get().map((token, index) => (
//             <Button key={index} onClick={() => filledToken.set(token)} className="mr-2 mb-2">
//               {token.text}
//             </Button>
//           ))}
//         </CardContent>
//       );
//     },
//   };

//   console.log("state.question.sentence.get()", state.question.tokens.get());
//   return (
//     <Card className="flex flex-col gap-6 arabic-text px-2">
//       <div>{renders.renderHeader()}</div>
//       <div>{renders.renderSentence()}</div>
//       <div>{renders.renderTokens()}</div>
//       <div className="flex justify-center">
//         <Button
//           disabled={quizzerFeedback.isAnswered.get()}
//           onClick={checkAnswer}
//           className="w-2/3"
//         >
//           تأكد
//         </Button>
//       </div>
//     </Card>
//   );
// }

// interface SentenceProps {
//   sentence: State<{ key: string; text: string; isHidden: boolean }[]>;
// }
// const Sentence = ({ sentence }: SentenceProps) => {
//   const tokens = sentence.get();
//   return (
//     <Card className="px-2 flex flex-row gap-2 items-center py-2">
//       <CardContent>
//         {tokens.map((token, index) => (
//           <span className="mr-2" key={index}>
//             {token.text}
//           </span>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };
