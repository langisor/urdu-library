"use client";

import { useState, useEffect } from "react";
import * as Tone from "tone";

interface MediaPlayerProps {
  audioSrc: string;
  autoPlay?: boolean;
}

export const MediaPlayer: React.FC<MediaPlayerProps> = ({
  audioSrc,
  autoPlay = false,
}) => {
  // State to manage the player instance
  const [player, setPlayer] = useState<Tone.Player | null>(null);
  // State to track if the audio is currently playing
  const [isPlaying, setIsPlaying] = useState(false);
  // State to track if the user has interacted with the page
  const [hasInteracted, setHasInteracted] = useState(false);

  // UseEffect hook for setting up the Tone.js player and context.
  // This runs only once on component mount.
  useEffect(() => {
    // URL for a placeholder audio file. You should replace this with your own audio file.
    const audioUrl = audioSrc;

    // Create a new Tone.Player instance.
    const newPlayer = new Tone.Player({
      url: audioUrl,
      loop: false,
      autostart: autoPlay, // We'll handle the start manually
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
  }, [hasInteracted, player]);

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

  if (!player?.loaded) {
    return <button>Loading audio...</button>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-sans">
      <div className="p-8 bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Tone.js Audio Player
        </h1>
        <p className="text-sm text-gray-400 mb-6 text-center">
          Click the button to start playback. This handles the browser's
          required user gesture for audio.
        </p>
        <button
          onClick={togglePlayback}
          className="w-full py-4 px-6 rounded-lg font-semibold text-lg
            transition-all duration-300 transform hover:scale-105
            focus:outline-none focus:ring-4 focus:ring-opacity-50
            relative overflow-hidden
            bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
            focus:ring-blue-500"
        >
          <span className="relative z-10">{isPlaying ? "Pause" : "Play"}</span>
          <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-10"></div>
        </button>
      </div>
    </div>
  );
};
