"use client";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import BasicGrammar from "./_components/basic-grammar";
import Verbs from "./_components/verbs/main-verbs";
import Questions from "./_components/questions/main-questions";

interface TabTrigger {
  id: string;
  value: string;
  label: string;
}

interface TabContent {
  id: string;
  value: string;
  content: React.ReactNode;
}

const tabsTriggers: TabTrigger[] = [
  { id: "1", value: "basic-grammar", label: "Basic Grammar" },
  { id: "2", value: "verbs", label: "Verbs" },
  { id: "3", value: "questions", label: "Questions" },
];

const tabsContent: TabContent[] = [
  { id: "1", value: "basic-grammar", content: <BasicGrammar /> },
  { id: "2", value: "verbs", content: <Verbs /> },
  { id: "3", value: "questions", content: <Questions /> },
];

export default function AIPage() {
  const [tab, setTab] = React.useState("basic-grammar");
  const selectedStyle = {
    backgroundColor: "blue",
    color: "white",
  };
  const renderTabTriggers = tabsTriggers.map((tabTrigger) => (
    <TabsTrigger
      key={tabTrigger.id}
      value={tabTrigger.value}
      onClick={() => setTab(tabTrigger.value)}
      style={tab === tabTrigger.value ? selectedStyle : undefined}
    >
      {tabTrigger.label}
    </TabsTrigger>
  ));

  const renderTabContent = tabsContent.map((tabContent) => (
    <TabsContent key={tabContent.id} value={tabContent.value}>
      {tabContent.content}
    </TabsContent>
  ));

  return (
    <div className="w-full">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>{renderTabTriggers}</TabsList>
        {renderTabContent}
      </Tabs>
    </div>
  );
}
