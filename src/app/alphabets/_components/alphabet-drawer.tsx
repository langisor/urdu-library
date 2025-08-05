"use client";
import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import alphabetsData from "@/data/additional/alphabet-tabel.json";

interface AlphabetsDrawerProps {
  title: string;
  alphabets: {
    letter_alone: string;
    initial_form: string;
    medial_form: string;
    final_form: string;
    name_romanized: string;
    basic_sound_romanized: string;
    audio_link: string;
  }[];
}

export default function AlphabetDrawerTable() {
  const [currentAlphabetIndex, setCurrentAlphabetIndex] =
    React.useState<number>(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const renderTriggers = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {alphabetsData.alphabets.map((alphabet) => (
          <DrawerTrigger
            key={alphabet.letter_alone}
            className="h-48 bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => {
              setCurrentAlphabetIndex(
                alphabetsData.alphabets.indexOf(alphabet)
              );
              setIsOpen(true);
            }}
            asChild
          >
            <Card className="mb-2 cursor-pointer">
              <CardContent className="flex items-center justify-between">
                <span className="ur  nastaliq font-bold sm:text-6xl">
                  {alphabet.letter_alone}
                </span>
              </CardContent>
            </Card>
          </DrawerTrigger>
        ))}
      </div>
    );
  };

  const renderDrawerContent = () => {
    const alphabet = alphabetsData.alphabets[currentAlphabetIndex];
    return (
      <DrawerContent className="min-h-screen w-full overflow-y-auto">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerTitle className="inter-bold italic text-2xl">
            {alphabet.name_romanized}
          </DrawerTitle>
          <Button
            onClick={() => {
              const audio = new Audio(alphabet.audio_link);
              audio.play();
            }}
            className="w-24 h-16 bg-blue-500 text-white hover:bg-blue-600"
          >
            Play Sound
          </Button>
        </DrawerHeader>
        <div className="p-4 my-4">
          <div className="flex flex-col space-y-4">
            <h1 className="nastaliq-bold text-4xl text-center bg-slate-500 p-4 text-white! rounded-2xl">
              {alphabet.letter_alone}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="text-center flex flex-row items-center justify-between">
                  <span className="inter-bold">Initial Form</span>
                  <span className="nastaliq-bold text-4xl">
                    {alphabet.initial_form}
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center flex flex-row items-center justify-between">
                  <span className="inter-bold">Medial Form</span>
                  <span className="nastaliq-bold text-4xl">
                    {alphabet.medial_form}
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center flex flex-row items-center justify-between">
                  <span className="inter-bold">Final Form</span>
                  <span className="nastaliq-bold text-4xl">
                    {alphabet.final_form}
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center mx-auto my-auto">
                  <DrawerClose asChild className="flex flex-col">
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="w-48 h-16 text-3xl"
                    >
                      Close
                    </Button>
                  </DrawerClose>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardContent className="mt-4">
                <div className="mt-4 flex flex-row items-center gap-4">
                  <span className="inter-bold text-2xl">Basic Sound</span>
                  <span className="inter-bold text-4xl">
                    {alphabet.basic_sound_romanized}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="mt-4">
                <div className="mt-4 flex flex-row items-center gap-4">
                  <span className="inter-bold text-2xl">
                    To Do : Alphabet Notes
                  </span>
                  <span className="inter-bold text-4xl">
                    add alphabet pronunciation notes such as (initial, medial,
                    final)
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DrawerContent>
    );
  };
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="top">
      <div className="p-4">{renderTriggers()}</div>
      {renderDrawerContent()}
    </Drawer>
  );
}
