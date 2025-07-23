"use client";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonViewerComponent } from "./json-viewer";
import { SoundAndScriptData } from "@/data/sound-and-script";
import { UnitsData } from "@/data/units";
import { ChapterSheet } from "./chapter-sheet";
import { LessonSheet } from "./lesson-sheet";
import { UnitCards } from "./unit-cards";
import { AlphabetsCard } from "./alphabets-card";
import { EnglishSoundsCard } from "./english-sounds";
import { TocCard } from "./toc-card"; 

export function SectionCards() {
  const [selectedSection, setSelectedSection] =
    React.useState("sound-and-script");
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
    <Tabs
      defaultValue={selectedSection}
      onValueChange={handleTabChange}
      className="min-w-screen min-h-screen"
    >
      <TabsList className="">
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
        <TabsTrigger
          value="alphabets"
          className="hover:bg-gray-100 hover:cursor-pointer"
          style={selectedSection === "alphabets" ? selectedStyle : {}}
        >
          Alphabets
        </TabsTrigger>
        <TabsTrigger
          value="toc"
          className="hover:bg-gray-100 hover:cursor-pointer"
          style={selectedSection === "toc" ? selectedStyle : {}}
        >
          Table of Contents
        </TabsTrigger>
        <TabsTrigger
          value="english-sounds"
          className="hover:bg-gray-100 hover:cursor-pointer"
          style={selectedSection === "english-sounds" ? selectedStyle : {}}
        >
          English Sounds
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sound-and-script" style={style}>
        {/* <JsonViewerComponent data={SoundAndScriptData} /> */}
        <div className="flex flex-cols-1 gap-4">
          {SoundAndScriptData.map((lesson) => (
            <LessonSheet key={lesson.lesson} lesson={lesson} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="units">
        <UnitCards units={UnitsData} />
      </TabsContent>
      <TabsContent value="alphabets">
        <AlphabetsCard />
      </TabsContent>
      <TabsContent value="toc">
        <TocCard />
      </TabsContent>
      <TabsContent value="english-sounds">
        <EnglishSoundsCard />
      </TabsContent>
    </Tabs>
  );
}
