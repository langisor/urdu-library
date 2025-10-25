"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import type { Verb, TenseType, VerbConjugation } from "./types";
import {
  CheckCircle2Icon,
  XCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  TrophyIcon,
} from "lucide-react";

interface VerbQuizerSheetProps {
  verb: Verb | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const pronouns = [
  "I (میں)",
  "You (تم)",
  "He (وہ)",
  "She (وہ)",
  "We (ہم)",
  "You (آپ)",
  "They (وہ)",
];

type QuizType = "true-false" | "audio-choice";

interface QuizQuestion {
  type: QuizType;
  tense: TenseType;
  pronounIndex: number;
  conjugation: VerbConjugation;
  statement?: string;
  isCorrectStatement?: boolean;
  options?: { text: string }[];
}

export function VerbQuizerSheet({
  verb,
  open,
  onOpenChange,
}: VerbQuizerSheetProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(boolean | number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (open && verb) {
      initializeQuiz();
    }
  }, [open, verb]);

  const initializeQuiz = () => {
    if (!verb) return;

    const newQuestions: QuizQuestion[] = [];

    // Generate 3 True/False questions
    for (let i = 0; i < 3; i++) {
      newQuestions.push(generateTrueFalseQuestion());
    }

    // Generate 3 Audio Choice questions
    for (let i = 0; i < 3; i++) {
      newQuestions.push(generateAudioChoiceQuestion());
    }

    // Shuffle questions
    const shuffled = newQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentStep(0);
    setAnswers(new Array(6).fill(null));
    setShowResult(false);
    setQuizCompleted(false);
  };

  const generateTrueFalseQuestion = (): QuizQuestion => {
    if (!verb) throw new Error("Verb is required");

    const tenses: TenseType[] = ["pr", "pa", "fu"];
    const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
    const randomPronounIndex = Math.floor(Math.random() * 7);
    const correctConjugation = verb.conj[randomTense][randomPronounIndex];

    const isCorrect = Math.random() > 0.5;
    let displayedConjugation = correctConjugation;

    if (!isCorrect) {
      const allConjugations = [
        ...verb.conj.pr,
        ...verb.conj.pa,
        ...verb.conj.fu,
      ].filter((c) => c.t.key !== correctConjugation.t.key);
      displayedConjugation =
        allConjugations[Math.floor(Math.random() * allConjugations.length)];
    }

    return {
      type: "true-false",
      tense: randomTense,
      pronounIndex: randomPronounIndex,
      conjugation: correctConjugation,
      statement: displayedConjugation.t.text,
      isCorrectStatement: isCorrect,
    };
  };

  const generateAudioChoiceQuestion = (): QuizQuestion => {
    if (!verb) throw new Error("Verb is required");

    const tenses: TenseType[] = ["pr", "pa", "fu"];
    const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
    const randomPronounIndex = Math.floor(Math.random() * 7);
    const correctConjugation = verb.conj[randomTense][randomPronounIndex];

    const allConjugations = [
      ...verb.conj.pr,
      ...verb.conj.pa,
      ...verb.conj.fu,
    ].filter((c) => c.t.key !== correctConjugation.t.key);

    const wrongOptions = allConjugations
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const allOptions = [
      correctConjugation.m,
      ...wrongOptions.map((o) => o.m),
    ].sort(() => Math.random() - 0.5);

    return {
      type: "audio-choice",
      tense: randomTense,
      pronounIndex: randomPronounIndex,
      conjugation: correctConjugation,
      options: allOptions,
    };
  };

