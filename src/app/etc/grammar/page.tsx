"use client";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdvGrammarTab } from "./_components/advanced/adv-grammar-tab";
// two tabs QuickTab and AdvancedTab

import QuickGrammarTab from "./_components/quick/quick-grammar-tab";
export default function GrammarApp() {
  return (
    <Tabs defaultValue="quick" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="quick">Quick</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="quick">
        <QuickGrammarTab />
      </TabsContent>
      <TabsContent value="advanced">
        <AdvGrammarTab />
      </TabsContent>
    </Tabs>
  );
}
