"use client";
import React, { useState } from "react";
 
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TOCData {
  id: string;
  title: string;
}
// Component for the Table of Contents
export const TableOfContents = ({
  tocData,
  navigateTo,
}: {
  tocData: TOCData[];
  navigateTo: (id: string) => void;
}) => (
  <div className="p-8">
    <h1 className="text-4xl font-bold mb-6 text-center text-teal-700">
      Basic Urdu Grammar
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tocData.map((chapter) => (
        <Card
          key={chapter.id}
          onClick={() => navigateTo(chapter.id)}
          className="cursor-pointer hover:bg-teal-100 transition-colors duration-300"
        >
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-teal-800">
              {chapter.title}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
