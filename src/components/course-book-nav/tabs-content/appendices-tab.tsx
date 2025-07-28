"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface AppendicesTabProps {
  appendices: {
    appendixNumber: number;
    title: string;
    page: string;
    sections: string[];
  }[];
}

export default function AppendicesTab({ appendices }: AppendicesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appendices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {appendices.map((appendix) => (
            <div key={appendix.appendixNumber} className="flex flex-col gap-1">
              <p className="font-bold">{appendix.title}</p>
              <p>Page: {appendix.page}</p>
              <p>Sections: {appendix.sections.join(", ")}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
