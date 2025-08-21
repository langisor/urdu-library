"use client";
import * as Tone from "tone";
import {useState,useRef,useEffect} from "react";
export const useTune = () => {
  // useRef to store Tone.js players without causing re-renders
  const correctPlayer = useRef<Tone.Player>(null);
  const incorrectPlayer = useRef<Tone.Player>(null);
    
  useEffect(() => {
    correctPlayer.current = new Tone.Player({
      url: "media/app-sounds/success.mp3",
      autostart: false,
      loop: false,
    }).toDestination();
    incorrectPlayer.current = new Tone.Player({
      url: "media/app-sounds/error.mp3",
      autostart: false,
      loop: false,
    }).toDestination();
  },[])

  const playCorrectTune = () => {
    correctPlayer.current?.start();
  }

  const playIncorrectTune = () => {
    incorrectPlayer.current?.start();
  }

  return {
    playCorrectTune,
    playIncorrectTune,
  }
}


