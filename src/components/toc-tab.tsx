"use client";
import toc from "@/data/toc.json";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JsonViewerComponent } from "./json-viewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import BookNavigation from "./book-navigation";
// slice units from table_of_contents starting from index 6 to end
const units = toc.table_of_contents.slice(6);

export function TocCard() {
  const [selectedSection, setSelectedSection] = React.useState(
    "browse-book-content"
  );
  const style = {
    width: "100%",
    height: "100%",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    padding: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };
  const selectedStyle = {
    backgroundColor: "blue",
    fontWeight: "bold",
    color: "white",
  };
  const handleTabChange = (value: string) => {
    setSelectedSection(value);
  };
  return (
    <Tabs defaultValue={selectedSection} onValueChange={handleTabChange}>
      <TabsList className="flex flex-row gap-4 space-x-4">
        <TabsTrigger
          value="browse-book-content"
          style={selectedSection === "browse-book-content" ? selectedStyle : {}}
          className="hover:cursor-pointer"
        >
          Browse Book Content
        </TabsTrigger>
        <TabsTrigger
          value="json-tree"
          style={selectedSection === "json-tree" ? selectedStyle : {}}
          className="hover:cursor-pointer"
        >
          JSON Tree
        </TabsTrigger>
      </TabsList>
      <TabsContent value="browse-book-content">
        <BookNavigation />
      </TabsContent>
      <TabsContent value="json-tree">
        <JsonViewerComponent data={toc} />
      </TabsContent>
    </Tabs>
  );
}
