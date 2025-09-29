// "use client";

// import {
//   type Question,
//   Feedback,
//   mergeElements,
//   shuffleArray,
// } from "../helpers-types";
// import * as React from "react";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { State, useHookstate } from "@hookstate/core";
// // import {}

// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Button } from "@/components/ui/button";
// import { LoadingSpinner } from "../loading-spinner";

// interface QuizProps {
//   question: Question;
//   feedback: State<Feedback>;
//   onNext: () => void | null;
// }
// export function MultipleChoiceQuestion({
//   question,
//   feedback,
//   onNext,
// }: QuizProps) {
//   // states
//   const selectOption = useHookstate<string | null>(null); // track if an option is selected

//   // handlers and functions

//   // when user press/select option
//   const setSelectedOption = (value: string) => {
//     console.log("setSelectedOption", value);
//     selectOption.set(value);
//   };
//   // after user pressed 'check answer' button
//   const checkAnswer = () => {
//     console.log("MC checkAnswer()....");
//     // answerState.set(true);
//     feedback.isAnswered.set(true);
//     // check if correct then update score and move to next quiz
//     if (selectOption.get() === question.correct_answer) {
//       // fill in feedback info
//       feedback.isCorrect.set(true);
//       feedback.message.set("Great... thats correct");
//     } else {
//       feedback.isCorrect.set(false);
//       feedback.message.set(
//         `Incorrect: the correct answer is: ${question.correct_answer}`
//       );
//     }
//   };

//   const renderOptions = () => {
//     console.log("MC renderOption...");
//     // simplify question
//     // unify current question options
//     const meregedOptions = mergeElements(
//       question.incorrect_answers,
//       question.correct_answer
//     );

//     const unifiedQuestion: MultichoiceQuestion = {
//       question: question.question,
//       options: shuffleArray(meregedOptions),
//       correct_answer: question.correct_answer,
//     };
//     // map the options to radio group items
//     return unifiedQuestion.options.map((option) => (
//       <div key={option} className="flex items-center gap-3">
//         <RadioGroupItem value={option} id={option} />
//         <Label htmlFor={option}>{option}</Label>
//       </div>
//     ));
//   };
//   const renderQuestion = () => {
//     console.log("MC renderQuestion ....");
//     return (
//       <Card className="px-2 m-1   border-0 italic font-bold bg-gradient-to-l from-blue to-green-50">
//         <CardContent>{question.question}</CardContent>
//       </Card>
//     );
//   };
//   const renderSpinner = () => {
//     if (feedback.isAnswered.get() === true) {
//       return <LoadingSpinner onNext={onNext} />;
//     }
//   };

//   return (
//     <Card>
//       {renderQuestion()}
//       <CardContent>
//         <RadioGroup onValueChange={(value) => setSelectedOption(value)}>
//           {renderOptions()}
//         </RadioGroup>
//         <CardFooter className="flex flex-row gap-3 mt-5">
//           <Button onClick={checkAnswer}>Check Answer</Button>
//           {renderSpinner()}
//         </CardFooter>
//       </CardContent>
//     </Card>
//   );
// }
