"use client";
import * as React from "react";
import { useHookstate } from "@hookstate/core";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MondlyPage() {
  const { data, error, isLoading } = useSWR(`api/user?uId=2`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
