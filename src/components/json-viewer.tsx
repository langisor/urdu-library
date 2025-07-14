"use client";
import JsonViewer from "@uiw/react-json-view";
export function JsonViewerComponent({ data }: { data: any }) {
  return <JsonViewer value={data} />;
}
