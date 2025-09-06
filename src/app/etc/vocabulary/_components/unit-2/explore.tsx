"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ArabicWord {
  urdu: string;
  meaning: string;
  root: string;
}

const arabicWords: ArabicWord[] = [
  { urdu: "علم", meaning: "Knowledge", root: "ع-ل-م" },
  { urdu: "عدل", meaning: "Justice", root: "ع-د-ل" },
  { urdu: "حق", meaning: "Truth/Right", root: "ح-ق-ق" },
  { urdu: "کاتب", meaning: "Writer", root: "ك-ت-ب" },
  { urdu: "مکتوب", meaning: "Written", root: "ك-ت-ب" },
  { urdu: "تعلیم", meaning: "Education", root: "ع-ل-م" },
  { urdu: "معلم", meaning: "Teacher", root: "ع-ل-م" },
  { urdu: "نور", meaning: "Light", root: "ن-و-ر" },
  { urdu: "صبر", meaning: "Patience", root: "ص-ب-ر" },
  { urdu: "رزق", meaning: "Sustenance", root: "ر-ز-ق" },
  { urdu: "کتاب", meaning: "Book", root: "ك-ت-ب" },
  { urdu: "فکر", meaning: "Thought", root: "ف-ك-ر" },
  { urdu: "عقل", meaning: "Intellect", root: "ع-ق-ل" },
  { urdu: "سلام", meaning: "Peace/Greeting", root: "س-ل-م" },
  { urdu: "مسجد", meaning: "Mosque", root: "س-ج-د" },
  { urdu: "نماز", meaning: "Prayer", root: "ص-ل-و" },
  { urdu: "خیر", meaning: "Goodness", root: "خ-ي-ر" },
  { urdu: "ظلم", meaning: "Oppression", root: "ظ-ل-م" },
  { urdu: "قانون", meaning: "Law", root: "ق-ن-ن" },
  { urdu: "شریعت", meaning: "Islamic Law", root: "ش-ر-ع" },
  { urdu: "قلم", meaning: "Pen", root: "ق-ل-م" },
  { urdu: "مدرسہ", meaning: "School", root: "د-ر-س" },
  { urdu: "تاریخ", meaning: "History", root: "و-ر-خ" },
  { urdu: "قرآن", meaning: "Quran", root: "ق-ر-أ" },
  { urdu: "حدیث", meaning: "Prophetic Saying", root: "ح-د-ث" },
];

function shuffleArray(arr: ArabicWord[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function VocabularyUnit2Explore() {
  const [search, setSearch] = useState<string>("");
  const [filtered, setFiltered] = useState(arabicWords);
  const [quizWord, setQuizWord] = useState<ArabicWord | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string>("");
  const [quizFeedback, setQuizFeedback] = useState<string>("");
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [matchingPairs, setMatchingPairs] = useState<ArabicWord[]>(
    shuffleArray(arabicWords.slice(0, 6))
  );
  const [matched, setMatched] = useState<ArabicWord[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const lower = value.toLowerCase();
    setFiltered(
      arabicWords.filter(
        (word) =>
          word.urdu.includes(value) ||
          word.meaning.toLowerCase().includes(lower) ||
          word.root.includes(value)
      )
    );
  };

  const startQuiz = () => {
    const randomWord =
      arabicWords[Math.floor(Math.random() * arabicWords.length)];
    setQuizWord(randomWord);
    setQuizAnswer("");
    setQuizFeedback("");
  };

  const checkAnswer = () => {
    if (quizAnswer.trim().toLowerCase() === quizWord?.meaning.toLowerCase()) {
      setQuizFeedback("✅ Correct!");
    } else {
      setQuizFeedback(
        `❌ Incorrect. The correct answer is: ${quizWord?.meaning}`
      );
    }
  };

  return (
    <div className="p-6   mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Arabic Element in Urdu Vocabulary
      </h1>
      <Tabs defaultValue="explore" className="mt-6">
        <TabsList>
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
          <TabsTrigger value="match">Match Game</TabsTrigger>
        </TabsList>

        <TabsContent value="explore">
          <p className="  mb-6">
            Use the search to filter Arabic-derived Urdu words by Urdu script,
            meaning, or root.
          </p>
          <Input
            placeholder="Search by Urdu, meaning, or root..."
            value={search}
            onChange={handleSearch}
            className="mb-6"
          />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {filtered.map((word, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">{word.urdu}</h2>
                  <p>
                    <strong>Meaning:</strong> {word.meaning}
                  </p>
                  <p>
                    <strong>Root:</strong> {word.root}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quiz">
          <div className="mb-4">
            <Button onClick={startQuiz}>Start New Quiz</Button>
          </div>
          {quizWord && (
            <div className="space-y-4">
              <p className="text-lg">
                What is the meaning of the Urdu word:{" "}
                <strong>{quizWord.urdu}</strong>?
              </p>
              <Input
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
                placeholder="Type your answer..."
              />
              <Button onClick={checkAnswer}>Check Answer</Button>
              {quizFeedback && (
                <p className="text-lg font-medium">{quizFeedback}</p>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="flashcard">
          <div className="text-center mb-6">
            <Card
              className="inline-block w-64 cursor-pointer"
              onClick={() => setShowMeaning(!showMeaning)}
            >
              <CardContent className="p-6">
                <p className="text-2xl">
                  {showMeaning
                    ? arabicWords[flashcardIndex].meaning
                    : arabicWords[flashcardIndex].urdu}
                </p>
              </CardContent>
            </Card>
            <div className="mt-4">
              <Button
                onClick={() => {
                  setFlashcardIndex((flashcardIndex + 1) % arabicWords.length);
                  setShowMeaning(false);
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="match">
          <p className="mb-4">Click a word and match it to its meaning.</p>
          <div className="grid grid-cols-2 gap-4">
            {matchingPairs.map((word, i) => (
              <Button
                key={"urdu" + i}
                variant="outline"
                className="text-right w-full"
              >
                {word.urdu}
              </Button>
            ))}
            {shuffleArray(matchingPairs).map((word, i) => (
              <Button
                key={"eng" + i}
                variant="outline"
                className="text-left w-full"
              >
                {word.meaning}
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
