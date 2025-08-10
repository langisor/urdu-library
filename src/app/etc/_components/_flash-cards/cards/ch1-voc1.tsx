"use client";
import React, { useState } from "react";
import vocabData from "../data/ch-1-voc-1.json";
import "./flash-cards-styles.css";

const FlashcardCh1Voc1 = () => {
  const words = vocabData.school_and_classroom_vocabulary;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % words.length);
    setIsFlipped(false);
  };

  const handlePrev = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + words.length) % words.length
    );
    setIsFlipped(false);
  };

  const currentWord = words[currentCardIndex];

  return (
    <div className="flashcard-container">
      <div
        className={`card ${isFlipped ? "is-flipped" : ""}`}
        onClick={handleFlip}
      >
        <div className="card-face card-front">
          <p>{currentWord.english}</p>
        </div>
        <div className="card-face card-back">
          <div className="back-content">
            <p>
              <strong>Urdu Script:</strong> {currentWord.urdu_script}
            </p>
            <p>
              <strong>Urdu Transliteration:</strong>{" "}
              {currentWord.urdu_transliteration}
            </p>
            <p>
              <strong>Gender:</strong>{" "}
              {currentWord.gender === "m" ? "Masculine" : "Feminine"}
            </p>
          </div>
        </div>
      </div>
      <div className="controls">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default FlashcardCh1Voc1;
