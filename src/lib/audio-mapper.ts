// Audio file mapping utility
export interface AudioFile {
  filename: string
  type: "exercise" | "vocabulary"
  number: string
  title: string
  path: string
}

export interface LessonAudio {
  lessonId: string
  exercises: AudioFile[]
  vocabulary: AudioFile[]
}

// Parse filename to extract information
export const parseAudioFilename = (filename: string): AudioFile | null => {
  // Remove .mp3 extension
  const nameWithoutExt = filename.replace(".mp3", "")

  // Pattern for unit chapters: Pien7788_U01Ch01Ex01 or Pien7788_U01Ch01V01
  const unitChapterMatch = nameWithoutExt.match(/Pien7788_U(\d+)Ch(\d+)(Ex|V)(.+)/)
  if (unitChapterMatch) {
    const [, unit, chapter, type, number] = unitChapterMatch
    return {
      filename,
      type: type === "Ex" ? "exercise" : "vocabulary",
      number: number,
      title: `${type === "Ex" ? "Exercise" : "Vocabulary"} ${number}`,
      path: `/media/audio-all/Unit ${unit} Audio/Chapter${chapter}/${filename}`,
    }
  }

  // Pattern for sound and script lessons: Pien7788_SSL01Ex01
  const sslMatch = nameWithoutExt.match(/Pien7788_SSL(\d+)Ex(\d+)/)
  if (sslMatch) {
    const [, lesson, exercise] = sslMatch
    return {
      filename,
      type: "exercise",
      number: exercise,
      title: `Exercise ${exercise}`,
      path: `/media/audio-all/Sound and Script/Lesson${lesson}/${filename}`,
    }
  }

  return null
}

// Map audio files to lessons/chapters based on the file structure
export const getAudioForLesson = (unitNumber?: number, chapterNumber?: number, lessonNumber?: number): LessonAudio => {
  const exercises: AudioFile[] = []
  const vocabulary: AudioFile[] = []

  // This would normally read from the actual file system or a pre-generated manifest
  // For now, I'll create a mapping based on the tree structure provided

  if (unitNumber && chapterNumber) {
    // Unit chapter audio files
    const audioFiles = getUnitChapterAudioFiles(unitNumber, chapterNumber)
    audioFiles.forEach((file) => {
      const parsed = parseAudioFilename(file)
      if (parsed) {
        if (parsed.type === "exercise") {
          exercises.push(parsed)
        } else {
          vocabulary.push(parsed)
        }
      }
    })
  } else if (lessonNumber) {
    // Sound and script lesson audio files
    const audioFiles = getSoundScriptLessonAudioFiles(lessonNumber)
    audioFiles.forEach((file) => {
      const parsed = parseAudioFilename(file)
      if (parsed) {
        exercises.push(parsed)
      }
    })
  }

  return {
    lessonId: unitNumber ? `unit-${unitNumber}-chapter-${chapterNumber}` : `lesson-${lessonNumber}`,
    exercises: exercises.sort((a, b) => a.number.localeCompare(b.number)),
    vocabulary: vocabulary.sort((a, b) => a.number.localeCompare(b.number)),
  }
}

// Mock data based on the tree structure - in a real app, this would come from a file manifest
const getUnitChapterAudioFiles = (unit: number, chapter: number): string[] => {
  const audioMap: Record<string, string[]> = {
    "1-1": [
      "Pien7788_U01Ch01Ex01.mp3",
      "Pien7788_U01Ch01Ex02.mp3",
      "Pien7788_U01Ch01Ex07.mp3",
      "Pien7788_U01Ch01Ex08.mp3",
      "Pien7788_U01Ch01V01.mp3",
      "Pien7788_U01Ch01V02.mp3",
      "Pien7788_U01Ch01V03.mp3",
      "Pien7788_U01Ch01V04.mp3",
      "Pien7788_U01Ch01V05.mp3",
      "Pien7788_U01Ch01V06.mp3",
    ],
    "1-2": ["Pien7788_U01Ch02V01.mp3"],
    "1-3": ["Pien7788_U01Ch03V01.mp3"],
    "1-4": ["Pien7788_U01Ch04Ex04.mp3", "Pien7788_U01Ch04V01.mp3", "Pien7788_U01Ch04V02.mp3"],
    "1-5": ["Pien7788_U01Ch05Ex04.mp3", "Pien7788_U01Ch05V01.mp3", "Pien7788_U01Ch05V02.mp3"],
    "1-6": ["Pien7788_U01Ch06Ex02.mp3", "Pien7788_U01Ch06Ex03.mp3", "Pien7788_U01Ch06Ex06.mp3"],
    "2-7": [
      "Pien7788_U02Ch07Ex0x011.mp3",
      "Pien7788_U02Ch07Ex0x013.mp3",
      "Pien7788_U02Ch07Ex0x017.mp3",
      "Pien7788_U02Ch07Ex0x018.mp3",
      "Pien7788_U02Ch07Ex0x03.mp3",
      "Pien7788_U02Ch07Ex0x05.mp3",
      "Pien7788_U02Ch07V01.mp3",
      "Pien7788_U02Ch07V02.mp3",
      "Pien7788_U02Ch07V03.mp3",
      "Pien7788_U02Ch07V04.mp3",
    ],
    "2-8": ["Pien7788_U02Ch08Ex04.mp3", "Pien7788_U02Ch08Ex07.mp3", "Pien7788_U02Ch08V01.mp3"],
    "2-9": [
      "Pien7788_U02Ch09Ex01.mp3",
      "Pien7788_U02Ch09Ex07.mp3",
      "Pien7788_U02Ch09V01.mp3",
      "Pien7788_U02Ch09V02.mp3",
      "Pien7788_U02Ch09V03.mp3",
    ],
    "2-10": ["Pien7788_U02Ch10Ex03.mp3", "Pien7788_U02Ch10V01.mp3", "Pien7788_U02Ch10V02.mp3"],
    "2-11": ["Pien7788_U02Ch11Ex01.mp3", "Pien7788_U02Ch11Ex05.mp3", "Pien7788_U02Ch11V01.mp3"],
    "2-12": [
      "Pien7788_U02Ch12Ex03.mp3",
      "Pien7788_U02Ch12Ex04_01.mp3",
      "Pien7788_U02Ch12Ex04_02.mp3",
      "Pien7788_U02Ch12Ex07.mp3",
      "Pien7788_U02Ch12V01.mp3",
    ],
    // Add more mappings as needed...
  }

  return audioMap[`${unit}-${chapter}`] || []
}

const getSoundScriptLessonAudioFiles = (lesson: number): string[] => {
  const audioMap: Record<number, string[]> = {
    1: ["Pien7788_SSL01Ex01.mp3", "Pien7788_SSL01Ex02.mp3", "Pien7788_SSL01Ex03.mp3"],
    2: [
      "Pien7788_SSL02Ex01.mp3",
      "Pien7788_SSL02Ex02.mp3",
      "Pien7788_SSL02Ex03.mp3",
      "Pien7788_SSL02Ex04.mp3",
      "Pien7788_SSL02Ex05.mp3",
      "Pien7788_SSL02Ex06.mp3",
      "Pien7788_SSL02Ex07.mp3",
    ],
    3: ["Pien7788_SSL03Ex01.mp3", "Pien7788_SSL03Ex02.mp3", "Pien7788_SSL03Ex03.mp3", "Pien7788_SSL03Ex04.mp3"],
    // Add more lessons as needed...
  }

  return audioMap[lesson] || []
}
