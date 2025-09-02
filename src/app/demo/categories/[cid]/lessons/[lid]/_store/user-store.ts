"use client";
import { hookstate, useHookstate } from "@hookstate/core";
import type { UserData } from "./types";
import { getUser } from "@/server/actions/getUser";
import { useEffect } from "react";

const globalUserStore = hookstate<UserData | null>(null);

export const useUserStore = () => {
  const userState = useHookstate(globalUserStore);
  const fetchUser = async () => {
    const userData = await getUser() as UserData;
    userState.set(userData);
  };
  useEffect(() => {
    fetchUser();
    console.log("userState,value: ", userState.value);    
  }, []);
  const incrementScore = (score: number) => {
    userState.set((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        score: (prevState.score || 0) + score,
      };
    });
  };
  const resetScore = () => {
    userState.set((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        score: 0,
      };
    });
  };
  return {
    incrementScore,
    resetScore,
    getUserScore: () => userState.value?.score || 0,
  };
};
