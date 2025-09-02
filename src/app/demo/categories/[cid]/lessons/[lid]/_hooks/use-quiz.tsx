"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useQuiz({qid}: {qid: number}) {
  const { data, isLoading, error } = useSWR(`/api/q?qid=${qid}`, fetcher);
  return { quiz: data, isLoading, error };
}
