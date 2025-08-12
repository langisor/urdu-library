"use client";

import * as React from "react";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { DraggableItem, DroppableZone } from "./dnd";
import { Button } from "@/components/ui/button";
import { Volume2, RotateCcw, CheckCircle } from "lucide-react";
import { getAudioUrl } from "../../quizzes-utils";
import { Quiz, SolutionOrAlternate } from "@/app/mondly/_types/data-services";
import { shuffleArray } from "../../quizzes-utils";
import { AudioPlayer } from "../audio-player";

interface QuizData {
  id: number;
  lesson: number;
  type: string;
  sols: SolutionOrAlternate[];
  alts: SolutionOrAlternate[];
}
interface MatchPair {
  urduKey: string;
  arabicKey: string;
  urduText: string;
  arabicText: string;
  phonetic: string;
}

// error sound
const useErrorSound = () => {
  const errorSound = new Audio("/sounds/error.wav");
  if (!errorSound)
    return () => {
      console.log("error sound not found");
    };
  // errorSound.load();
  function playSound() {
    return errorSound.play();
  }
  return playSound;
};

// success sound
const useSuccessSound = () => {
  const successSound = new Audio("/sounds/success.wav");
  if (!successSound)
    return () => {
      console.log("success sound not found");
    };
  // successSound.load();
  function playSound() {
    return successSound.play();
  }
  return playSound;
};

