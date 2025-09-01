"use client"

import { useHookstate } from "@hookstate/core"
import { userStore } from "@/store/user-store"
import type { UserData } from "@/store/types"

// Custom hook for using user state in components
export function useUser() {
  const state = userStore()

  return {
    // Current user data
    user: state.get(),

    // Loading state (you can extend this based on your needs)
    isLoading: false,

    // Authentication status
    isLoggedIn: state.get() !== null,

    // User role
    userRole: state.get()?.role || null,

    // Actions
    setUser: (userData: UserData) => userStore().set(userData),
    updateUser: (updates: Partial<UserData>) => {
      state.set(prevState => {
        if (!prevState) return null;
        return { ...prevState, ...updates };
      });
    },
    clearUser: () => userStore().set(null),
    hasRole: (role: string) => userStore().get()?.role === role,
    updateScore: (score: number) => userStore().set((state) => {
      if (!state) return null;
      return { ...state, score: state.score + score };
    }),
  }
}
