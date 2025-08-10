"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ViewVocabularies from "./_components/vocabularies-sheet";
import { Button } from "@/components/ui/button";

import jsonData from "@/app/mondly/data/all.json";

import { JsonViewerComponent } from "@/components/json-viewer";

// Define the data types based on the JSON structure
type Lesson = {
  id: number;
  name: string;
  done: boolean;
  disabled: boolean;
  stars: number;
};

type Category = {
  category: {
    id: number;
    name: string;
    countDone: number;
    countLesson: number;
  };
  lessons: Lesson[];
};

export default function Practice() {
  const categories: Category[] = jsonData.data as Category[];
  const [activeTab, setActiveTab] = React.useState(
    categories[0].category.id.toString()
  );
  const selectedTabStyle = {
    backgroundColor: "blue",
    color: "white",
  };
  const renderViewVocabulariesButton = () => (
    <ViewVocabularies categoryId={activeTab} />
  );
  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          Language Learning Dashboard
        </h1>
        <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore a wide range of topics and start your language learning
          journey with our comprehensive lessons.
        </p>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full naskh-arabic"
        >
          {/* TabsList container - flex-wrap allows tabs to wrap on smaller screens */}
          <div className="overflow-x-auto scrollbar-hide pb-2">
            <div className="flex flex-col gap-4">
              <TabsList className="w-full justify-start grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4 lg:gap-6 h-auto">
                {categories.map((item) => (
                  <TabsTrigger
                    key={item.category.id}
                    value={item.category.id.toString()}
                    style={
                      activeTab === item.category.id.toString()
                        ? selectedTabStyle
                        : undefined
                    }
                    className="whitespace-nowrap px-2 py-2"
                  >
                    {item.category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {renderViewVocabulariesButton()}
            </div>
          </div>

          {/* TabsContent for each category */}
          {categories.map((item) => (
            <div key={item.category.id}>
              <TabsContent
                value={item.category.id.toString()}
                className="mt-6 flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {item.lessons.map((lesson) => (
                    <Card
                      key={lesson.id}
                      className="transition-transform duration-200 hover:scale-105 shadow-md dark:border-gray-800"
                    >
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                          {lesson.name}
                        </CardTitle>
                        {/* You can add more details here if needed, based on the JSON data */}
                        <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
                          {lesson.done
                            ? `Lesson completed with ${lesson.stars} stars.`
                            : "Lesson not yet completed."}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-4 w-full flex flex-col gap-2 justify-center">
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
                          disabled={lesson.disabled}
                        >
                          Start Lesson
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
