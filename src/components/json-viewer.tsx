"use client";
import JsonViewer from "@uiw/react-json-view";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownCircle,
  ArrowLeftCircle,
  ArrowRight,
  ArrowRightCircle,
} from "lucide-react";
import { Button } from "./ui/button";
export function JsonViewerComponent({ data }: { data: any }) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="flex flex-col">
        <JsonViewer
          style={{
            height: "100%",

            fontSize: "1.3rem",
          }}
          value={data}
          shortenTextAfterLength={0}
          collapsed={true}
        />
      </CardContent>
    </Card>
  );
}
