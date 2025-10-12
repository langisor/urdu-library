"use client";

import {
  QuizW1bItem,
  type Feedback,
} from "../../mondly/category/quizzer/_components/definitions";
import * as React from "react";
import Image from "next/image";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from "@/components/ui/shadcn-io/tabs";
import { TonePlayerButton } from "@/components/general/tone-button-player";
import { Card, CardContent } from "@/components/ui/card";
import { useQuizW1b } from "./use-w1b";
import { JsonViewerComponent } from "@/components/general/json-viewer-component";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
interface QuizW1bProps {
  quizData: QuizW1bItem;
}
interface Token {
  id: string;
  text: string;
}
export default function QuizW1b({ quizData }: QuizW1bProps) {
  const { quizActions, staticData, interactiveData } = useQuizW1b(quizData);

  const renderHeader = () => {
    const { wordText, audioFile, image } = staticData;
    console.log("renderHeader ....", image.get());
    return (
      <div>
        <div className="flex flex-row gap-3">
          <h1 className="text-md">{wordText.get()}</h1>
          <TonePlayerButton url={audioFile.get()} />
        </div>
        <div className=" flex flex-col justify-center">
          <Image
            alt={wordText.get()}
            src={image.get()}
            className="object-contain"
            width={200}
            height={200}
          />
        </div>
      </div>
    );
  };

  const renderSelectedTokens = () => {
    const { selectedTokens } = interactiveData;
    if (interactiveData.selectedTokens.length > 0) {
      return (
        <CardContent className="flex flex-row gap-0 text-lg text-blue-600">
          {selectedTokens.map((item, index) => {
            return (
              <Button
                key={index}
                onClick={() => quizActions.handleSelectedTokenClick(item.get())}
              >
                {item.text.value}
              </Button>
            );
          })}
        </CardContent>
      );
    } else {
      return (
        <CardContent className="flex flex-row gap-1 text-lg text-blue-600">
          {Array.from({
            length: interactiveData.availableTokens.length,
          }).map((l, index) => (
            <Button key={index}>_</Button>
          ))}
        </CardContent>
      );
    }
  };

  const renderAvailableTokens = () => {
    const tokensButtons = interactiveData.availableTokens.map((item, index) => {
      return (
        <Button
          key={`${index}-${item.text.get()}`}
          onClick={() => quizActions.handleAvailableTokensClick(item.get())}
        >
          {item.text.get()}
        </Button>
      );
    });

    return tokensButtons;
  };

  return (
    <Tabs defaultValue="converted" className="w-full  rounded-lg">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="original">Original</TabsTrigger>
        <TabsTrigger value="converted">Converted</TabsTrigger>
        <TabsTrigger value="ui">UI</TabsTrigger>
      </TabsList>

      <TabsContents className="mx-1 mb-1 -mt-2 rounded-sm h-full ">
        <TabsContent value="original" className="space-y-6 p-6">
          <p className="text-sm">Original Json</p>

          <div className="space-y-3">
            <JsonViewerComponent data={quizData} />
          </div>
        </TabsContent>
        <TabsContent value="converted" className="space-y-6 p-6">
          <p className="text-sm ">Converted Json</p>
          <div className="space-y-3">
            <JsonViewerComponent
              data={{
                staticData,
                interactiveData,
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="ui" className="space-y-6 p-6">
          <Card
            className="grid grid-cols-2 gap-2 text-right naskh-text px-5"
            dir="rtl"
          >
            <div className="">{renderHeader()}</div>
            <div className="flex flex-col gap-2 items-center">
              <div>{renderSelectedTokens()}</div>
              <div>{...renderAvailableTokens()}</div>
            </div>
          </Card>
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
}
