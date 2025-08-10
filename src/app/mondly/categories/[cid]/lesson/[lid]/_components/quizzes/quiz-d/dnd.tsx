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
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({
    id,
  });
  const style = {
    border: "2px dashed gray",
    transition: "border-color 0.2s ease-in-out",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-4">
      {children}
    </div>
  );
}
