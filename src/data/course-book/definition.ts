export interface MediaExercise {
  number: number;
  audioFile: string;
  subExercises?: {
    subNumber: number;
    audioFile: string;
  }[];
  questions?: string;
}

export interface MediaChapter {
  vocabulary?: {
    number: number;
    audioFile: string;
  }[];
  exercises?: MediaExercise[];
}

export interface Lesson {
  lessonNumber: number;
  title: string;
  page: string;
  media?: {
    exercises: MediaExercise[];
  };
}

export interface Part {
  partNumber: number;
  title: string;
  lessons: Lesson[];
  exerciseAnswers?: {
    page: string;
  };
  arabicDefiniteArticle?: {
    page: string;
  };
}

export interface Chapter {
  chapterNumber: number;
  title: string;
  page: string;
  topics: string[];
  media?: MediaChapter;
}

export interface Unit {
  unitNumber: number;
  title: string;
  chapters: Chapter[];
}

export interface Appendix {
  appendixNumber: number;
  title: string;
  page: string;
  sections: string[];
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
  preliminaryContent: {
    aboutBeginningUrdu: {
      page: string;
    };
    howToUseThisBookForTeachers: {
      page: string;
    };
    howToUseThisBookForStudents: {
      page: string;
    };
    acknowledgments: {
      page: string;
    };
    aboutTheUrduLanguage: {
      page: string;
    };
    theSoundSystemAndScriptOfUrdu: {
      page: string;
    };
  };
  parts: Part[];
  units: Unit[];
  appendices: Appendix[];
  totalPages: number;
  structure: Structure;
}
