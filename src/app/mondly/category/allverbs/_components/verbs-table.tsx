"use client";

import { useState } from "react";
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
import { VerbQuizSheet } from "./verb-quiz-sheet";
import { VerbQuizerSheet } from "./verb-quizzer-sheett";
import type { Verb } from "./types";
import { EyeIcon, SearchIcon, BrainCircuitIcon } from "lucide-react";

interface VerbsTableProps {
  verbs: Verb[];
}

export function VerbsTable({ verbs }: VerbsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null);
  const [viewSheetOpen, setViewSheetOpen] = useState(false);
  const [quizSheetOpen, setQuizSheetOpen] = useState(false);

  const filteredVerbs = verbs
    .filter(
      (verb) =>
        verb.name.t.toLowerCase().includes(searchTerm.toLowerCase()) ||
        verb.name.phonetic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        verb.name.m.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.id - b.id);

  const handleViewVerb = (verb: Verb) => {
    setSelectedVerb(verb);
    setViewSheetOpen(true);
  };

  const handleQuizVerb = (verb: Verb) => {
    setSelectedVerb(verb);
    setQuizSheetOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search verbs (Urdu, phonetic, or Arabic)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary-foreground">
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Urdu</TableHead>
              <TableHead className="hidden md:table-cell">Phonetic</TableHead>
              <TableHead>Arabic</TableHead>
              <TableHead className="w-[180px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVerbs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No verbs found
                </TableCell>
              </TableRow>
            ) : (
              filteredVerbs.map((verb) => (
                <TableRow key={verb.id}>
                  <TableCell className="font-medium">{verb.id}</TableCell>
                  <TableCell className="text-lg font-medium">
                    {verb.name.t}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {verb.name.phonetic}
                  </TableCell>
                  <TableCell>{verb.name.m}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2 md:flex-row">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewVerb(verb)}
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuizVerb(verb)}
                      >
                        <BrainCircuitIcon className="h-4 w-4 mr-1" />
                        Quiz
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <VerbQuizSheet
        verb={selectedVerb}
        open={viewSheetOpen}
        onOpenChange={setViewSheetOpen}
      />
      <VerbQuizerSheet
        verb={selectedVerb}
        open={quizSheetOpen}
        onOpenChange={setQuizSheetOpen}
      />
    </div>
  );
}
