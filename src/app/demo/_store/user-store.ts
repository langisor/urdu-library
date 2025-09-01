"use client";
import { hookstate } from "@hookstate/core";
import type { UserData } from "./types";
import { getUser } from "@/server/actions/getUser";
import { useEffect } from "react";

const fetchUser = async (): Promise<UserData | null> => {
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

const globalUserStore = hookstate<UserData | null>(null);

export const useUserStore = () => {
  useEffect(() => {
    const loadUser = async () => {
      const user = await fetchUser();
      globalUserStore.set(user);
    };
    loadUser();
  }, []);

  return globalUserStore;
};
