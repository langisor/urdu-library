import React, { useState, useEffect } from "react";
import { QuizOption } from "./utils";
import DraggableWord from "./DraggableWord";
import DroppableZone from "./DroppableZone";
import { getAudioUrl, playAudio } from "./utils";

interface QuizGridProps {
  options: QuizOption[];
  solutions: QuizOption[];
  placements: Record<string, string | null>;
  isDragging: boolean;
  onIncorrectPlacement: () => void;
}

const QuizGrid: React.FC<QuizGridProps> = ({
  options,
  solutions,
  placements,
  isDragging,
  onIncorrectPlacement,
}) => {
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);

  // Create a mapping between solution keys and their corresponding alt options
  const optionMap = options.reduce<Record<string, QuizOption>>(
    (map, option) => {
      map[option.key] = option;
      return map;
    },
    {}
  );

  // Get list of solution ids that have been placed
  const placedSolutionIds = Object.values(placements).filter(
    Boolean
  ) as string[];

  // Find the next available solution that hasn't been placed
  useEffect(() => {
    const unplacedIndex = solutions.findIndex(
      (sol) => !placedSolutionIds.includes(sol.key)
    );
    if (unplacedIndex !== -1) {
      setCurrentOptionIndex(unplacedIndex);
      // Play audio for the current option
      const solution = solutions[unplacedIndex];
      const audioUrl = getAudioUrl(solution.key, solution.audio_updated_at!);
      playAudio(audioUrl);
    }
  }, [placedSolutionIds.length]);

  // Handle incorrect placement
  useEffect(() => {
    const errorAudio = new Audio("/error.mp3");
    const handleError = () => {
      errorAudio.play();
      onIncorrectPlacement();
    };

    return () => {
      errorAudio.pause();
      errorAudio.currentTime = 0;
    };
  }, [onIncorrectPlacement]);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
      {solutions.map((solution) => {
        const dropId = `drop-${solution.key}`;
        const placedItemId = placements[dropId];
        const matchingOption = optionMap[solution.key];

        return (
          <DroppableZone
            key={dropId}
            id={dropId}
            placedItemId={placedItemId}
            imgSrc={matchingOption?.image}
            altText={matchingOption?.text}
            label={matchingOption?.phonetic}
          >
            {placedItemId && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-lg text-lg font-medium">
                  {solutions.find((sol) => sol.key === placedItemId)?.text}
                </div>
              </div>
            )}
          </DroppableZone>
        );
      })}

      <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
        {currentOptionIndex < solutions.length && (
          <DraggableWord
            key={solutions[currentOptionIndex].key}
            id={solutions[currentOptionIndex].key}
            text={solutions[currentOptionIndex].text}
            isPlaced={placedSolutionIds.includes(
              solutions[currentOptionIndex].key
            )}
            disabled={
              isDragging &&
              !placedSolutionIds.includes(solutions[currentOptionIndex].key)
            }
          />
        )}
      </div>
    </div>
  );
};

export default QuizGrid;
