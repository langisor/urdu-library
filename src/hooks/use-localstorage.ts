"use client";
import { useState } from "react";

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // Get from local storage then parse
  const getStoredValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue: SetValue<T> = (value) => {
    try {
      // Allow value to be a function like in useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
