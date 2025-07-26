import audioFilesData from "@/data/auto-generated/audio-files.json";
import tocData from "@/data/toc.json";

// Audio file mapping utility
export interface AudioFile {
  filename: string;
  type: "exercise" | "vocabulary";
  number: string;
  title: string;
  path: string;
}

export interface LessonAudio {
  lessonId: string;
  exercises: AudioFile[];
  vocabulary: AudioFile[];
}

// Parse filename to extract information
export const parseAudioFilename = (filename: string): AudioFile | null => {
  // Remove .mp3 extension
  const nameWithoutExt = filename.replace(".mp3", "");

  // Pattern for unit chapters: Pien7788_U01Ch01Ex01 or Pien7788_U01Ch01V01
  const unitChapterMatch = nameWithoutExt.match(
    /Pien7788_U(\d+)Ch(\d+)(Ex|V)(.+)/
  );
  if (unitChapterMatch) {
    const [, unit, chapter, type, number] = unitChapterMatch;
    return {
      filename,
      type: type === "Ex" ? "exercise" : "vocabulary",
      number: number,
      title: `${type === "Ex" ? "Exercise" : "Vocabulary"} ${number}`,
      path: `/media/audio-all/Unit ${unit} Audio/Chapter${chapter}/${filename}`,
    };
  }

  // Pattern for sound and script lessons: Pien7788_SSL01Ex01
  const sslMatch = nameWithoutExt.match(/Pien7788_SSL(\d+)Ex(\d+)/);
  if (sslMatch) {
    const [, lesson, exercise] = sslMatch;
    return {
      filename,
      type: "exercise",
      number: exercise,
      title: `Exercise ${exercise}`,
      path: `/media/audio-all/Sound and Script/Lesson${lesson}/${filename}`,
    };
  }

  return null;
};

// Map audio files to lessons/chapters based on the file structure
export const getAudioForLesson = (
  unitNumber?: number,
  chapterNumber?: number,
  lessonNumber?: number
): LessonAudio => {
  const exercises: AudioFile[] = [];
  const vocabulary: AudioFile[] = [];

  // This would normally read from the actual file system or a pre-generated manifest
  // For now, I'll create a mapping based on the tree structure provided

  if (unitNumber && chapterNumber) {
    // Unit chapter audio files
    const audioFiles = getUnitChapterAudioFiles(unitNumber, chapterNumber);
    // audioFiles.forEach((file: string) => {
    //   const parsed = parseAudioFilename(file);
    //   if (parsed) {
    //     if (parsed.type === "exercise") {
    //       exercises.push(parsed);
    //     } else {
    //       vocabulary.push(parsed);
    //     }
    //   }
    // });
  } else if (lessonNumber) {
    // Sound and script lesson audio files
    // const audioFiles = getSoundScriptLessonAudioFiles(lessonNumber);
    // audioFiles.forEach((file) => {
    //   const parsed = parseAudioFilename(file);
    //   if (parsed) {
    //     exercises.push(parsed);
    //   }
    // });
  }

  return {
    lessonId: unitNumber
      ? `unit-${unitNumber}-chapter-${chapterNumber}`
      : `lesson-${lessonNumber}`,
    exercises: exercises.sort((a, b) => a.number.localeCompare(b.number)),
    vocabulary: vocabulary.sort((a, b) => a.number.localeCompare(b.number)),
  };
};

// Mock data based on the tree structure - in a real app, this would come from a file manifest
