"use client"
import * as React from "react";
import { useHookstate } from "@hookstate/core";

type UserData = {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    score: number;
  };
const fetcher = (url: string) => fetch(url).then((res) => res.json());


const fetchUser = () => fetcher(`http://localhost:3000/api/user?uId=1`);
export function useUser() {
    const userState = useHookstate<UserData>(() => fetchUser());
  return {
  
    userState: userState
  }
}
    