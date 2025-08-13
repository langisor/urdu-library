
import React, { useState, useMemo } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizItem } from "./utils";
import QuizGrid from "./QuizGrid";
import DraggableWord from "./DraggableWord";
import { Check } from "lucide-react";

interface QuizQuestionProps {
  quiz: QuizItem;
  onComplete: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ quiz, onComplete }) => {
  const [placements, setPlacements] = useState<Record<string, string | null>>(
    {}
  );
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  // Initialize placements state
  useMemo(() => {
    const initialPlacements: Record<string, string | null> = {};
    quiz.sols.forEach((sol) => {
      initialPlacements[`drop-${sol.key}`] = null;
    });
    setPlacements(initialPlacements);
  }, [quiz.id]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);

    if (over) {
      const dropKey = over.id.toString().replace("drop-", "");
      const dragKey = active.id.toString();

      if (dropKey === dragKey) {
        setPlacements((prev) => ({
          ...prev,
          [over.id.toString()]: active.id.toString(),
        }));
      } else {
        // Handle incorrect placement
        handleIncorrectPlacement();
      }
    }
  };

  const handleIncorrectPlacement = () => {
    resetQuiz();
  };

  const resetQuiz = () => {
    const resetPlacements: Record<string, string | null> = {};
    Object.keys(placements).forEach((key) => {
      resetPlacements[key] = null;
    });
    setPlacements(resetPlacements);
    setIsCorrect(null);
  };

  const isComplete = Object.values(placements).every(
    (placement) => placement !== null
  );
  const isDragging = activeDragId !== null;
  const activeWord = useMemo(() => {
    if (!activeDragId) return null;
    return quiz.sols.find((sol) => sol.key === activeDragId);
  }, [activeDragId, quiz.sols]);

  return (
    <Card className="w-full max-w-3xl bg-white">
      <CardHeader className="text-center border-b">
        <CardTitle className="text-xl md:text-2xl text-right rtl">
          انقل الكلمة إلى الإجابة الصحيحة:
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <QuizGrid
            options={quiz.alts}
            solutions={quiz.sols}
            placements={placements}
            isDragging={isDragging}
            onIncorrectPlacement={handleIncorrectPlacement}
          />

          <DragOverlay>
            {activeWord && (
              <DraggableWord id={activeWord.key} text={activeWord.text} />
            )}
          </DragOverlay>
        </DndContext>

        {isComplete && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700 px-8 py-6 text-lg"
            >
              <Check className="mr-2 h-5 w-5" />
              Continue
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
