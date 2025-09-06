"use client";
import * as Tone from "tone";
import { useState, useRef, useEffect } from "react";
export const useTune = () => {
  // useRef to store Tone.js players without causing re-renders
  const correctPlayer = useRef<Tone.Player>(null);
  const incorrectPlayer = useRef<Tone.Player>(null);

  useEffect(() => {
    correctPlayer.current = new Tone.Player({
      url: "/media/app-sounds/success.mp3",
      autostart: false,
      loop: false,
    }).toDestination();
    incorrectPlayer.current = new Tone.Player({
      url: "/media/app-sounds/error.mp3",
      autostart: false,
      loop: false,
    }).toDestination();

    return () => {
      // cleanup and reset
      correctPlayer.current?.dispose();
      incorrectPlayer.current?.dispose();
    };
  }, []);

  const playCorrectTune = () => {
    // Add a small time offset to prevent the 'start time' error
    correctPlayer.current?.start(Tone.now() + 0.1);
  };
  const playIncorrectTune = () => {
    // Add a small time offset to prevent the 'start time' error
    incorrectPlayer.current?.start(Tone.now() + 0.1);
  };

  return {
    playCorrectTune,
    playIncorrectTune,
  };
};
