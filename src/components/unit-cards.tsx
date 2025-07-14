"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Unit } from "@/data/units";
import * as React from "react";
import { ChapterSheet } from "./chapter-sheet";

interface UnitCardsProps {
  units: Unit[];
}

export function UnitCards({ units }: UnitCardsProps) {
  const unitNo = units[0].unitNo;

  return (
    <div className="grid grid-cols-2 gap-4 ">
      {units.map((unit) => (
        <Card key={unit.unitNo} className="p-2 flex gap-2">
          <CardHeader>
            <CardTitle>
              {unit.unitNo} : {unit.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChapterSheet
              chapters={unit.chapters}
              unitNo={unit.unitNo}
              unitTitle={unit.title}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
