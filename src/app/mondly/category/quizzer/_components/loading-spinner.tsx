"use client";

import * as React from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

// 1. Define the TypeScript interface for the component's props.
// This clearly states that 'onNext' must be a function that
// takes no arguments and returns nothing (void).
interface SpinnerProps {
  onNext: () => void;
  time: number;
}

// 2. Apply the interface to the component function using React.FC (Function Component).
export const LoadingSpinner: React.FC<SpinnerProps> = ({
  onNext,
  time = 1000,
}) => {
  React.useEffect(() => {
    const delay = time; // 3 seconds

    console.log("Spinner mounted. Starting 3-second delay...");

    // Store the timer ID, which is a number in Node.js/Browser environments
    // The type for the return of setTimeout is often a 'NodeJS.Timeout' or just 'number' in browser,
    // but using 'any' for the initial assignment is safer here if you aren't using specific environment types.
    // For a cleaner browser-based context, it can be defined as 'number'.
    const timerId = setTimeout(() => {
      console.log("Delay finished. Calling onNext.");
      // onNext is guaranteed to be a function thanks to the SpinnerProps interface
      onNext();
    }, delay);

    // 3. Cleanup function: We use clearTimeout on the timerId.
    return () => {
      clearTimeout(timerId);
      console.log("Spinner unmounted or effect cleanup.");
    };
  }, [onNext,time]); // Dependency array includes the function

  return <Spinner className="text-blue-400" />;
};
