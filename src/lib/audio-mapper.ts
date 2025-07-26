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
 