  const handleAnswer = (answer: boolean | number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowResult(answers[currentStep - 1] !== null);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      const answer = answers[idx];
      if (q.type === "true-false") {
        if (answer === q.isCorrectStatement) correct++;
      } else if (q.type === "audio-choice") {
        if (
          q.options &&
          typeof answer === "number" &&
          q.options[answer].text === q.conjugation.m.text
        )
          correct++;
      }
    });
    return correct;
  };

  if (!verb || questions.length === 0) return null;

  const currentQuestion = questions[currentStep];
  const getTenseName = (tense: TenseType) => {
    return tense === "pr"
      ? verb.tenseNames.pr
      : tense === "pa"
        ? verb.tenseNames.pa
        : verb.tenseNames.fu;
  };

  const isAnswerCorrect = () => {
    const answer = answers[currentStep];
    if (currentQuestion.type === "true-false") {
      return answer === currentQuestion.isCorrectStatement;
    } else if (currentQuestion.type === "audio-choice") {
      return (
        currentQuestion.options &&
        typeof answer === "number" &&
        currentQuestion.options[answer].text ===
          currentQuestion.conjugation.m.text
      );
    }
    return false;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">Quiz: {verb.name.t}</SheetTitle>
          <SheetDescription>
            Test your knowledge of verb conjugations
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {!quizCompleted && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Question {currentStep + 1} of {questions.length}
                </span>
                <span>
                  {currentQuestion.type === "true-false"
                    ? "True/False"
                    : "Audio Quiz"}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {quizCompleted ? (
            <div className="space-y-6 py-8">
              <Card className="p-8 text-center bg-primary/5">
                <TrophyIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">Quiz Complete!</h3>
                <p className="text-5xl font-bold text-primary my-6">
                  {calculateScore()} / {questions.length}
                </p>
                <p className="text-lg text-muted-foreground">
                  {Math.round((calculateScore() / questions.length) * 100)}%
                  Correct
                </p>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>
                <Button size="lg" onClick={initializeQuiz}>
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {currentQuestion.type === "true-false" ? (
                  <>
                    <Card className="p-6 bg-primary/5">
                      <h3 className="text-lg font-semibold mb-4">
                        Is this conjugation correct?
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Verb:{" "}
                          <span className="font-medium text-foreground">
                            {verb.name.t}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Pronoun:{" "}
                          <span className="font-medium text-foreground">
                            {pronouns[currentQuestion.pronounIndex]}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Tense:{" "}
                          <span className="font-medium text-foreground">
                            {getTenseName(currentQuestion.tense)}
                          </span>
                        </p>
                        <div className="mt-4 p-4 bg-background rounded-lg border-2">
                          <p className="text-2xl font-bold text-center">
                            {currentQuestion.statement}
                          </p>
                        </div>
                      </div>
                    </Card>

                    {!showResult ? (
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          size="lg"
                          variant="outline"
                          className="h-20 text-lg bg-transparent"
                          onClick={() => handleAnswer(true)}
                        >
                          <CheckCircle2Icon className="mr-2 h-6 w-6" />
                          True
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="h-20 text-lg bg-transparent"
                          onClick={() => handleAnswer(false)}
                        >
                          <XCircleIcon className="mr-2 h-6 w-6" />
                          False
                        </Button>
                      </div>
                    ) : (
                      <Card
                        className={`p-4 ${
                          isAnswerCorrect()
                            ? "bg-green-100 dark:bg-green-900/30 border-green-500"
                            : "bg-red-100 dark:bg-red-900/30 border-red-500"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isAnswerCorrect() ? (
                            <CheckCircle2Icon className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                          ) : (
                            <XCircleIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                          )}
                          <div className="flex-1">
                            <p className="font-semibold mb-2">
                              {isAnswerCorrect() ? "Correct!" : "Incorrect!"}
                            </p>
                            <p className="text-sm">
                              The correct conjugation is:{" "}
                              <span className="font-bold">
                                {currentQuestion.conjugation.t.text}
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {currentQuestion.conjugation.t.phonetic}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <TonePlayerButton
                              url={currentQuestion.conjugation.t.key}
                            />
                            <p className="urdu-text">
                              {currentQuestion.conjugation.t.text}
                            </p>
                          </div>
                        </div>
                      </Card>
                    )}
                  </>
                ) : (
                  <>
                    <Card className="p-6 bg-primary/5">
                      <h3 className="text-lg font-semibold mb-4">
                        Listen and select the correct Arabic translation
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Verb:{" "}
                          <span className="font-medium text-foreground">
                            {verb.name.t}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Pronoun:{" "}
                          <span className="font-medium text-foreground">
                            {pronouns[currentQuestion.pronounIndex]}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Tense:{" "}
                          <span className="font-medium text-foreground">
                            {getTenseName(currentQuestion.tense)}
                          </span>
                        </p>
                        <div className="mt-4 flex justify-center">
                          <TonePlayerButton
                            url={currentQuestion.conjugation.t.key}
                          />
                          <p className="urdu-text">
                            {currentQuestion.conjugation.t.text}
                          </p>
                        </div>
                      </div>
                    </Card>

                    <div className="space-y-3">
                      {currentQuestion.options?.map((option, idx) => {
                        const isSelected = answers[currentStep] === idx;
                        const isCorrect =
                          option.text === currentQuestion.conjugation.m.text;
                        const showCorrect = showResult && isCorrect;
                        const showWrong =
                          showResult && isSelected && !isCorrect;

                        return (
                          <Card
                            key={idx}
                            className={`p-4 cursor-pointer transition-colors ${
                              showCorrect
                                ? "bg-green-100 dark:bg-green-900/30 border-green-500"
                                : showWrong
                                  ? "bg-red-100 dark:bg-red-900/30 border-red-500"
                                  : isSelected
                                    ? "bg-primary/10 border-primary"
                                    : "hover:bg-muted"
                            }`}
                            onClick={() => !showResult && handleAnswer(idx)}
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-xl font-medium">
                                {option.text}
                              </p>
                              {showCorrect && (
                                <CheckCircle2Icon className="h-6 w-6 text-green-600" />
                              )}
                              {showWrong && (
                                <XCircleIcon className="h-6 w-6 text-red-600" />
                              )}
                            </div>
                          </Card>
                        );
                      })}
                    </div>

                    {showResult && (
                      <Card className="p-4 bg-muted">
                        <p className="text-sm font-medium mb-2">
                          Correct Answer:
                        </p>
                        <p className="text-lg">
                          {currentQuestion.conjugation.t.text}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {currentQuestion.conjugation.t.phonetic}
                        </p>
                      </Card>
                    )}
                  </>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex-1 bg-transparent"
                >
                  <ChevronLeftIcon className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!showResult}
                  className="flex-1"
                >
                  {currentStep === questions.length - 1 ? "Finish" : "Next"}
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
