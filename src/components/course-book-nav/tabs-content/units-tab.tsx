"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChaptersTab from "./chapters-tab";
import { Unit } from "@/data/course-book/ts-definition";

interface UnitsTabProps {
  units: Unit[];
}

export default function UnitsTab({ units }: UnitsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Units</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {units.map((unit) => (
            <div key={unit.unitNumber} className="flex flex-col gap-1">
              <h3 className="font-bold">
                Unit {unit.unitNumber} : {unit.title}
              </h3>
              <div className="flex flex-col gap-1 ml-2">
                <ChaptersTab chapters={unit.chapters} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
