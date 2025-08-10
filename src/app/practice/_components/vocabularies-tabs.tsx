"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { VocabularyData } from "../_lib/voc-interfaces";
import { JsonViewerComponent } from "@/components/json-viewer";
import { mapVItemsToAudioData } from "../_lib/helpers";
import Loading from "@/app/loading";
import * as React from "react";
type TabContentProps = "original-json" | "simplified-json" | "vocabulary-list";
interface VocabulariesTabsProps {
  data: VocabularyData | null;
  isLoading: boolean;
}

export const VocabulariesTabs = ({
  data,
  isLoading,
}: VocabulariesTabsProps) => {
  const [activeTab, setActiveTab] =
    React.useState<TabContentProps>("vocabulary-list");

  if (isLoading) {
    return <Loading />;
  }
  const selectedTabStyle = {
    backgroundColor: "blue",
    color: "white",
  };
  const audioData = mapVItemsToAudioData(data?.vItems || []);
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabContentProps)}
    >
      <TabsList>
        <TabsTrigger
          value="vocabulary-list"
          style={activeTab === "vocabulary-list" ? selectedTabStyle : undefined}
        >
          Vocabulary List
        </TabsTrigger>
        <TabsTrigger
          value="original-json"
          style={activeTab === "original-json" ? selectedTabStyle : undefined}
        >
          Original JSON
        </TabsTrigger>
        <TabsTrigger
          value="simplified-json"
          style={activeTab === "simplified-json" ? selectedTabStyle : undefined}
        >
          Simplified JSON
        </TabsTrigger>
      </TabsList>
      <TabsContent value="vocabulary-list">
        <JsonViewerComponent data={data} />
      </TabsContent>
      <TabsContent value="original-json">
        <JsonViewerComponent data={data} />
      </TabsContent>
      <TabsContent value="simplified-json" className="flex flex-col gap-5">
        <AudioPlayers audioUrls={Object.keys(audioData)} />

        <JsonViewerComponent data={audioData} />
      </TabsContent>
    </Tabs>
  );
};

function AudioPlayers({ audioUrls }: { audioUrls: string[] }) {
  // console.log("audioUrl: ", audioUrls);
  return (
    <div className="grid grid-cols-4 gap-5">
      {audioUrls.map((audioUrl, index) => (
        <audio controls playsInline key={index}>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ))}
    </div>
  );
}
