"use client";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonViewerComponent } from "./json-viewer";
import { SoundAndScriptData } from "@/data/sound-and-script";
import { UnitsData } from "@/data/units";
import { ChapterSheet } from "./chapter-sheet";
import { LessonSheet } from "./lesson-sheet";
import { UnitCards } from "./unit-cards";

export function SectionCards() {
  const [selectedSection, setSelectedSection] =
    React.useState("sound-and-script");
  const style = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    padding: "10px",
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
    <div className="min-w-4xl grid grid-cols-1 gap-4 px-4">
      <Tabs
        defaultValue={selectedSection}
        className="w-full"
        style={style}
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full mx-2xl">
          <TabsTrigger
            value="sound-and-script"
            className="hover:bg-gray-100 hover:cursor-pointer"
            style={selectedSection === "sound-and-script" ? selectedStyle : {}}
          >
            Sound and Script
          </TabsTrigger>
          <TabsTrigger
            value="units"
            className="hover:bg-gray-100 hover:cursor-pointer"
            style={selectedSection === "units" ? selectedStyle : {}}
          >
            Units
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sound-and-script">
          {/* <JsonViewerComponent data={SoundAndScriptData} /> */}
          <div className="flex">
            {SoundAndScriptData.map((lesson) => (
              <LessonSheet key={lesson.lesson} lesson={lesson} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="units">
          <UnitCards units={UnitsData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
