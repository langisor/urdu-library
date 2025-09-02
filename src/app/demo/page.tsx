"use client";
import * as React from "react";
import { useHookstate } from "@hookstate/core";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MondlyPage() {
  const { data, error, isLoading } = useSWR("/api/user", fetcher);

  return <div>{JSON.stringify(data)}</div>;
}
