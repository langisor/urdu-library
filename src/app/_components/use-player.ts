"use client";
import * as React from "react";
import * as Tone from "tone";
import { useState, useRef, useEffect } from "react";

// simple audio player
interface UsePlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
}

export const usePlayer = ({ audioUrl, autoPlay = false }: UsePlayerProps) => {
  const [player, setPlayer] = useState<Tone.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // State to track if the user has interacted with the page
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const newPlayer = new Tone.Player({
      url: audioUrl,
      autostart: false, // We'll handle the start manually
      loop: false,
    }).toDestination();
    // Set the player instance in state.
    setPlayer(newPlayer);
    // This cleanup function runs when the component unmounts.
    return () => {
      // Dispose of the player to free up resources.
      newPlayer.dispose();
    };
  }, []);
  // UseEffect to handle autoplay after user interaction.
  // This runs whenever `hasInteracted` or `player` changes.
  useEffect(() => {
    // Check if the user has interacted and the player is ready.
    if (hasInteracted && player && player.loaded) {
      // Start the audio playback.
      player.start();
      // Update the playing state.
      setIsPlaying(true);
    }
  },[]);

  // Function to handle the play/pause logic
  const togglePlayback = async () => {
    // If the audio context is not yet running, start it.
    // This is the key step to handle the browser's autoplay policy.
    if (Tone.getTransport().state !== "started") {
      await Tone.start();
      console.log("Audio context started");
    }

    // Set `hasInteracted` to true on the first user click.
    if (!hasInteracted) {
      setHasInteracted(true);
      return; // The useEffect will handle starting the playback.
    }

    // If the player is not ready, return.
    if (!player) {
      console.log("Player not yet initialized.");
      return;
    }

    // Check if the player is currently playing
    if (isPlaying) {
      // Stop the player
      player.stop();
      setIsPlaying(false);
    } else {
      // Start the player
      player.start();
      setIsPlaying(true);
    }
  };

  return {
    player,
    togglePlayback,
    isPlaying,
  };
};
