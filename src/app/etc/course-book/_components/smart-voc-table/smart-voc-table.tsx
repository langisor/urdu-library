"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTune } from "@/hooks/use-tone";
import { getVocabularyTableData } from "../difinitions";
// --- Types and Constants ---
const MODES = {
  REVIEW: "review",
  QUIZ: "quiz",
} as const;

type Mode = (typeof MODES)[keyof typeof MODES];
type QuizField = "urdu" | "english" | "arabic" | "transliteration";

// Define the shape of a single vocabulary item
export interface VocabItem {
  id: number;
  english: string;
  urdu: string;
  transliteration: string;
  arabic: string;
}

// Define the component's props
interface LanguageDataTableProps {
  data: VocabItem[];
}

// --- Quiz Row Component ---
interface QuizRowProps {
  item: VocabItem;
  quizField: QuizField;
}

const QuizRow: React.FC<QuizRowProps> = ({ item, quizField }) => {
  const [guess, setGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const { playCorrectTune, playIncorrectTune } = useTune();

  const correctAnswer = item[quizField];
  // Determine the prompt field to display (defaulting to English if the quiz is on Urdu/Arabic)
  const promptField: QuizField = quizField === "english" ? "urdu" : "english";

  const handleCheck = () => {
    // Trim and case-insensitive check
    if (guess.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      playCorrectTune();
      setIsCorrect(true);
    } else {
      playIncorrectTune();
      setGuess("");
      setIsCorrect(false);
    }
  };

  const handleReveal = () => {
    setShowAnswer(true);
    setIsCorrect(false);
  };

  const statusStyle =
    isCorrect === true
      ? "text-green-600 font-bold"
      : isCorrect === false
        ? "text-red-600 font-bold"
        : "text-gray-500";

  const rowBackground = showAnswer
    ? "bg-amber-50"
    : isCorrect === true
      ? "bg-green-50"
      : "";

  // --- MOBILE STACKED RENDER ---
  return (
    <TableRow
      className={`p-0 ${rowBackground} flex flex-col md:table-row border-b`}
    >
      {/* Prompt Cell (Always visible) */}
      <TableCell className="md:table-cell p-3 border-none md:border-b">
        <div className="flex flex-col">
          <span
            className={`text-xs font-medium text-gray-500 md:hidden ${quizField === "english" ? "naskh-text" : "urdu-text"}`}
          >
            Prompt ({quizField === "english" ? "Urdu" : "English"}):
          </span>
          <span className="text-xl font-bold md:text-lg">
            {item[promptField]}
          </span>
        </div>
      </TableCell>

      {/* Input/Controls Container (Stacks on Mobile, horizontal on Desktop) */}
      <TableCell className="md:table-cell p-3 border-none md:border-b">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full">
          <Input
            type="text"
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value);
              setIsCorrect(null);
              setShowAnswer(false);
            }}
            placeholder={`Enter ${quizField} here...`}
            disabled={isCorrect === true}
            className={`w-full md:w-3/5 border-2 ${isCorrect === true ? "border-green-500" : isCorrect === false ? "border-red-500" : ""}`}
          />
          <Button
            onClick={handleCheck}
            disabled={isCorrect === true || guess.trim() === ""}
            variant={isCorrect === true ? "outline" : "default"}
            className="w-full md:w-auto"
          >
            Check
          </Button>
        </div>
      </TableCell>

      {/* Status Cell (Always visible, moves to the bottom on mobile) */}
      <TableCell className="md:table-cell p-3 border-none md:border-b text-right">
        <div className="flex items-center justify-between md:justify-end space-x-4 w-full">
          <span className={statusStyle}>
            {isCorrect === true
              ? "✅ Correct"
              : isCorrect === false && !showAnswer
                ? "❌ Incorrect"
                : showAnswer
                  ? correctAnswer
                  : ""}
          </span>

          {isCorrect === false && !showAnswer && (
            <Button onClick={handleReveal} variant="secondary" size="sm">
              Reveal
            </Button>
          )}

          {showAnswer && (
            <span className="text-sm italic text-gray-700 hidden md:inline">
              ({quizField} shown)
            </span>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

// --- Main Component ---
const LanguageDataTable: React.FC<LanguageDataTableProps> = ({ data }) => {
  const [mode, setMode] = useState<Mode>(MODES.REVIEW);
  const [quizField, setQuizField] = useState<QuizField>("urdu");
  const shuffledData = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5);
  }, [mode, data]);

  const dataToRender = mode === MODES.QUIZ ? shuffledData : data;

  const getReviewRow = (item: VocabItem) => (
    <TableRow key={item.id}>
      <TableCell className="font-medium w-auto whitespace-normal">
        {item.english}
      </TableCell>
      <TableCell className="hidden sm:table-cell whitespace-normal">
        {item.transliteration}
      </TableCell>
      <TableCell className="text-xl urdu-text">{item.urdu}</TableCell>
      <TableCell className="text-lg hidden sm:table-cell naskh-text">
        {item.arabic}
      </TableCell>
    </TableRow>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">
        Language Vocabulary (
        {mode === MODES.REVIEW ? "Review Mode" : "Quiz Mode 🧠"})
      </h1>

      {/* Mode Controls - Fully Responsive Layout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg bg-gray-50">
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button
            onClick={() => setMode(MODES.REVIEW)}
            variant={mode === MODES.REVIEW ? "default" : "outline"}
            className="w-1/2 sm:w-auto"
          >
            📚 Review
          </Button>
          <Button
            onClick={() => setMode(MODES.QUIZ)}
            variant={mode === MODES.QUIZ ? "destructive" : "outline"}
            className="w-1/2 sm:w-auto"
          >
            🧠 Quiz
          </Button>
          
        </div>

        {mode === MODES.QUIZ && (
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <label className="text-sm font-medium whitespace-nowrap">
              Quiz Direction:
            </label>
            <Select
              value={quizField}
              onValueChange={(value: string) =>
                setQuizField(value as QuizField)
              }
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select Target" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urdu">English → Urdu</SelectItem>
                <SelectItem value="english">Urdu → English</SelectItem>
                <SelectItem value="arabic">English → Arabic</SelectItem>
                <SelectItem value="transliteration">
                  English → Translit.
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Data Table Container - Adds horizontal scroll on small screens */}
      <div className="overflow-x-auto rounded-lg border ">
        <Table className="min-w-full overflow-x-scroll">
          <TableHeader>
            {mode === MODES.REVIEW ? (
              <TableRow>
                <TableHead className="w-auto ">English</TableHead>
                <TableHead className="w-auto hidden sm:table-cell">
                  Transliteration
                </TableHead>
                <TableHead className="w-auto">Urdu</TableHead>
                <TableHead className="w-auto hidden sm:table-cell">
                  Arabic
                </TableHead>
              </TableRow>
            ) : (
              // Quiz mode header is simplified for mobile
              <TableRow className="hidden md:table-row">
                <TableHead className=" font-bold text-md  ">
                  {quizField === "english" ? "Urdu Prompt" : "English Prompt"}
                </TableHead>
                <TableHead
                  className="text-center font-bold text-lg"
                  colSpan={2}
                >
                  Your Answer
                </TableHead>
                <TableHead className="w-[30%] text-right font-bold text-lg">
                  Status
                </TableHead>
              </TableRow>
            )}
          </TableHeader>

          <TableBody>
            {dataToRender.map((item) =>
              mode === MODES.REVIEW ? (
                getReviewRow(item)
              ) : (
                <QuizRow key={item.id} item={item} quizField={quizField} />
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export function SmartVocabularyTable({ vocId }: { vocId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const data = getVocabularyTableData(vocId);
  const handleSheetClose = () => {
    setIsOpen(false);
  };
  if (!data) return null;
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button>Review Table</Button>
        </SheetTrigger>
        <SheetContent
          className="px-2 w-full h-full flex flex-col p-4 overflow-y-auto"
          side="bottom"
        >
          <SheetTitle></SheetTitle>
          <LanguageDataTable data={data} />
          <SheetClose asChild>
            <Button variant="outline" onClick={handleSheetClose}>
              Close
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </>
  );
}
