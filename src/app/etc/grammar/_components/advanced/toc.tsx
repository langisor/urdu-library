"use client";
import React, { useState } from "react";
 import { Button } from "@/components/ui/button";
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
          <div className="p-8 space-y-4">
            <h2 className="text-3xl font-bold mb-4 text-teal-700">
              Urdu Grammar Guide
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Welcome to your interactive guide to learning Urdu grammar. Select
              a chapter to begin your journey!
            </p>
            <div className="space-y-4">
              {tocData.map((chapter) => (
                <Button
                  key={chapter.id}
                  onClick={() => navigateTo(chapter.id)}
                  className="w-full text-left p-6 bg-teal-50 border border-teal-200 rounded-lg shadow hover:bg-teal-100 transition-colors duration-300"
                >
                  <h3 className="text-xl font-semibold text-teal-900">
                    {chapter.title}
                  </h3>
                </Button>
              ))}
            </div>
          </div>
);
