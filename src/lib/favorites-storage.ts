import type {
  FavoriteItem,
  LocalStorageData,
  FavoritesError,
} from "@/types/favorites";

const STORAGE_KEY = "audio-navigator-favorites";
const STORAGE_VERSION = "1.0.0";

export class FavoritesStorageError extends Error {
  constructor(
    public readonly type: FavoritesError,
    message: string,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = "FavoritesStorageError";
  }
}

export const favoritesStorage = {
  // Check if localStorage is available

  isStorageAvailable(): boolean {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  // Load favorites from localStorage
  loadFavorites(): FavoriteItem[] {
    try {
      if (!this.isStorageAvailable()) {
        throw new FavoritesStorageError(
          "STORAGE_NOT_AVAILABLE",
          "localStorage is not available"
        );
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return [];
      }

      const data: LocalStorageData = JSON.parse(stored);

      // Validate data structure
      if (!this.isValidStorageData(data)) {
        console.warn("Invalid favorites data format, resetting to empty array");
        this.saveFavorites([]);
        return [];
      }

      // Migration logic for future versions can go here
      if (data.version !== STORAGE_VERSION) {
        console.info(
          `Migrating favorites from version ${data.version} to ${STORAGE_VERSION}`
        );
        // For now, just update the version
        data.version = STORAGE_VERSION;
        this.saveFavorites(data.favorites);
      }

      return data.favorites;
    } catch (error) {
      if (error instanceof FavoritesStorageError) {
        throw error;
      }

      if (error instanceof SyntaxError) {
        throw new FavoritesStorageError(
          "INVALID_DATA_FORMAT",
          "Failed to parse favorites data",
          error
        );
      }

      throw new FavoritesStorageError(
        "UNKNOWN_ERROR",
        "Failed to load favorites",
        error as Error
      );
    }
  },

  // Save favorites to localStorage
  saveFavorites(favorites: FavoriteItem[]): void {
    try {
      if (!this.isStorageAvailable()) {
        throw new FavoritesStorageError(
          "STORAGE_NOT_AVAILABLE",
          "localStorage is not available"
        );
      }

      const data: LocalStorageData = {
        favorites,
        version: STORAGE_VERSION,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      if (error instanceof FavoritesStorageError) {
        throw error;
      }

      // Check for quota exceeded error
      if (error instanceof DOMException && error.code === 22) {
        throw new FavoritesStorageError(
          "QUOTA_EXCEEDED",
          "Storage quota exceeded",
          error
        );
      }

      throw new FavoritesStorageError(
        "UNKNOWN_ERROR",
        "Failed to save favorites",
        error as Error
      );
    }
  },

  // Clear all favorites from localStorage
  clearFavorites(): void {
    try {
      if (!this.isStorageAvailable()) {
        throw new FavoritesStorageError(
          "STORAGE_NOT_AVAILABLE",
          "localStorage is not available"
        );
      }

      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      throw new FavoritesStorageError(
        "UNKNOWN_ERROR",
        "Failed to clear favorites",
        error as Error
      );
    }
  },
  // Validate storage data structure
  isValidStorageData(data: unknown): data is LocalStorageData {
    if (!data || typeof data !== "object") {
      return false;
    }

    const obj = data as Record<string, unknown>;

    if (typeof obj.version !== "string") {
      return false;
    }

    if (!Array.isArray(obj.favorites)) {
      return false;
    }

    // Validate each favorite item
    return obj.favorites.every((item) => this.isValidFavoriteItem(item));
  },

  // Validate individual favorite item
  isValidFavoriteItem(item: unknown): item is FavoriteItem {
    if (!item || typeof item !== "object") {
      return false;
    }

    const obj = item as Record<string, unknown>;

    return (
      typeof obj.id === "string" &&
      typeof obj.path === "string" &&
      typeof obj.context === "string" &&
      typeof obj.addedAt === "number" &&
      (obj.lastPlayedAt === undefined ||
        typeof obj.lastPlayedAt === "number") &&
      this.isValidAudioFile(obj.file)
    );
  },

  // Validate audio file structure
  isValidAudioFile(file: unknown): boolean {
    if (!file || typeof file !== "object") {
      return false;
    }

    const obj = file as Record<string, unknown>;

    return (
      typeof obj.filename === "string" &&
      typeof obj.title === "string" &&
      ["exercise", "vocabulary", "general"].includes(obj.type as string) &&
      (obj.exercise_number === undefined ||
        typeof obj.exercise_number === "string") &&
      (obj.vocabulary_number === undefined ||
        typeof obj.vocabulary_number === "string")
    );
  },
};
