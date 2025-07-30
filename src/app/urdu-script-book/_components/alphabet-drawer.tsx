"use client";
import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
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
            className="w-full text-center flex items-center justify-center h-48 bg-gray-100 hover:bg-gray-200 transition-colors"
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
                <span className="ur font-bold sm:text-6xl">
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
      <DrawerContent className="sm:h-screen w-full overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="phonetic">
            {alphabet.name_romanized}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4 my-4">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="text-center">
                  <h3 className="big-en">
                    Initial Form
                  </h3>
                  <h3 className="big-ur">
                    {alphabet.initial_form}
                  </h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center">
                  <h3 className="big-en">
                    Medial Form
                  </h3>
                  <h3 className="big-ur">
                    {alphabet.medial_form}
                  </h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center">
                  <h3 className="big-en">
                    Final Form
                  </h3>
                  <p className="big-ur">{alphabet.final_form}</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardContent className="mt-4">
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Basic Sound</h3>
                  <p className="text-2xl">{alphabet.basic_sound_romanized}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4">
            <Button
              onClick={() => {
                const audio = new Audio(alphabet.audio_link);
                audio.play();
              }}
              className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600"
            >
              Play Sound
            </Button>
          </div>
        </div>
      </DrawerContent>
    );
  };
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-4">{renderTriggers()}</div>
      {renderDrawerContent()}
    </Drawer>
  );
}
