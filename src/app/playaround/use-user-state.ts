"use client";

import { hookstate, useHookstate } from '@hookstate/core';
import { UserData, UserState } from './types';

// Global state
const globalUserState = hookstate<UserState>({
 data: null,
 loading: false,
 error: null,
});

export const useUserState = () => {
 const state = useHookstate(globalUserState);

 const fetchUser = async () => {
  state.loading.set(true);
  state.error.set(null);

  try {
   const response = await fetch('/api/user');

   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
   }

   const userData: UserData = await response.json();
   state.data.set(userData);
  } catch (error) {
   const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user data';
   state.error.set(errorMessage);
   state.data.set(null);
  } finally {
   state.loading.set(false);
  }
 };

 const updateUser = (userData: Partial<UserData>) => {
  if (state.data.get()) {
   state.data.merge(userData);
  }
 };

 const clearUser = () => {
  state.data.set(null);
  state.error.set(null);
 };

 const refetchUser = () => {
  return fetchUser();
 };

 return {
  // State values
  user: state.data.get(),
  loading: state.loading.get(),
  error: state.error.get(),

  // Actions
  fetchUser,
  updateUser,
  clearUser,
  refetchUser,
 };
};