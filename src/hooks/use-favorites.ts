"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type {
  FavoriteItem,
  FavoritesHookReturn,
  FavoritesSortOption,
  FavoritesState,
} from "@/types/favorites";
import {
  favoritesStorage,
  FavoritesStorageError,
} from "@/lib/favorites-storage";

export function useFavorites(): FavoritesHookReturn {
  const [state, setState] = useState<FavoritesState>({
    items: [],
    isLoading: true,
    error: null,
  });

  // Generate unique ID for favorite items
  const generateId = useCallback((filename: string, path: string): string => {
    return `${filename}-${path}-${Date.now()}`;
  }, []);

  // Load favorites on mount
  useEffect(() => {
    const loadFavorites = async (): Promise<void> => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const favorites = favoritesStorage.loadFavorites();
        setState({
          items: favorites,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage =
          error instanceof FavoritesStorageError
            ? `Failed to load favorites: ${error.message}`
            : "Unknown error occurred while loading favorites";

        setState({
          items: [],
          isLoading: false,
          error: errorMessage,
        });

        console.error("Failed to load favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  // Save favorites to storage whenever items change
  const saveFavorites = useCallback((items: FavoriteItem[]): void => {
    try {
      favoritesStorage.saveFavorites(items);
      setState((prev) => ({ ...prev, error: null }));
    } catch (error) {
      const errorMessage =
        error instanceof FavoritesStorageError
          ? `Failed to save favorites: ${error.message}`
          : "Unknown error occurred while saving favorites";

      setState((prev) => ({ ...prev, error: errorMessage }));
      console.error("Failed to save favorites:", error);
    }
  }, []);

  // Add item to favorites
  const addToFavorites = useCallback(
    (item: Omit<FavoriteItem, "id" | "addedAt">): void => {
      const newItem: FavoriteItem = {
        ...item,
        id: generateId(item.file.filename, item.path),
        addedAt: Date.now(),
      };

      setState((prev) => {
        // Check if item already exists
        const exists = prev.items.some(
          (existing) =>
            existing.file.filename === item.file.filename &&
            existing.path === item.path
        );

        if (exists) {
          return prev; // Don't add duplicates
        }

        const newItems = [...prev.items, newItem];
        saveFavorites(newItems);
        return { ...prev, items: newItems };
      });
    },
    [generateId, saveFavorites]
  );

  // Remove item from favorites
  const removeFromFavorites = useCallback(
    (id: string): void => {
      setState((prev) => {
        const newItems = prev.items.filter((item) => item.id !== id);
        saveFavorites(newItems);
        return { ...prev, items: newItems };
      });
    },
    [saveFavorites]
  );

  // Check if item is in favorites
  const isFavorite = useCallback(
    (filename: string, path: string): boolean => {
      return state.items.some(
        (item) => item.file.filename === filename && item.path === path
      );
    },
    [state.items]
  );

  // Get favorite by ID
  const getFavoriteById = useCallback(
    (id: string): FavoriteItem | undefined => {
      return state.items.find((item) => item.id === id);
    },
    [state.items]
  );

  // Clear all favorites
  const clearAllFavorites = useCallback((): void => {
    try {
      favoritesStorage.clearFavorites();
      setState((prev) => ({ ...prev, items: [], error: null }));
    } catch (error) {
      const errorMessage =
        error instanceof FavoritesStorageError
          ? `Failed to clear favorites: ${error.message}`
          : "Unknown error occurred while clearing favorites";

      setState((prev) => ({ ...prev, error: errorMessage }));
      console.error("Failed to clear favorites:", error);
    }
  }, []);

  // Update last played timestamp
  const updateLastPlayed = useCallback(
    (id: string): void => {
      setState((prev) => {
        const newItems = prev.items.map((item) =>
          item.id === id ? { ...item, lastPlayedAt: Date.now() } : item
        );
        saveFavorites(newItems);
        return { ...prev, items: newItems };
      });
    },
    [saveFavorites]
  );

  // Get sorted favorites
  const getFavoritesSortedBy = useCallback(
    (sortBy: FavoritesSortOption): FavoriteItem[] => {
      const items = [...state.items];

      switch (sortBy) {
        case "recent":
          return items.sort((a, b) => {
            const aTime = a.lastPlayedAt || a.addedAt;
            const bTime = b.lastPlayedAt || b.addedAt;
            return bTime - aTime;
          });

        case "alphabetical":
          return items.sort((a, b) => a.file.title.localeCompare(b.file.title));

        case "type":
          return items.sort((a, b) => {
            if (a.file.type === b.file.type) {
              return a.file.title.localeCompare(b.file.title);
            }
            return a.file.type.localeCompare(b.file.type);
          });

        case "context":
          return items.sort((a, b) => {
            if (a.context === b.context) {
              return a.file.title.localeCompare(b.file.title);
            }
            return a.context.localeCompare(b.context);
          });

        default:
          return items;
      }
    },
    [state.items]
  );

  // Memoized return value
  const returnValue: FavoritesHookReturn = useMemo(
    () => ({
      ...state,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      getFavoriteById,
      clearAllFavorites,
      updateLastPlayed,
      getFavoritesSortedBy,
    }),
    [
      state,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      getFavoriteById,
      clearAllFavorites,
      updateLastPlayed,
      getFavoritesSortedBy,
    ]
  );

  return returnValue;
}
