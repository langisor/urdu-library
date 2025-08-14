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
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  if (!data) {
    return (
      <Card className="w-full h-full">
        <CardContent className="flex flex-col items-center justify-center">
          <Badge className="text-lg">No data available</Badge>
        </CardContent>
      </Card>
    );
  }
  const arrowStyle = isCollapsed
    ? "mx-2 py-1 bg-green-900 text-white cursor-pointer rounded-full w-6 h-6"
    : " mx-2 py-1 bg-blue-900 text-white cursor-pointer rounded-full w-6 h-6";
  return (
    <Card className="w-full h-full flex flex-col">
      {isCollapsed ? (
        <ArrowDownCircle
          className={arrowStyle}
          onClick={() => setIsCollapsed(false)}
        />
      ) : (
        <ArrowRightCircle
          className={arrowStyle}
          onClick={() => setIsCollapsed(true)}
        />
      )}
      <span className="sr-only">Toggle Collapse</span>

      <CardContent className="flex flex-col">
        <JsonViewer
          style={{
            height: "100%",
            overflowY: "auto",
            fontSize: "1.3rem",
          }}
          value={data}
          collapsed={isCollapsed ? 10 : 0}
        ></JsonViewer>
      </CardContent>
    </Card>
  );
}
