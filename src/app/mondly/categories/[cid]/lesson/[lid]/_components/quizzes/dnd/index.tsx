"use client";
import { useDraggable, useDroppable } from "@dnd-kit/core";



export function DraggableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        bg-white border-2 border-green-500 rounded-lg px-4 py-3 
        cursor-grab active:cursor-grabbing shadow-sm
        transition-all duration-200 hover:shadow-md
        ${isDragging ? "opacity-50" : "opacity-100"}
        touch-manipulation
      `}
      style={{ touchAction: "none" }}
    >
      {children}
    </div>
  );
}

export function DroppableZone({
  id,
  children,
  isEmpty,
}: {
  id: string;
  children?: React.ReactNode;
  isEmpty?: boolean;
}) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[60px] min-w-[120px] rounded-lg border-2 border-dashed 
        flex items-center justify-center p-3 transition-colors
        ${
          isEmpty
            ? "border-gray-300 bg-gray-50"
            : "border-green-300 bg-green-50"
        }
      `}
    >
      {children}
    </div>
  );
}