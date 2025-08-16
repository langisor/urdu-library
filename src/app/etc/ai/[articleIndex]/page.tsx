import mdIndex from "@/app/etc/ai/md-toc.json";
import MarkdownViewer from "@/app/_components/markdown-viewer";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { promises } from "fs";
import path from "path";

interface ArticleIdProps {
  params: Promise<{ articleIndex: string }>;
}

interface MdIndex {
  index: number;
  id: string;
  section: string;
  path: string;
  title: string;
  lang: string;
}

const indexData = mdIndex.data as MdIndex[];

// function to fetch markdown file
async function fetchMarkdownFile(articleIndex: number) {
  const articlePath = indexData[articleIndex].path;
  const fullPath = path.join(process.cwd(), "public", articlePath);
  const articleData: string = await promises.readFile(fullPath, "utf-8");
  return articleData;
}

export default async function ArticleIdPage({ params }: ArticleIdProps) {
  const articleIndex = Number((await params).articleIndex);
  const articleData = await fetchMarkdownFile(articleIndex);
  console.log("articleData", articleData);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {/* <h1>{mdIndex.data[articleIndex].title}</h1> */}
        <MarkdownViewer data={articleData} />
        <Link href="/etc/ai" className="text-blue-500">
          <Button>Back To AI Page</Button>
        </Link>
      </div>
    </Suspense>
  );
}
