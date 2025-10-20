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

  const correctAnswer = item[quizField];
  // Determine the prompt field to display (defaulting to English if the quiz is on Urdu/Arabic)
  const promptField: QuizField = quizField === "english" ? "urdu" : "english";

  const handleCheck = () => {
    // Trim and case-insensitive check
    if (guess.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      setIsCorrect(true);
    } else {
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

  return (
    <TableRow className={rowBackground}>
      <TableCell className="text-lg font-semibold">
        {item[promptField]}
      </TableCell>

      <TableCell colSpan={2}>
        <div className="flex items-center space-x-2">
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
            className={`border-2 ${isCorrect === true ? "border-green-500" : isCorrect === false ? "border-red-500" : ""}`}
          />
          <Button
            onClick={handleCheck}
            disabled={isCorrect === true || guess.trim() === ""}
            variant={isCorrect === true ? "outline" : "default"}
          >
            Check
          </Button>
        </div>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end space-x-4">
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
            <span className="text-sm italic text-gray-700">
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

  // Use the prop data for shuffling
  const shuffledData = useMemo(() => {
    // Always shuffle a copy of the data prop
    return [...data].sort(() => Math.random() - 0.5);
  }, [mode, data]); // Depend on data to re-shuffle if the parent passes new data

  const dataToRender = mode === MODES.QUIZ ? shuffledData : data;

  const getReviewRow = (item: VocabItem) => (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{item.english}</TableCell>
      <TableCell>{item.transliteration}</TableCell>
      <TableCell className="text-xl">{item.urdu}</TableCell>
      <TableCell className="text-lg">{item.arabic}</TableCell>
    </TableRow>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">
        Language Vocabulary (
        {mode === MODES.REVIEW ? "Review Mode" : "Quiz Mode 🧠"})
      </h1>

      {/* Mode Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 p-4 border rounded-lg bg-gray-50">
        <div className="flex space-x-2">
          <Button
            onClick={() => setMode(MODES.REVIEW)}
            variant={mode === MODES.REVIEW ? "default" : "outline"}
          >
            📚 Review Mode
          </Button>
          <Button
            onClick={() => setMode(MODES.QUIZ)}
            variant={mode === MODES.QUIZ ? "destructive" : "outline"}
          >
            🧠 Quiz Mode
          </Button>
        </div>

        {mode === MODES.QUIZ && (
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium whitespace-nowrap">
              Quiz Direction:
            </label>
            <Select
              value={quizField}
              onValueChange={(value: string) =>
                setQuizField(value as QuizField)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Quiz Target" />
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

      {/* Data Table */}
      <Table>
        <TableHeader>
          {mode === MODES.REVIEW ? (
            <TableRow>
              <TableHead className="w-[25%]">English</TableHead>
              <TableHead className="w-[25%]">Transliteration</TableHead>
              <TableHead className="w-[25%]">Urdu</TableHead>
              <TableHead className="w-[25%]">Arabic</TableHead>
            </TableRow>
          ) : (
            <TableRow>
              <TableHead className="w-[20%] font-bold text-lg">
                {quizField === "english" ? "Urdu Prompt" : "English Prompt"}
              </TableHead>
              <TableHead
                className="w-[50%] text-center font-bold text-lg"
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
  );
};

export function SmartVocabularyTable({ data }: { data: VocabItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSheetClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button>Review Table</Button>
        </SheetTrigger>
        <SheetContent className="w-full h-full flex flex-col p-4" side="bottom">
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
