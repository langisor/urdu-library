"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import alphabetsData from "@/data/additional/alphabet-tabel.json";
interface AlphabetsData {
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

export function AlphabetsTable() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const handlePlay = (audioLink: string) => {
    audioRef.current!.src = audioLink;
    audioRef.current!.play();
    setIsPlaying(true);
  };
  return (
    <div className="w-full p-4">
      <h1>{alphabetsData.title}</h1>
      <table className="w-full border-collapse border border-gray-500 mx-auto">
        <thead>
          <tr>
            <th className="w-16">Alone</th>
            <th className="w-16">Initial</th>
            <th className="w-16">Medial</th>
            <th className="w-16">Final</th>
            <th className="w-16">Romanized</th>
            <th className="w-24">Basic Sound Romanized</th>
            <th className="hidden">Audio Link</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {alphabetsData.alphabets.map((alphabet) => (
            <tr
              key={alphabet.letter_alone}
              className="hover:bg-gray-300 cursor-pointer text-center mt-2 mb-2 border-b border-gray-300"
              onClick={() => handlePlay(alphabet.audio_link)}
            >
              <td className="ur py-2 font-bold w-16 bg-blue-700 text-yellow-500 text-xl">
                {alphabet.letter_alone}
              </td>
              <td className="ur py-2 font-bold w-16 text-xl">
                {alphabet.initial_form}
              </td>
              <td className="ur py-2 font-bold w-16 bg-blue-700 text-yellow-500 text-xl">
                {alphabet.medial_form}
              </td>
              <td className="ur py-2 font-bold w-16 text-xl">
                {alphabet.final_form}
              </td>
              <td className="lang-en py-2 w-24 bg-blue-700 text-yellow-500 text-xl">
                {alphabet.name_romanized}
              </td>
              <td className="lang-en py-2 w-24 text-xl">
                {alphabet.basic_sound_romanized}
              </td>
              <td className="hidden">
                <audio
                  className=""
                  controls
                  src={alphabet.audio_link}
                  ref={audioRef}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                >
                  Not supported
                </audio>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
