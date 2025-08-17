"use client";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdvGrammarTab } from "./_components/advanced/adv-grammar-tab";
// two tabs QuickTab and AdvancedTab

import QuickGrammarTab from "./_components/quick/quick-grammar-tab";
export default function GrammarApp() {
  const [tab, setTab] = React.useState<string>("quick");
  const selectedStyle = {
    backgroundColor: "blue",
    color: "white",
  };
  return (
    <Tabs defaultValue={tab} className="w-full h-full" onValueChange={setTab}>
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="quick" onClick={() => setTab("quick")} style={tab === "quick" ? selectedStyle : undefined}>
          Quick
        </TabsTrigger>
        <TabsTrigger value="advanced" onClick={() => setTab("advanced")} style={tab === "advanced" ? selectedStyle : undefined}>
          Advanced
        </TabsTrigger>
      </TabsList>
      <TabsContent value={"quick"} className="w-full h-full">
        <QuickGrammarTab />
      </TabsContent>
      <TabsContent value={"advanced"} className="w-full h-full">
        <AdvGrammarTab />
      </TabsContent>
    </Tabs>
  );
}
