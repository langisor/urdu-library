"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import type { Verb } from "./types";
import { getAudioUrl } from "@/lib/helpers";

interface VerbViewerSheetProps {
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

export function VerbViewerSheet({
  verb,
  open,
  onOpenChange,
}: VerbViewerSheetProps) {
  if (!verb) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">
            <span className="urdu-text">{verb.name.t}</span> (
            {verb.name.phonetic})
          </SheetTitle>
          <SheetDescription>Arabic: {verb.name.m}</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4 naskh-text">
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
                  <div
                    className="flex items-center justify-between text-center"
                    dir="rtl"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{pronouns[idx]}</p>
                      <div className="flex flex-col gap-1 items-center justify-center md:flex-row md:items-center md:justify-between">
                        <p className="text-lg urdu-text bg-accent rounded-2xl p-2 my-4">
                          {conj.t.text}
                        </p>
                        <p className="text-lg naskh-text bg-accent rounded-2xl p-2 my-4">
                          {conj.m.text}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {conj.t.phonetic}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Past Tense */}
            <TabsContent value="pa" className="space-y-2 mt-4">
              {verb.conj.pa.map((conj, idx) => (
                <Card key={idx} className="p-3">
                  <div className="flex items-center  text-center">
                    <div className="flex-1">
                      <p className="font-medium">{pronouns[idx]}</p>
                      <div className="flex flex-col   items-center justify-center md:flex-row md:items-center md:justify-between">
                        <p className="text-lg urdu-text bg-accent rounded-2xl p-2 my-4">
                          {conj.t.text}
                        </p>
                        <p className="text-lg urdu-text bg-accent rounded-2xl p-2 my-4">
                          {conj.m.text}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {conj.t.phonetic}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Future Tense */}
            <TabsContent value="fu" className="space-y-2 mt-4">
              {verb.conj.fu.map((conj, idx) => (
                <Card key={idx} className="p-3">
                  <div
                    className="flex items-center justify-between text-center"
                    dir="rtl"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{pronouns[idx]}</p>
                      <div className="flex flex-col   items-center  justify-center md:flex-row md:items-center md:justify-between">
                        <p className="text-lg urdu-text bg-accent rounded-2xl p-2 my-4">
                          {conj.t.text}
                        </p>
                        <p className="text-lg naskh-text bg-accent rounded-2xl p-2 my-4">
                          {conj.m.text}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {conj.t.phonetic}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
