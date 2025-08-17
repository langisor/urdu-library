// Define the TypeScript interfaces for our data structures
export interface AudioFile {
  unit: number;
  chapter: number;
  type: "Vocabulary" | "Exercise";
  number: number;
  subNumber?: number; // Optional for some exercise files
  id: string;
}

export interface Chapter {
  chapter_number: number;
  chapter_title: string;
  topics: string[];
  vocs: AudioFile[];
  exers: AudioFile[];
  page: number;
}

export interface Unit {
  unit_number: number;
  unit_title: string;
  chapters: Chapter[];
}

export const getAudioUrl = (item: AudioFile): string => {
  const { unit, chapter, id } = item;
  const unit_number = unit;
  // const chapterNumber = String(chapter).padStart(2, "0");
  const chapter_number = chapter;
  return `/media/audio-all/Unit${unit_number}/Chapter${chapter_number}/${id}`;
};
 