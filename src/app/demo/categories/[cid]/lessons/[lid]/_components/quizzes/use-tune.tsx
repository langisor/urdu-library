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
    // Stop the player first to reset its state
    if (correctPlayer.current) {
      correctPlayer.current.stop();
      correctPlayer.current.start(Tone.now());
    }
  };
  const playIncorrectTune = () => {
    // Stop the player first to reset its state
    if (incorrectPlayer.current) {
      incorrectPlayer.current.stop();
      incorrectPlayer.current.start(Tone.now());
    }
  };

  return {
    playCorrectTune,
    playIncorrectTune,
  };
};
