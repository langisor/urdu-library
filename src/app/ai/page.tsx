"use client";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import BasicGrammar from "./_components/basic-grammar";
import Verbs from "./_components/verbs";
import Questions from "./_components/questions/main-questions";

export default function AIPage() {
  const [tab, setTab] = React.useState("basic-grammar");
  const selectedStyle = {
    backgroundColor: "blue",
    color: "white",
  };
  const renderTabTriggers = (
    <>
      <TabsTrigger
        value="basic-grammar"
        onClick={() => setTab("basic-grammar")}
        style={tab === "basic-grammar" ? selectedStyle : undefined}
      >
        Basic Grammar
      </TabsTrigger>
      <TabsTrigger
        value="verbs"
        onClick={() => setTab("verbs")}
        style={tab === "verbs" ? selectedStyle : undefined}
      >
        Verbs
      </TabsTrigger>
      <TabsTrigger
        value="questions"
        onClick={() => setTab("questions")}
        style={tab === "questions" ? selectedStyle : undefined}
      >
        Questions
      </TabsTrigger>
    </>
  );

  const renderTabContent = (
    <>
      <TabsContent value="basic-grammar">
        <BasicGrammar />
      </TabsContent>
      <TabsContent value="verbs">
        <Verbs />
      </TabsContent>
      <TabsContent value="questions">
        <Questions />
      </TabsContent>
    </>
  );

  return (
    <div className="w-full">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>{renderTabTriggers}</TabsList>
        {renderTabContent}
      </Tabs>
    </div>
  );
}
