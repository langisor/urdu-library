
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface DraggableWordProps {
  id: string;
  text: string;
  isPlaced?: boolean;
  disabled?: boolean;
}

const DraggableWord: React.FC<DraggableWordProps> = ({
  id,
  text,
  isPlaced = false,
  disabled = false,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled: isPlaced || disabled,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "relative px-6 py-3 text-center rounded-lg cursor-grab border border-transparent transition-all",
        "bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg active:shadow-sm",
        "text-xl font-medium",
        {
          "cursor-grabbing scale-105 z-10 ring-2 ring-blue-400": isDragging,
          "opacity-50 cursor-default": isPlaced,
          "hover:border-blue-300": !isPlaced && !disabled,
          "scale-100": !isDragging,
          "cursor-not-allowed opacity-60": disabled && !isPlaced,
        }
      )}
    >
      {text}
    </div>
  );
};

export default DraggableWord;
