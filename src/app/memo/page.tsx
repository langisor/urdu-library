"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const ParentComponent: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const [inputVal, setInputVal] = React.useState("");
  const [isToggled, setIsToggled] = React.useState(false);

  // ❌ Without useCallback: handleButtonClick would be a new function on every render,
  //    forcing MemoizedButton to re-render even if 'count' hasn't changed.

  // ✅ With useCallback: The function definition is memoized. It only changes
  //    when 'count' (its dependency) changes.
  const handleButtonClick = React.useCallback(
    (buttonLabel: string) => {
      setCount((c) => c + 1);
      console.log(`handleButtonClick : Button ${buttonLabel} clicked. New count: ${count + 1}`);
    }, [count]
  ); // Dependency: The count state, since it's used inside setCount (though here c=>c+1 is safer)
   const handleToggleClick = (buttonLabel: string) => {
     setIsToggled((prev) => !prev);
     console.log(`handleToggleClick : Button ${buttonLabel} clicked. New count: ${count + 1}`);
   }
   
   // fetch('https://dummyjson.com/todos/user/1?limit=5')
   
  return (
    <div>
      <input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        placeholder="Typing causes re-render"
      />
      <p>Current Count: {count}</p>
      <Card>
        <CardContent className="flex flex-col gap-2 max-w-md">
          <MemoizedButton label="Increment- Memoized Button using useCallback" onClick={handleButtonClick} />
          <ToggleButton label="Toggle- Toggle Button" onClick={handleToggleClick} />
        </CardContent>
      </Card>
    </div>
  );
};


// 1. Child component wrapped in React.memo for optimization
interface ButtonProps {
 onClick: (value: string) => void;
 label: string;
}

// React.memo ensures this component only re-renders if its props change (shallow comparison)
const MemoizedButton = React.memo<ButtonProps>(({ onClick, label }) => {
 console.log(`Child: Rendering ${label} Button`);
 return <Button onClick={() => onClick(label)}>{label}</Button>;
});
 
interface   ToggleButtonProps {
 onClick: (value: string) => void;
 label: string;
}
function ToggleButton({ onClick, label }: ToggleButtonProps) {
 console.log(`Child: Rendering ${label} Button`);
 return <Button onClick={() => onClick(label)}>{label}</Button>;
}

export default ParentComponent;

