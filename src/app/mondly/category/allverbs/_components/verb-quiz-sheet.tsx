"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import type { Verb, TenseType, VerbConjugation } from "./types";
import { CheckCircle2Icon, XCircleIcon, RefreshCwIcon } from "lucide-react";

interface VerbQuizSheetProps {
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

export function VerbQuizSheet({
  verb,
  open,
  onOpenChange,
}: VerbQuizSheetProps) {
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    tense: TenseType;
    pronounIndex: number;
    conjugation: VerbConjugation;
  } | null>(null);
  const [options, setOptions] = useState<VerbConjugation[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const startQuiz = () => {
    if (!verb) return;
    setQuizMode(true);
    setScore({ correct: 0, total: 0 });
    generateQuestion();
  };

  const generateQuestion = () => {
    if (!verb) return;

    // Pick random tense and pronoun
    const tenses: TenseType[] = ["pr", "pa", "fu"];
    const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
    const randomPronounIndex = Math.floor(Math.random() * 7);
    const correctConjugation = verb.conj[randomTense][randomPronounIndex];

    // Generate wrong options from other conjugations
    const allConjugations = [
      ...verb.conj.pr,
      ...verb.conj.pa,
      ...verb.conj.fu,
    ].filter((c) => c.t.key !== correctConjugation.t.key);

    const wrongOptions = allConjugations
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [correctConjugation, ...wrongOptions].sort(
      () => Math.random() - 0.5
    );

    setCurrentQuestion({
      tense: randomTense,
      pronounIndex: randomPronounIndex,
      conjugation: correctConjugation,
    });
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect =
      options[index].t.key === currentQuestion?.conjugation.t.key;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextQuestion = () => {
    generateQuestion();
  };

  const exitQuiz = () => {
    setQuizMode(false);
    setCurrentQuestion(null);
    setOptions([]);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (!verb) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">
            {verb.name.t} ({verb.name.phonetic})
          </SheetTitle>
          <SheetDescription>Arabic: {verb.name.m}</SheetDescription>
        </SheetHeader>

        {!quizMode ? (
          <div className="space-y-6 py-4">
            <Tabs defaultValue="pr" className="py-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pr">{verb.tenseNames.pr}</TabsTrigger>
                <TabsTrigger value="pa">{verb.tenseNames.pa}</TabsTrigger>
                <TabsTrigger value="fu">{verb.tenseNames.fu}</TabsTrigger>
              </TabsList>

              {/* Present Tense */}
              <TabsContent value="pr" className="space-y-2 mt-4">
                {verb.conj.pr.map((conj, idx) => (
                  <Card key={idx} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{pronouns[idx]}</p>
                        <p className="text-lg">{conj.t.text}</p>
                        <p className="text-sm text-muted-foreground">
                          {conj.t.phonetic}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <TonePlayerButton url={conj.t.key} />
                        <p className="urdu-text">{conj.t.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Past Tense */}
              <TabsContent value="pa" className="space-y-2 mt-4">
                {verb.conj.pa.map((conj, idx) => (
                  <Card key={idx} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{pronouns[idx]}</p>
                        <p className="text-lg">{conj.t.text}</p>
                        <p className="text-sm text-muted-foreground">
                          {conj.t.phonetic}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <TonePlayerButton url={conj.t.key} />
                        <p className="urdu-text">{conj.t.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Future Tense */}
              <TabsContent value="fu" className="space-y-2 mt-4">
                {verb.conj.fu.map((conj, idx) => (
                  <Card key={idx} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{pronouns[idx]}</p>
                        <p className="text-lg">{conj.t.text}</p>
                        <p className="text-sm text-muted-foreground">
                          {conj.t.phonetic}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <TonePlayerButton url={conj.t.key} />
                        <p className="urdu-text">{conj.t.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            <Button onClick={startQuiz} className="w-full" size="lg">
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Quiz Header */}
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                Score: {score.correct} / {score.total}
              </div>
              <Button variant="outline" size="sm" onClick={exitQuiz}>
                Exit Quiz
              </Button>
            </div>

            {currentQuestion && (
              <div className="space-y-4">
                <Card className="p-6 bg-primary/5">
                  <h3 className="text-xl font-semibold mb-2">
                    Conjugate: {verb.name.t}
                  </h3>
                  <p className="text-lg">
                    <span className="font-medium">
                      {pronouns[currentQuestion.pronounIndex]}
                    </span>{" "}
                    in{" "}
                    <span className="font-medium">
                      {currentQuestion.tense === "pr"
                        ? "Present"
                        : currentQuestion.tense === "pa"
                          ? "Past"
                          : "Future"}
                    </span>{" "}
                    tense
                  </p>
                </Card>

                <div className="space-y-3">
                  {options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect =
                      option.t.key === currentQuestion.conjugation.t.key;
                    const showCorrect = showResult && isCorrect;
                    const showWrong = showResult && isSelected && !isCorrect;

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
                        onClick={() => handleAnswer(idx)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-lg font-medium">
                              {option.t.text}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {option.t.phonetic}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {showCorrect && (
                              <CheckCircle2Icon className="h-6 w-6 text-green-600" />
                            )}
                            {showWrong && (
                              <XCircleIcon className="h-6 w-6 text-red-600" />
                            )}
                            <div className="flex gap-2">
                              <TonePlayerButton url={option.t.key} />
                              <p className="urdu-text">{option.t.text}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {showResult && (
                  <Button onClick={nextQuestion} className="w-full" size="lg">
                    <RefreshCwIcon className="mr-2 h-4 w-4" />
                    Next Question
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
