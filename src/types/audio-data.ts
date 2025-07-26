import type React from "react";
import type { FavoritesHookReturn } from "@/types/favorites";
export interface AudioMetadata {
  generated_from: string;
  generated_at: string;
  base_path: string;
}

export interface RootFile {
  filename: string;
  path: string;
  type: string;
  description: string;
}

export interface AudioFile {
  filename: string;
  type: "exercise" | "vocabulary" | "general";
  title: string;
  exercise_number?: string;
  vocabulary_number?: string;
}

export interface SoundScriptLesson {
  folder_name: string;
  path: string;
  files: AudioFile[];
}

export interface SoundScriptStructure {
  folder_name: string;
  base_path: string;
  lessons: Record<string, SoundScriptLesson>;
}

export interface Chapter {
  folder_name: string;
  path: string;
  files: AudioFile[];
}

export interface Unit {
  folder_name: string;
  base_path: string;
  chapters: Record<string, Chapter>;
}

export interface AudioStructure {
  root_files: RootFile[];
  sound_and_script: SoundScriptStructure;
  units: Record<string, Unit>;
}

export interface Statistics {
  total_sound_script_lessons: number;
  total_units: number;
  total_chapters_with_audio: number;
  total_exercise_files: number;
  total_vocabulary_files: number;
  total_audio_files: number;
  chapters_by_unit: Record<string, number>;
  files_by_type: {
    exercise: number;
    vocabulary: number;
    general: number;
  };
}

export interface QuickAccessUnit {
  unit: number;
  total_files: number;
}

export interface QuickAccessChapter {
  unit: number;
  chapter: number;
  exercise_count?: number;
  vocabulary_count?: number;
}

export interface QuickAccess {
  units_with_most_audio: QuickAccessUnit[];
  chapters_with_most_exercises: QuickAccessChapter[];
  chapters_with_most_vocabulary: QuickAccessChapter[];
}

export interface AudioBookData {
  metadata: AudioMetadata;
  structure: AudioStructure;
  statistics: Statistics;
  quick_access: QuickAccess;
}

export type ViewState =
  | { type: "home" }
  | { type: "sound-script" }
  | { type: "sound-script-lesson"; lessonId: string }
  | { type: "units" }
  | { type: "unit"; unitId: string }
  | { type: "chapter"; unitId: string; chapterId: string }
  | { type: "search"; query: string }
  | { type: "favorites" };

export interface CurrentAudio {
  file: AudioFile;
  path: string;
  context: string;
}

export interface AudioPlayerProps {
  currentAudio: CurrentAudio | null;
  onClose: () => void;
  onHomeClick: () => void;
}

export interface SearchResult {
  id: string;
  file: AudioFile;
  path: string;
  context: string;
  matchType:
    | "title"
    | "filename"
    | "context"
    | "exercise_number"
    | "vocabulary_number";
  matchText: string;
  relevanceScore: number;
}

export interface SearchFilters {
  type: "all" | "exercise" | "vocabulary" | "general";
  source: "all" | "sound-script" | "units";
  unit?: string;
  lesson?: string;
}

export interface SearchComponentProps {
  audioData: AudioBookData;
  onPlayAudio: (file: AudioFile, path: string, context: string) => void;
  onNavigate: (viewState: ViewState) => void;
}

// Additional types for strong typing
export type FileTypeColor = "default" | "secondary" | "outline";
export type KeyboardEventCode =
  | "Space"
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "ArrowDown"
  | "Escape"
  | "KeyH"
  | "Slash";
export type MatchType = SearchResult["matchType"];

// Event handler types
export type KeyboardEventHandler = (event: KeyboardEvent) => void;

export type ClickEventHandler = (event: React.MouseEvent) => void;

export type ChangeEventHandler = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type SelectChangeHandler = (value: string) => void;

// Component state types
export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

export interface SearchState {
  query: string;
  filters: SearchFilters;
  showFilters: boolean;
}

export interface AppState {
  viewState: ViewState;
  currentAudio: CurrentAudio | null;
  searchQuery: string;
  showKeyboardHelp: boolean;
  favorites: FavoritesHookReturn;
}

export interface PTLesson {
  id: string;
  title: string;
}

export interface AppContextType {
  favorites: FavoritesHookReturn;
}