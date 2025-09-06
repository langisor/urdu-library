"use client";
import VocabularyUnit2Content from "./_components/unit-2/content";
import VocabularyUnit2Explore from "./_components/unit-2/explore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 
import * as React from "react";

function OtherPage() {
  return <div>Other Page</div>;
}
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
  { id: "unit-2-content", value: "unit-2-content", label: "Units 2 Content" },
  { id: "unit-2-practice", value: "unit-2-practice", label: "Units 2 Practice" },
];

const tabsContent: TabContent[] = [
  { id: "unit-2-content", value: "unit-2-content", content: <VocabularyUnit2Content /> },
  { id: "unit-2-practice", value: "unit-2-practice", content: <VocabularyUnit2Explore /> },
];

export default function VocabularyPage() {
  const [tab, setTab] = React.useState("unit-2-content");
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
      <Tabs
        value={tab}
        onValueChange={setTab}
        className=""
        orientation="vertical"
      >
        <TabsList>{renderTabTriggers}</TabsList>
        <div>{renderTabContent}</div>
      </Tabs>
    </div>
  );
}
