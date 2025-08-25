"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@/components/ui/label";
import AddTask from "./_components/add-task";
interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onChangeTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask,
}: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

interface TaskProps {
  task: Task;
  onChange: (task: Task) => void;
  onDelete: (id: number) => void;
}
function Task({ task, onChange, onDelete }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckedChange = (checked: boolean) => {
    onChange({
      ...task,
      done: checked,
    });
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };
  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <Input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <Button onClick={() => setIsEditing(false)}>Save</Button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </>
    );
  }
  return (
    <>
      <Label htmlFor="task-checkbox">{taskContent}</Label>
      <Checkbox
        checked={task.done}
        id="task-checkbox"
        onCheckedChange={handleCheckedChange}
      />
      <Button onClick={handleDeleteClick}>Delete</Button>
    </>
  );
}

