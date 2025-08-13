
// Interfaces for the data structure
export interface AudioFile {
 number: number;
 subNumber?: number;
 audioFile: string;
}

export interface ChapterMedia {
 vocabulary?: AudioFile[];
 exercises?: AudioFile[];
 questions?: string;
}

export interface Chapter {
 chapterNumber: number;
 title: string;
 page: string;
 topics?: string[];
 media?: ChapterMedia;
}

export interface Unit {
 unitNumber: number;
 title: string;
 chapters: Chapter[];
}

export interface LessonMedia {
 exercises?: AudioFile[];
}

export interface Lesson {
 lessonNumber: number;
 title: string;
 page: string;
 media?: LessonMedia;
}

export interface Part {
 partNumber: number;
 title: string;
 lessons: Lesson[];
}
export interface Structure {
  preliminaryPages: number;
  soundSystemLessons: number;
  scriptLessons: number;
  totalUnits: number;
  totalChapters: number;
  totalAppendices: number;
  totalMediaFiles: number;
}
export interface BookData {
 title: string;
 language: string;
 coverImage: string;
 media: {
   baseUrl: string;
   alphabetAudio: string;
 };
 preliminaryContent: { [key: string]: { page: string } };
 parts: Part[];
 units: Unit[];
 appendices: any[]; // 'appendices' is not fully defined in the provided JSON snippet, so we'll use 'any' for now
 totalPages: number;
 structure: Structure;
}
