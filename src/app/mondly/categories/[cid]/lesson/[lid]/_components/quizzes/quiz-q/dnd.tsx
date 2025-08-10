"use client"
import {useDroppable, useDraggable} from "@dnd-kit/core"

export function DroppableZone({
 id,
 children,
 isEmpty,
 isCorrect,
 onClick,
 isClickable,
}: {
 id: string
 children?: React.ReactNode
 isEmpty: boolean
 isCorrect?: boolean
 onClick?: () => void
 isClickable?: boolean
}) {
 const { setNodeRef, isOver } = useDroppable({
   id,
 })

 return (
   <div
     ref={setNodeRef}
     onClick={onClick}
     className={`
       min-h-[40px] min-w-[60px] rounded-lg border-2 border-dashed 
       flex items-center justify-center p-4 transition-all duration-200
       ${
         isEmpty
           ? `border-gray-300 bg-gray-50 ${isOver ? "border-blue-400 bg-blue-50" : ""} ${
               isClickable ? "cursor-pointer hover:border-blue-400 hover:bg-blue-50" : ""
             }`
           : isCorrect
             ? "border-green-400 bg-green-50"
             : "border-red-400 bg-red-50"
       }
     `}
   >
     {children}
   </div>
 )
}

export function DraggableItem({
 id,
 children,
 isMatched,
 onClick,
 isSelected,
}: {
 id: string
 children: React.ReactNode
 isMatched?: boolean
 onClick?: () => void
 isSelected?: boolean
}) {
 const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
   id,
   disabled: isMatched,
 })

 return (
   <div
     ref={setNodeRef}
     {...listeners}
     {...attributes}
     onClick={onClick}
     className={`
       bg-white border-2 rounded-lg px-4 py-3 shadow-sm
       transition-all duration-200 hover:shadow-md
       ${
         isMatched
           ? "border-green-500 bg-green-50 cursor-default opacity-75"
           : isSelected
             ? "border-orange-500 bg-orange-50 cursor-pointer ring-2 ring-orange-300"
             : "border-blue-500 cursor-grab active:cursor-grabbing hover:border-blue-600"
       }
       ${isDragging ? "opacity-50" : "opacity-100"}
       touch-manipulation
     `}
     style={{ touchAction: "none" }}
   >
     {children}
   </div>
 )
}