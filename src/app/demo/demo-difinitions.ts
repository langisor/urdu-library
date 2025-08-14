interface FullLesson {
  lessonNumber: number;
  title: string;
  parentNumber: number;
  parentTitle: string;
  page: string;
  exercises: {
    exerciseNumber: number;
    audioFile: string;
    sub: {
      subNumber: number;
      audioFile: string;
    }[];
  }[];
}
interface FullChapter {
  chapterNumber: number;
  title: string;
  parentNumber: number;
  parentTitle: string;
  page: string;
  topics: string[];
  vocabularies: {
    vNumber: number;
    audioFile: string;
    sub?: {
      subNumber: number;
      audioFile: string;
    }[];
  }[];

  exercises: {
    number: number;
    subNumber?: number;
    audioFile: string;
  }[];
}
  
