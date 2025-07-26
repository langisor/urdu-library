export interface FavoriteItem {
  id: string
  file: {
    filename: string
    type: "exercise" | "vocabulary" | "general"
    title: string
    exercise_number?: string
    vocabulary_number?: string
  }
  path: string
  context: string
  addedAt: number // timestamp
  lastPlayedAt?: number // timestamp
}

export interface FavoritesState {
  items: FavoriteItem[]
  isLoading: boolean
  error: string | null
}

export interface FavoritesActions {
  addToFavorites: (item: Omit<FavoriteItem, "id" | "addedAt">) => void
  removeFromFavorites: (id: string) => void
  isFavorite: (filename: string, path: string) => boolean
  getFavoriteById: (id: string) => FavoriteItem | undefined
  clearAllFavorites: () => void
  updateLastPlayed: (id: string) => void
  getFavoritesSortedBy: (sortBy: FavoritesSortOption) => FavoriteItem[]
}

export type FavoritesSortOption = "recent" | "alphabetical" | "type" | "context"

export interface FavoritesHookReturn extends FavoritesState, FavoritesActions {}

export interface FavoritesComponentProps {
  onPlayAudio: (file: FavoriteItem["file"], path: string, context: string) => void
  onNavigate: (viewState: import("./audio-data").ViewState) => void
}

export interface FavoriteItemComponentProps {
  item: FavoriteItem
  onPlay: () => void
  onRemove: () => void
  onNavigate: () => void
}

// Local storage types
export interface LocalStorageData {
  favorites: FavoriteItem[]
  version: string
}

// Error types
export type FavoritesError = "STORAGE_NOT_AVAILABLE" | "INVALID_DATA_FORMAT" | "QUOTA_EXCEEDED" | "UNKNOWN_ERROR"

export type FileTypeColor = "default" | "secondary" | "outline"
