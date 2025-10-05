"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

type UserId = number;

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};
type UserTodos = Map<UserId, Todo[]>;

export default function TodosPage() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  
  React.useEffect(() => {
    const data = async () => {
      const response = await fetch(
        "https://dummyjson.com/todos?limit=10"
      );
      const data = await response.json();
      setTodos(data.todos);
      setLoading(false);
    };
    data();
  }, []);

  if (loading) {
    return <Spinner className="text-blue-500" size={"md"} />;
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Task Manger</h1>
      <Card>
        <CardContent className="grid grid-cols-2 gap-2">
          <TodosList todos={todos} />
           
        </CardContent>
      </Card>
    </div>
  );
}

function TodosList({ todos }: { todos: Todo[] }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        
          {todos.map((task) => (
            <Button className="px-1 py-1" key={task.id}>{task.todo.slice(0, 10)}</Button>
          ))}
      
      </CardContent>
    </Card>
  );
}

 