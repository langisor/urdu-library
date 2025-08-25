"use client"

import { useState } from 'react';
interface Task {
  id: number;
  text: string;
  done: boolean;
}
export default function Task({ task, onChange, onDelete }: { task: Task; onChange: (task: Task) => void; onDelete: (id: number) => void }) {
 const [isEditing, setIsEditing] = useState(false);
 let taskContent;
 if (isEditing) {
   taskContent = (
     <>
       <input
         value={task.text}
         onChange={e => {
           onChange({
             ...task,
             text: e.target.value
           });
         }} />
       <button onClick={() => setIsEditing(false)}>
         Save
       </button>
     </>
   );
 } else {
   taskContent = (
     <>
       {task.text}
       <button onClick={() => setIsEditing(true)}>
         Edit
       </button>
     </>
   );
 }
 return (
   <label>
     <input
       type="checkbox"
       checked={task.done}
       onChange={e => {
         onChange({
           ...task,
           done: e.target.checked
         });
       }}
     />
     {taskContent}
     <button onClick={() => onDelete(task.id)}>
       Delete
     </button>
   </label>
 );
}
