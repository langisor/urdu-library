"use client";
import * as React from "react";
import * as chapters from "./chapters";
import { TableOfContents } from "./toc";
import { ChapterPage } from "./definitions";
 
export function AdvGrammarTab() {
  const [currentPage, setCurrentPage] = React.useState<ChapterPage>("toc");

  // A simple function to navigate to a new page/chapter.
  const navigateTo = (page: string) => {
    setCurrentPage(page as ChapterPage);
  };

  // The TOC data, extracted from the provided markdown file.
  // Each chapter has a 'title' and 'id' for navigation.
  const tocData = [
    { id: "chapter1", title: "Chapter 1: The Building Blocks" },
    { id: "chapter2", title: "Chapter 2: Parts of Speech (Ajzaa-e-Kalaam)" },
    {
      id: "chapter3",
      title: "Chapter 3: Sentence Structure (Jumlon ki Saakht)",
    },
    {
      id: "chapter4",
      title: "Chapter 4: Verbs and Tenses (Fe'l aur Zamaanay)",
    },
    { id: "chapter5", title: "Chapter 5: Advanced Grammar & Stylistics" },
    { id: "chapter6", title: "Chapter 6: Practical Application" },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "toc":
        return (
          <TableOfContents tocData={tocData} navigateTo={navigateTo} />
        );
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
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl">
        {renderContent()}
      </div>
    </div>
  );
}
