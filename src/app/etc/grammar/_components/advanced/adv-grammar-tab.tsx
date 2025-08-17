"use client";
import * as React from "react";
import * as chapters from "./chapters";
import { TableOfContents } from "./toc";
import { ChapterPage } from "./definitions";
import { tocData } from "./definitions";
import { Card, CardContent } from "@/components/ui/card";
// main styles
import "./styles.css";
export function AdvGrammarTab() {
  const [currentPage, setCurrentPage] = React.useState<ChapterPage>("toc");

  // A simple function to navigate to a new page/chapter.
  const navigateTo = (page: string) => {
    setCurrentPage(page as ChapterPage);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "toc":
        return <TableOfContents tocData={tocData} navigateTo={navigateTo} />;
      case "chapter1":
        return <chapters.Chapter1 navigateTo={navigateTo} />;
      case "chapter2":
        return <chapters.Chapter2 navigateTo={navigateTo} />;
      case "chapter3":
        return <chapters.Chapter3 navigateTo={navigateTo} />;
      case "chapter4":
        return <chapters.Chapter4 navigateTo={navigateTo} />;
      case "chapter5":
        return <chapters.Chapter5 navigateTo={navigateTo} />;
      case "chapter6":
        return <chapters.Chapter6 navigateTo={navigateTo} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div>
      <Card className="">
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  );
}
