"use client";
import useSWR from "swr";
import { LessonItem } from "@/app/mondly/_types/data-services";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLesson(_lid: number) {
  const { data, isLoading, error } = useSWR<LessonItem>(
    `/api/l?lid=${_lid}`,
    fetcher
  );
  if (isLoading) {
    console.log("Loading...");
  }
  if (error) {
    console.log("Error:", error);
  }

  return {
    lesson: {
      id: data?.id,
      name: data?.name,
      categoryID: data?.categoryID,
      countPhrases: data?.countPhrases,
      countWords: data?.countWords,
      countQuiz: data?.countQuiz,
      quizzesIDs: data?.quizzes,
    } as {
      id: number;
      name: string;
      categoryID: number;
      countPhrases: number;
      countWords: number;
      countQuiz: number;
      quizzesIDs: number[];
    },
    isLoading,
    error,
  };
}
