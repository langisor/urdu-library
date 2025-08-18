"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownViewerProps {
  data: string;
}

export default function MarkdownViewer({ data }: MarkdownViewerProps) {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
    </div>
  );
}
