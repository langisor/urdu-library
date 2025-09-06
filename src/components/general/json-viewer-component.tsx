"use client";
import JsonViewer from "@uiw/react-json-view";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
interface JsonViewerComponentProps {
  data: any;
  direction?: "ltr" | "rtl";
}
export function JsonViewerComponent({ data, direction = "ltr" }: JsonViewerComponentProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="flex flex-col">
        <JsonViewer
          style={{
            height: "100%",
            textAlign: direction === "rtl" ? "right" : "left",
            fontSize: "1.3rem",
          }}
          value={data}
          shortenTextAfterLength={30}
          collapsed={true}
          dir={direction}
        />
      </CardContent>
    </Card>
  );
}
