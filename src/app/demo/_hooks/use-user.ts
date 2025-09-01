"use client";
import { useUserStore } from "@/app/demo/_store/user-store"
import type { UserData } from "@/app/demo/_store/types"

// Custom hook for using user state in components
export function useUser() {
  const state = useUserStore()
  const user = state.get()
 
  return {
    // Current user data
    user,

    // Loading state (you can extend this based on your needs)
    isLoading: false,

    // Authentication status
    isLoggedIn: user !== null,

    // User role
    userRole: user?.role || null,

    // Actions
    setUser: (userData: UserData | null) => state.set(userData),
    updateUser: (updates: Partial<UserData>) => {
      state.set(prevState => {
        if (!prevState) return null;
        return { ...prevState, ...updates } as UserData;
      });
    },
    clearUser: () => state.set(null),
    hasRole: (role: string) => user?.role === role,
    updateScore: (score: number) => {
      state.set(prevState => {
        if (!prevState) return null;
        return { ...prevState, score: (prevState.score || 0) + score } as UserData;
      });
    },
  }
}
