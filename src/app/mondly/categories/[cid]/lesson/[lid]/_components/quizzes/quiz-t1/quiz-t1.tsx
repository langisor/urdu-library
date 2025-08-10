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
import { DraggableItem, DroppableZone } from "../dnd";
import { Button } from "@/components/ui/button";
import { Volume2, RotateCcw } from "lucide-react";
import { getAudioUrl } from "../../quizzes-utils";
import { IQuiz } from "@/types/lesson";
import { AudioPlayer } from "../audio-player";

interface Option {
  id: string;
  value: string;
}

interface QuizData {
  audioSrc: string;
  question_text: string;
  options?: Option[];
  ords?: string[];
}

// error sound
const useErrorSound = () => {
  const errorSound = new Audio("/sounds/error.wav");
  if (!errorSound)
    return () => {
      console.log("error sound not found");
    };
  errorSound.load();
  function playSound() {
    errorSound.play();
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
  successSound.load();
  function playSound() {
    return successSound.play();
  }
  return playSound;
};

function convert(quiz: IQuiz): QuizData {
  const audioSrc = getAudioUrl(
    quiz.sols[0].key,
    quiz.sols[0].audio_updated_at!
  );
  const question_text = quiz.sols[0].text;

  const ords = quiz.ord;

  // quiz.tokens array => options or draggable/clicked items
  const options = quiz.tokens?.map((x: any) => {
    return {
      id: x.key,
      value: x.raw.text,
    };
  });

  return { audioSrc, question_text, options, ords };
}

export function QuizT1({ quiz }: { quiz: IQuiz }) {
  const [quizData, setQuizData] = React.useState<QuizData | null>(null);
  const [droppedItems, setDroppedItems] = React.useState<{
    [key: string]: Option;
  }>({});

  const [availableOptions, setAvailableOptions] = React.useState<Option[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");
  const [isComplete, setIsComplete] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

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
      setQuizData(convert(quiz));
    }
  }, [quiz]);

  React.useEffect(() => {
    if (quizData) {
      setAvailableOptions(quizData.options || []);
    }
  }, [quizData]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId("");

    if (!over || !quizData) return;

    const draggedItemId = active.id as string;
    const dropZoneId = over.id as string;

    // Find the dragged item
    const draggedItem =
      availableOptions?.find((option) => option.id === draggedItemId) ||
      Object.values(droppedItems).find((item) => item.id === draggedItemId);

    if (!draggedItem) return;

    // If dropping on a drop zone
    if (dropZoneId.startsWith("drop-")) {
      const zoneIndex = Number.parseInt(dropZoneId.replace("drop-", ""));

      // Remove item from available options if it was there
      setAvailableOptions((prev) =>
        prev.filter((option) => option.id !== draggedItemId)
      );

      // Remove item from its previous drop zone if it was there
      const newDroppedItems = { ...droppedItems };
      Object.keys(newDroppedItems).forEach((key) => {
        if (newDroppedItems[key].id === draggedItemId) {
          delete newDroppedItems[key];
        }
      });

      // Add item to new drop zone
      newDroppedItems[`drop-${zoneIndex}`] = draggedItem;
      setDroppedItems(newDroppedItems);
    }
    // If dropping back to available options area
    else if (dropZoneId === "available-options") {
      // Remove from dropped items
      const newDroppedItems = { ...droppedItems };
      Object.keys(newDroppedItems).forEach((key) => {
        if (newDroppedItems[key].id === draggedItemId) {
          delete newDroppedItems[key];
        }
      });
      setDroppedItems(newDroppedItems);

      // Add back to available options if not already there
      if (!availableOptions.find((option) => option.id === draggedItemId)) {
        setAvailableOptions((prev) => [...prev, draggedItem]);
      }
    }
  };

  const checkAnswer = () => {
    if (!quizData) return;

    const droppedCount = Object.keys(droppedItems).length;
    const requiredCount = quizData.ords?.length || 0;

    if (droppedCount !== requiredCount) {
      return; // Not all items placed yet
    }

    // Check if the order is correct
    let isCorrect = true;
    for (let i = 0; i < requiredCount; i++) {
      const expectedId = quizData.ords![i];
      const actualItem = droppedItems[`drop-${i}`];
      if (!actualItem || actualItem.id !== expectedId) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      setIsComplete(true);
      playSuccessSound();
    } else {
      // Show error and reset
      setShowError(true);
      playErrorSound();

      setTimeout(() => {
        resetQuiz();
        setShowError(false);
      }, 1000);
    }
  };

  const resetQuiz = () => {
    if (!quizData) return;

    setDroppedItems({});
    setAvailableOptions(quizData.options!);
    setIsComplete(false);
    setShowError(false);
  };

  // Check answer automatically when all items are placed
  React.useEffect(() => {
    if (
      quizData &&
      Object.keys(droppedItems).length === quizData.ords?.length
    ) {
      setTimeout(checkAnswer, 500); // Small delay for better UX
    }
  }, [droppedItems, quizData]);

  if (!quizData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const activeItem = activeId
    ? availableOptions.find((option) => option.id === activeId) ||
      Object.values(droppedItems).find((item) => item.id === activeId)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-2xl font-bold text-gray-800">ترجمة الجملة</h1>
              <AudioPlayer url={quizData.audioSrc} withIconButton={true} />
            </div>
            <p className="text-xl text-gray-700 mb-2" dir="rtl">
              {quizData.question_text}
            </p>
          </div>

          {/* Drop Zones */}
          <div className="flex justify-center gap-4 mb-8">
            {Array.from({ length: quizData.ords!.length }, (_, index) => (
              <DroppableZone
                key={`drop-${index}`}
                id={`drop-${index}`}
                isEmpty={!droppedItems[`drop-${index}`]}
              >
                {droppedItems[`drop-${index}`] && (
                  <DraggableItem id={droppedItems[`drop-${index}`].id}>
                    <span className="text-lg font-medium text-gray-800">
                      {droppedItems[`drop-${index}`].value}
                    </span>
                  </DraggableItem>
                )}
              </DroppableZone>
            ))}
          </div>

          {/* Available Options */}
          <div className="mb-8">
            <DroppableZone id="available-options" isEmpty={false}>
              <div className="flex flex-wrap justify-center gap-3 w-full">
                {availableOptions.map((option) => (
                  <DraggableItem key={option.id} id={option.id}>
                    <span className="text-lg font-medium text-gray-800">
                      {option.value}
                    </span>
                  </DraggableItem>
                ))}
              </div>
            </DroppableZone>
          </div>

          {/* Status Messages */}
          {showError && (
            <div className="text-center mt-6">
              <p className="text-red-600 font-semibold text-lg">
                خطأ! جاري إعادة التعيين...
              </p>
            </div>
          )}

          {isComplete && (
            <div className="text-center mt-6">
              <p className="text-green-600 font-semibold text-xl mb-4">
                أحسنت! الترجمة صحيحة
              </p>
              <Button onClick={resetQuiz} variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                إعادة المحاولة
              </Button>
            </div>
          )}

          <DragOverlay>
            {activeItem && (
              <div className="bg-white border-2 border-green-500 rounded-lg px-4 py-3 shadow-md">
                <span className="text-lg font-medium text-gray-800">
                  {activeItem.value}
                </span>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