// this will be a matching quiz
export function QuizQ({ quiz }: { quiz: Quiz }) {
  const [quizData, setQuizData] = React.useState<QuizData | null>(null);
  const [matchPairs, setMatchPairs] = React.useState<MatchPair[]>([]);
  const [droppedItems, setDroppedItems] = React.useState<{
    [key: string]: string;
  }>({});
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isComplete, setIsComplete] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [correctMatches, setCorrectMatches] = React.useState<Set<string>>(
    new Set()
  );
  const [selectedUrduKey, setSelectedUrduKey] = React.useState<string | null>(
    null
  );

  const playErrorSound = useErrorSound();
  const playSuccessSound = useSuccessSound();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  React.useEffect(() => {
    if (quiz) {
      setQuizData({
        id: quiz.id,
        lesson: quiz.lesson,
        type: quiz.type,
        sols: quiz.sols,
        alts: quiz.alts || [],
      });

      // Create match pairs from solutions and alternatives
      const pairs: MatchPair[] = quiz.sols.map((sol, index) => ({
        urduKey: sol.key,
        arabicKey: quiz.alts?.[index]?.key || "",
        urduText: sol.text,
        arabicText: quiz.alts?.[index]?.text || "",
        phonetic: sol.phonetic || "",
      }));

      setMatchPairs(shuffleArray(pairs));
    }
  }, []);

  const handleUrduClick = (urduKey: string) => {
    // If item is already matched, don't allow selection
    if (correctMatches.has(urduKey)) return;

    // If clicking the same item, deselect it
    if (selectedUrduKey === urduKey) {
      setSelectedUrduKey(null);
    } else {
      setSelectedUrduKey(urduKey);
    }
  };

  const handleArabicClick = (arabicKey: string) => {
    if (!selectedUrduKey) return;

    // Remove any existing mapping for this drop zone
    const newDroppedItems = { ...droppedItems };
    Object.keys(newDroppedItems).forEach((key) => {
      if (newDroppedItems[key] === arabicKey) {
        delete newDroppedItems[key];
      }
    });

    // Add new mapping
    newDroppedItems[selectedUrduKey] = arabicKey;
    setDroppedItems(newDroppedItems);
    setSelectedUrduKey(null); // Deselect after placing
  };

  const handleAvailableAreaClick = () => {
    if (!selectedUrduKey) return;

    // Remove from dropped items if it was placed
    const newDroppedItems = { ...droppedItems };
    delete newDroppedItems[selectedUrduKey];
    setDroppedItems(newDroppedItems);
    setSelectedUrduKey(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setSelectedUrduKey(null); // Clear selection when dragging starts
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || !matchPairs) return;

    const draggedItemKey = active.id as string;
    const dropZoneKey = over.id as string;

    // If dropping on an Arabic drop zone
    if (dropZoneKey.startsWith("arabic-")) {
      const arabicKey = dropZoneKey.replace("arabic-", "");

      // Remove any existing mapping for this drop zone
      const newDroppedItems = { ...droppedItems };
      Object.keys(newDroppedItems).forEach((key) => {
        if (newDroppedItems[key] === arabicKey) {
          delete newDroppedItems[key];
        }
      });

      // Add new mapping
      newDroppedItems[draggedItemKey] = arabicKey;
      setDroppedItems(newDroppedItems);
    }
    // If dropping back to available area
    else if (dropZoneKey === "available-urdu") {
      const newDroppedItems = { ...droppedItems };
      delete newDroppedItems[draggedItemKey];
      setDroppedItems(newDroppedItems);
    }
  };

  const checkAnswers = () => {
    if (!matchPairs) return;

    const newCorrectMatches = new Set<string>();
    let allCorrect = true;
    let hasIncorrect = false;

    // Check each match
    matchPairs.forEach((pair) => {
      const droppedArabicKey = droppedItems[pair.urduKey];
      if (droppedArabicKey === pair.arabicKey) {
        newCorrectMatches.add(pair.urduKey);
      } else if (droppedArabicKey) {
        hasIncorrect = true;
        allCorrect = false;
      }
    });

    setCorrectMatches(newCorrectMatches);

    // Check if all items are placed
    const allPlaced = matchPairs.every((pair) => droppedItems[pair.urduKey]);

    if (allPlaced) {
      if (allCorrect) {
        setIsComplete(true);
        playSuccessSound();
      } else if (hasIncorrect) {
        setShowError(true);
        playErrorSound();

        setTimeout(() => {
          resetQuiz();
          setShowError(false);
        }, 1500);
      }
    }
  };

  const resetQuiz = () => {
    setDroppedItems({});
    setIsComplete(false);
    setShowError(false);
    setCorrectMatches(new Set());
    setSelectedUrduKey(null);
  };

  // Check answers when items are dropped
  React.useEffect(() => {
    if (Object.keys(droppedItems).length > 0) {
      setTimeout(checkAnswers, 300);
    }
  }, [droppedItems]);

  if (!quizData || matchPairs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const activeItem = activeId
    ? matchPairs.find((pair) => pair.urduKey === activeId)
    : null;

  const shuffledMatchPairs = shuffleArray([...matchPairs]);

  return (
    <div className="max-w-6xl mx-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            مطابقة الجمل
          </h1>
          <p className="text-lg text-gray-600">
            اسحب الجمل الأردية إلى الترجمة العربية الصحيحة أو انقر عليها ثم انقر
            على الترجمة
          </p>
          {selectedUrduKey && (
            <div className="mt-2 p-2 bg-orange-100 border border-orange-300 rounded-lg inline-block">
              <p className="text-orange-800 font-medium">
                تم تحديد جملة - انقر على الترجمة العربية المناسبة
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Urdu Sentences (Draggable) */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              الجمل الأردية
            </h2>

            <DroppableZone
              id="available-urdu"
              isEmpty={false}
              onClick={handleAvailableAreaClick}
              isClickable={!!selectedUrduKey}
            >
              <div className="space-y-3 w-full">
                {shuffledMatchPairs
                  .filter((pair) => !droppedItems[pair.urduKey])
                  .map((pair) => (
                    <DraggableItem
                      key={pair.urduKey}
                      id={pair.urduKey}
                      isMatched={correctMatches.has(pair.urduKey)}
                      onClick={(e?: any) => {
                        e?.stopPropagation();
                        handleUrduClick(pair.urduKey);
                      }}
                      isSelected={selectedUrduKey === pair.urduKey}
                    >
                      <div className="text-center">
                        <div
                          className="text-lg font-medium text-gray-800 mb-1"
                          dir="rtl"
                        >
                          {pair.urduText}
                        </div>
                        <div className="text-sm text-gray-500 italic">
                          {pair.phonetic}
                        </div>
                      </div>
                    </DraggableItem>
                  ))}
              </div>
            </DroppableZone>
          </div>

          {/* Arabic Translations (Drop Zones) */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              الترجمات العربية
            </h2>

            <div className="space-y-4">
              {shuffleArray([...matchPairs]).map((pair) => {
                const droppedUrduKey = Object.keys(droppedItems).find(
                  (key) => droppedItems[key] === pair.arabicKey
                );
                const isCorrect = droppedUrduKey === pair.urduKey;
                const hasItem = !!droppedUrduKey;

                return (
                  <div key={pair.arabicKey} className="space-y-2">
                   
                  
                

                    <DroppableZone
                      id={`arabic-${pair.arabicKey}`}
                      isEmpty={!hasItem}
                      isCorrect={hasItem ? isCorrect : undefined}
                      onClick={() => handleArabicClick(pair.arabicKey)}
                      isClickable={!!selectedUrduKey && !hasItem}
                    >
                      {pair.arabicText}
                      {droppedUrduKey && (
                        <DraggableItem
                          id={droppedUrduKey}
                          isMatched={isCorrect}
                          onClick={(e?: any) => {
                            e?.stopPropagation();
                            if (!isCorrect) {
                              handleUrduClick(droppedUrduKey);
                            }
                          }}
                          isSelected={selectedUrduKey === droppedUrduKey}
                        >
                          <div className="text-center">
                            <div
                              className="text-lg font-medium text-gray-800 mb-1"
                              dir="rtl"
                            >
                              {
                                matchPairs.find(
                                  (p) => p.urduKey === droppedUrduKey
                                )?.urduText
                              }
                            </div>
                            <div className="text-sm text-gray-500 italic">
                              {
                                matchPairs.find(
                                  (p) => p.urduKey === droppedUrduKey
                                )?.phonetic
                              }
                            </div>
                          </div>
                        </DraggableItem>
                      )}
                    </DroppableZone>
                  </div>

                );

              })}
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {showError && (
          <div className="text-center mt-8">
            <p className="text-red-600 font-semibold text-lg">
              خطأ! جاري إعادة المحاولة...
            </p>
          </div>
        )}

        {isComplete && (
          <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <p className="text-green-600 font-semibold text-xl">
                ممتاز! جميع الإجابات صحيحة
              </p>
            </div>
            <Button onClick={resetQuiz} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              العب مرة أخرى
            </Button>
          </div>
        )}

        <DragOverlay>
          {activeItem && (
            <div className="bg-white border-2 border-blue-500 rounded-lg px-4 py-3 shadow-lg">
              <div className="text-center">
                <div
                  className="text-lg font-medium text-gray-800 mb-1"
                  dir="rtl"
                >
                  {activeItem.urduText}
                </div>
                <div className="text-sm text-gray-500 italic">
                  {activeItem.phonetic}
                </div>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
