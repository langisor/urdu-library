import { hookstate, useHookstate, type State } from "@hookstate/core";
import type { UserData } from "./types";

import { getUser } from "@/server/actions/getUser";
import { useEffect } from "react";

const initialState: UserData | null = null;
const fetchUser = async () => {
  const user = await getUser();
  return user;
};

const globalUserStore = useHookstate<UserData | null>(null);
export const userStore = () => {
  

  useEffect(() => {
    const fetchUserData = async () => await fetchUser();
    globalUserStore.set(fetchUserData());
  }, []);

  return globalUserStore;
};
