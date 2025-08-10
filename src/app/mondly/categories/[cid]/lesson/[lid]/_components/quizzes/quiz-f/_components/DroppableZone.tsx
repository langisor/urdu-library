;
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { getImageUrl } from "./utils";
import { cn } from "@/lib/utils";

interface DroppableZoneProps {
  id: string;
  children?: React.ReactNode;
  placedItemId: string | null;
  imgSrc?: string;
  altText?: string;
  label?: string;
  imageUpdatedAt?: number;
}

const DroppableZone: React.FC<DroppableZoneProps> = ({
  id,
  children,
  placedItemId,
  imgSrc,
  altText = "Quiz image",
  label,
  imageUpdatedAt,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled: !!placedItemId,
  });

  const hasItem = !!placedItemId;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={setNodeRef}
        className={cn(
          "relative flex items-center justify-center",
          "w-full h-44 rounded-lg overflow-hidden transition-all duration-200",
          "border-2",
          {
            "border-dashed border-gray-300": !hasItem && !isOver,
            "border-blue-400 ring-2 ring-blue-300 shadow-lg": isOver,
            "border-green-500": hasItem,
          }
        )}
      >
        {imgSrc && imageUpdatedAt && (
          <img
            src={getImageUrl(imgSrc, imageUpdatedAt)}
            alt={altText}
            className="w-full h-full object-cover"
          />
        )}

        {!hasItem && !isOver && !children && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="text-white font-medium">Drop here</span>
          </div>
        )}

        {children}
      </div>

      {label && (
        <div className="text-center text-sm font-medium text-gray-700">
          {label}
        </div>
      )}
    </div>
  );
};

export default DroppableZone;
