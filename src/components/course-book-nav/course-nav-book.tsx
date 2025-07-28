"use client";
import * as React from "react";
import type { IBookData } from "@/data/course-book/ts-definition";
import BookCover from "./book-cover";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import PreliminaryTab from "./tabs-content/preliminary-tab";
import PartsTab from "./tabs-content/parts-tab";

type tabValue = "cover" | "preliminary" | "appendices" | "parts" | "units";

export default function CourseBookNavigator({
  bookData,
}: {
  bookData: Promise<IBookData>;
}) {
  const data = React.use(bookData);
  const [selectedView, setSelectedView] = React.useState<tabValue>("cover");
  React.useEffect(() => {
    // initialize the states
    setSelectedView("cover");
  }, []);

  // style selected tab
  const selectedTabStyle = {
    backgroundColor: "blue",
    color: "white",
  };

  return (
    <div className="w-full">
      <Tabs
        value={selectedView}
        onValueChange={(value) => setSelectedView(value as tabValue)}
      >
        <TabsList>
          <TabsTrigger
            value="cover"
            style={selectedView === "cover" ? selectedTabStyle : undefined}
          >
            Cover
          </TabsTrigger>
          <TabsTrigger
            value="preliminary"
            style={
              selectedView === "preliminary" ? selectedTabStyle : undefined
            }
          >
            Preliminary
          </TabsTrigger>
          <TabsTrigger
            value="parts"
            style={selectedView === "parts" ? selectedTabStyle : undefined}
          >
            Parts
          </TabsTrigger>

          <TabsTrigger
            value="units"
            style={selectedView === "units" ? selectedTabStyle : undefined}
          >
            Units
          </TabsTrigger>
          <TabsTrigger
            value="appendices"
            style={selectedView === "appendices" ? selectedTabStyle : undefined}
          >
            Appendices
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cover">
          <BookCover
            title={data.title}
            language={data.language}
            coverImage={data.coverImage}
            totalPages={data.totalPages}
            structure={data.structure}
          />
        </TabsContent>
        <TabsContent value="preliminary">
          <PreliminaryTab preliminaryContent={data.preliminaryContent} />
        </TabsContent>

        <TabsContent value="parts">
          <PartsTab parts={data.parts} />
        </TabsContent>
        <TabsContent value="appendices">
          <h2>Appendices</h2>
        </TabsContent>
      </Tabs>
    </div>
  );
}
