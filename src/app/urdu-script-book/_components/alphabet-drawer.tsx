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
    return alphabetsData.alphabets.map((alphabet) => (
      <DrawerTrigger
        key={alphabet.letter_alone}
        className="w-full text-left"
        onClick={() => {
          setCurrentAlphabetIndex(alphabetsData.alphabets.indexOf(alphabet));
          setIsOpen(true);
        }}
        asChild
      >
        
        <Card className="mb-2 cursor-pointer">
          <CardContent className="flex items-center justify-between">
            <span className="ur text-xl font-bold">
              {alphabet.letter_alone}
            </span>
          </CardContent>
        </Card>
      </DrawerTrigger>
    ));
  };
  const renderDrawerContent = () => {
    const alphabet = alphabetsData.alphabets[currentAlphabetIndex];
    return (
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold">
            {alphabet.name_romanized}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <p className="ur text-xl font-bold mb-2">
            Alone: {alphabet.letter_alone}
          </p>
          <p className="ur text-xl font-bold mb-2">
            Initial: {alphabet.initial_form}
          </p>
          <p className="ur text-xl font-bold mb-2">
            Medial: {alphabet.medial_form}
          </p>
          <p className="ur text-xl font-bold mb-2">
            Final: {alphabet.final_form}
          </p>
          <p className="lang-en text-lg mb-4">
            Basic Sound Romanized: {alphabet.basic_sound_romanized}
          </p>
          <Button
            onClick={() => {
              const audio = new Audio(alphabet.audio_link);
              audio.play();
            }}
          >
            Play Sound
          </Button>
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
