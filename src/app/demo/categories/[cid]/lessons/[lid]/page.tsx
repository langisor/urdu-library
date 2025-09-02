"use client";
import { useLesson } from "./_hooks/use-lesson";
import * as React from "react";
import { Quizzer } from "./_components/quizzer";
import { useParams } from "next/navigation";
export default function LessonQuizzes() {
  const params = useParams();
  const { lesson, isLoading, error } = useLesson(Number(params.lid));
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <CountDown />
      
      <Quizzer quizzesIDs={lesson.quizzesIDs as number[]} />
    </div>
  );
}

function CountDown() {
  const [count, setCount] = React.useState(3);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Hide the component when countdown reaches 0
      setIsVisible(false);
    }
  }, [count]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-2xl">
        <div className="text-6xl font-bold text-center text-primary animate-pulse">
          {count}
        </div>
      </div>
    </div>
  );
}
