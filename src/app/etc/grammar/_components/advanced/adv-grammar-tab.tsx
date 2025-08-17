"use client";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import * as chapters from "./chapters";
import { TableOfContents } from "./toc";
import { BackButton } from "./back-button";
// The main App component that will contain all the website's functionality.
// We'll use a `switch` statement to handle navigation between chapters.
export function AdvGrammarTab() {
  const [currentPage, setCurrentPage] = React.useState("toc");

  // A simple function to navigate to a new page/chapter.
  const navigateTo = (page: string) => {
    setCurrentPage(page);
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
        return <TableOfContents tocData={tocData} navigateTo={navigateTo} />;
      case "chapter1":
        return (
          <div className="flex flex-col gap-2">
       
            <chapters.Chapter1 navigateTo={navigateTo} />
          </div>
        );
      case "chapter2":
        return (
          <div className="flex flex-col gap-2">
           
            <chapters.Chapter2 navigateTo={navigateTo} />
          </div>
        );
      case "chapter3":
        return (
          <div className="flex flex-col gap-2">
        
            <chapters.Chapter3 navigateTo={navigateTo} />
          </div>
        );
      case "chapter4":
        return (
          <div className="flex flex-col gap-2">
          
            <chapters.Chapter4 navigateTo={navigateTo} />
          </div>
        );
      case "chapter5":
        return (
          <div className="flex flex-col gap-2">
       
            <chapters.Chapter5 navigateTo={navigateTo} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}
