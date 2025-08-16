"use client";
import * as React from "react";
 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chapter1 from "./_components/chapter-1";
import Chapter2 from "./_components/chapter-2";
import Chapter3 from "./_components/chapter-3";
import Chapter4 from "./_components/chapter-4";
import Chapter5 from "./_components/chapter-5";

function Chapter6() {
  return <div>ToDo: Chapter 6</div>;
}
interface tabTrigger {
  id: string;
  value: string;
  label: string;
}

interface tabContent {
  id: string;
  value: string;
  content: React.ReactNode;
}

const tabsTriggers: tabTrigger[] = [
  { id: "1", value: "chapter-1", label: "Chapter 1" },
  { id: "2", value: "chapter-2", label: "Chapter 2" },
  { id: "3", value: "chapter-3", label: "Chapter 3" },
  { id: "4", value: "chapter-4", label: "Chapter 4" },
  { id: "5", value: "chapter-5", label: "Chapter 5" },
  { id: "6", value: "chapter-6", label: "Chapter 6" },
];

const tabsContent: tabContent[] = [
  { id: "1", value: "chapter-1", content: <Chapter1 /> },
  { id: "2", value: "chapter-2", content: <Chapter2 /> },
  { id: "3", value: "chapter-3", content: <Chapter3 /> },
  { id: "4", value: "chapter-4", content: <Chapter4 /> },
  { id: "5", value: "chapter-5", content: <Chapter5 /> },
  { id: "6", value: "chapter-6", content: <Chapter6 /> },
];

export default function GrammarPage() {
  const [currentTab, setCurrentTab] = React.useState(tabsTriggers[0].value);
  const renderTrigger = tabsTriggers.map((trigger) => (
    <TabsTrigger
      key={trigger.id}
      value={trigger.value}
      onClick={() => setCurrentTab(trigger.value)}
    >
      {trigger.label}
    </TabsTrigger>
  ));
  const renderContent = tabsContent.map((content) => (
    <TabsContent
      key={content.id}
      value={content.value}
      onClick={() => setCurrentTab(content.value)}
    >
      {content.content}
    </TabsContent>
  ));
  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <Tabs value={currentTab}>
        <TabsList>{renderTrigger}</TabsList>
        {renderContent}
      </Tabs>
    </div>
  );
}
