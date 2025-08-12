"use client";
import { useLessons } from "@/app/mondly/categories/[cid]/_hooks/use-lessons";

export default function Demo() {
  const { lessons, isLoading, error } = useLessons(1);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>Demo</h1>
      <pre className="text-left" dir="ltr">
        {JSON.stringify(lessons, null, 2)}
      </pre>
    </div>
  );
}
