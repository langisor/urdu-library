export interface AudioMetadata {
  generated_from: string
  generated_at: string
  base_path: string
}

export interface RootFile {
  filename: string
  path: string
  type: string
  description: string
}

export interface AudioFile {
  filename: string
  type: "exercise" | "vocabulary" | "general"
  title: string
  exercise_number?: string
  vocabulary_number?: string
}

export interface SoundScriptLesson {
  folder_name: string
  path: string
  files: AudioFile[]
}

export interface SoundScriptStructure {
  folder_name: string
  base_path: string
  lessons: Record<string, SoundScriptLesson>
}

export interface Chapter {
  folder_name: string
  path: string
  files: AudioFile[]
}

export interface Unit {
  folder_name: string
  base_path: string
  chapters: Record<string, Chapter>
}

export interface AudioStructure {
  root_files: RootFile[]
  sound_and_script: SoundScriptStructure
  units: Record<string, Unit>
}

export interface Statistics {
  total_sound_script_lessons: number
  total_units: number
  total_chapters_with_audio: number
  total_exercise_files: number
  total_vocabulary_files: number
  total_audio_files: number
  chapters_by_unit: Record<string, number>
  files_by_type: {
    exercise: number
    vocabulary: number
    general: number
  }
}

export interface QuickAccessUnit {
  unit: number
  total_files: number
}

export interface QuickAccessChapter {
  unit: number
  chapter: number
  exercise_count?: number
  vocabulary_count?: number
}

export interface QuickAccess {
  units_with_most_audio: QuickAccessUnit[]
  chapters_with_most_exercises: QuickAccessChapter[]
  chapters_with_most_vocabulary: QuickAccessChapter[]
}

export interface AudioBookData {
  metadata: AudioMetadata
  structure: AudioStructure
  statistics: Statistics
  quick_access: QuickAccess
}

export type ViewState =
  | { type: "home" }
  | { type: "sound-script" }
  | { type: "sound-script-lesson"; lessonId: string }
  | { type: "units" }
  | { type: "unit"; unitId: string }
  | { type: "chapter"; unitId: string; chapterId: string }
  | { type: "search"; query: string }

export interface CurrentAudio {
  file: AudioFile
  path: string
  context: string
}

export interface QueueItem {
  id: string
  file: AudioFile
  path: string
  context: string
}

export interface AudioQueue {
  items: QueueItem[]
  currentIndex: number
  isShuffled: boolean
  repeatMode: "none" | "one" | "all"
}

export interface AudioPlayerProps {
  currentAudio: CurrentAudio | null
  queue: AudioQueue
  onClose: () => void
  onHomeClick: () => void
  onQueueUpdate: (queue: AudioQueue) => void
  onPlayFromQueue: (index: number) => void
}

export interface SearchResult {
  id: string
  file: AudioFile
  path: string
  context: string
  matchType: "title" | "filename" | "context" | "exercise_number" | "vocabulary_number"
  matchText: string
  relevanceScore: number
  
}

export interface SearchFilters {
  type: "all" | "exercise" | "vocabulary" | "general"
  source: "all" | "sound-script" | "units"
  unit?: string
  lesson?: string
}

export interface SearchComponentProps {
  audioData: AudioBookData
  onPlayAudio: (file: AudioFile, path: string, context: string) => void
  onAddToQueue: (file: AudioFile, path: string, context: string) => void
  onNavigate: (viewState: ViewState) => void
}

export type FileType = "exercise" | "vocabulary" | "general"
