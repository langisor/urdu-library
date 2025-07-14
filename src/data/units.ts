export interface AudioFile {
  no: number;
  type: "Exercise" | "Vocabulary";
  file: string;
}
export interface Chapter {
  chapterNo: number;
  title: string;
  audios: AudioFile[];
}
export interface Unit {
  unitNo: number;
  title: string;
  chapters: Chapter[];
}

export const UnitsData: Unit[] = [
  {
    unitNo: 1,
    title: "Me and My School",
    chapters: [
      {
        chapterNo: 1,
        title: "Introduction",
        audios: [
          {
            no: 1,
            type: "Exercise",
            file: "Pien7788_U01Ch01Ex01.mp3",
          },
          {
            no: 2,
            type: "Exercise",
            file: "Pien7788_U01Ch01Ex02.mp3",
          },
          {
            no: 7,
            type: "Exercise",
            file: "Pien7788_U01Ch01Ex07.mp3",
          },
          {
            no: 8,
            type: "Exercise",
            file: "Pien7788_U01Ch01Ex08.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U01Ch01V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U01Ch01V02.mp3",
          },
          {
            no: 3,
            type: "Vocabulary",
            file: "Pien7788_U01Ch01V03.mp3",
          },
          {
            no: 4,
            type: "Vocabulary",
            file: "Pien7788_U01Ch01V04.mp3",
          },
          {
            no: 5,
            type: "Vocabulary",
            file: "Pien7788_U01Ch01V05.mp3",
          },
          {
            no: 6,
            type: "Vocabulary",
            file: "Pien7788_U01Ch01V06.mp3",
          },
        ],
      },
      {
        chapterNo: 2,
        title: "Me and My Classmates",
        audios: [
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U01Ch02V01.mp3",
          },
        ],
      },
      {
        chapterNo: 3,
        title: "My Classroom",
        audios: [
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U01Ch03V01.mp3",
          },
        ],
      },
      {
        chapterNo: 4,
        title: "Describing Classroom Items",
        audios: [
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U01Ch04Ex04.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U01Ch04V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U01Ch04V02.mp3",
          },
        ],
      },
      {
        chapterNo: 5,
        title: "Giving Commands and Making Requests",
        audios: [
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U01Ch05Ex04.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U01Ch05V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U01Ch05V02.mp3",
          },
        ],
      },
      {
        chapterNo: 6,
        title: "Unit 1 Review Activities",
        audios: [
          {
            no: 2,
            type: "Exercise",
            file: "Pien7788_U01Ch06Ex02.mp3",
          },
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U01Ch06Ex03.mp3",
          },
          {
            no: 6,
            type: "Exercise",
            file: "Pien7788_U01Ch06Ex06.mp3",
          },
        ],
      },
    ],
  },
  {
    unitNo: 2,
    title: "My Family and My Home",
    chapters: [
      {
        chapterNo: 7,
        title: "Locating Places and Objects",
        audios: [
          {
            no: 11,
            type: "Exercise",
            file: "Pien7788_U02Ch07Ex011.mp3",
          },
          {
            no: 13,
            type: "Exercise",
            file: "Pien7788_U02Ch07Ex013.mp3",
          },
          {
            no: 17,
            type: "Exercise",
            file: "Pien7788_U02Ch07Ex017.mp3",
          },
          {
            no: 18,
            type: "Exercise",
            file: "Pien7788_U02Ch07Ex018.mp3",
          },
          {
            no: 3,
            type: "Vocabulary",
            file: "Pien7788_U02Ch07V03.mp3",
          },
          {
            no: 4,
            type: "Vocabulary",
            file: "Pien7788_U02Ch07V04.mp3",
          },
          {
            no: 5,
            type: "Vocabulary",
            file: "Pien7788_U02Ch07V05.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U02Ch07V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U02Ch07V02.mp3",
          },
        ],
      },
      {
        chapterNo: 8,
        title: "Identifying Family Members",
        audios: [
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U02Ch08Ex04.mp3",
          },
          {
            no: 7,
            type: "Exercise",
            file: "Pien7788_U02Ch08Ex07.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U02Ch08V01.mp3",
          },
        ],
      },
      {
        chapterNo: 9,
        title: "Describing Family Members",
        audios: [
          {
            no: 1,
            type: "Exercise",
            file: "Pien7788_U02Ch09Ex01.mp3",
          },
          {
            no: 7,
            type: "Exercise",
            file: "Pien7788_U02Ch09Ex07.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U02Ch09V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U02Ch09V02.mp3",
          },
          {
            no: 3,
            type: "Vocabulary",
            file: "Pien7788_U02Ch09V03.mp3",
          },
        ],
      },
      {
        chapterNo: 10,
        title: "My Home, My Belongings",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U02Ch10Ex03.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U02Ch10V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U02Ch10V02.mp3",
          },
        ],
      },
      {
        chapterNo: 11,
        title: "Making Comparisons",
        audios: [
          {
            no: 1,
            type: "Exercise",
            file: "Pien7788_U02Ch11Ex01.mp3",
          },
          {
            no: 5,
            type: "Exercise",
            file: "Pien7788_U02Ch11Ex05.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U02Ch11V01.mp3",
          },
        ],
      },
      {
        chapterNo: 12,
        title: "Unit 2 Review Activities",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U02Ch12Ex03.mp3",
          },
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U02Ch12Ex04_01.mp3",
          },
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U02Ch12Ex04_02.mp3",
          },
          {
            no: 7,
            type: "Exercise",
            file: "Pien7788_U02Ch12Ex07.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U02Ch12V01.mp3",
          },
        ],
      },
    ],
  },
  {
    unitNo: 3,
    title: "Daily Life",
    chapters: [
      {
        chapterNo: 13,
        title: "My Daily Routine 1",
        audios: [
          {
            no: 2,
            type: "Exercise",
            file: "Pien7788_U03Ch13Ex02.mp3",
          },
          {
            no: 8,
            type: "Exercise",
            file: "Pien7788_U03Ch13Ex08_01.mp3",
          },
          {
            no: 8,
            type: "Exercise",
            file: "Pien7788_U03Ch13Ex08_02.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U03Ch13V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U03Ch13V02.mp3",
          },
          {
            no: 3,
            type: "Vocabulary",
            file: "Pien7788_U03Ch13V03.mp3",
          },
          {
            no: 4,
            type: "Vocabulary",
            file: "Pien7788_U03Ch13V04.mp3",
          },
        ],
      },
      {
        chapterNo: 14,
        title: "My Daily Routine 2",
        audios: [
          {
            no: 7,
            type: "Exercise",
            file: "Pien7788_U03Ch14Ex07.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U03Ch14V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U03Ch14V02.mp3",
          },
        ],
      },
      {
        chapterNo: 15,
        title: "Describing Events in Progress",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U03Ch15Ex03_01.mp3",
          },
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U03Ch15Ex03_02.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U03Ch15V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U03Ch15V02.mp3",
          },
        ],
      },
      {
        chapterNo: 16,
        title: "Weather and Climate",
        audios: [
          {
            no: 6,
            type: "Exercise",
            file: "Pien7788_U03Ch16Ex06.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U03Ch16V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U03Ch16V02.mp3",
          },
        ],
      },
      {
        chapterNo: 17,
        title: "Unit 3 Review Activities",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U03Ch17Ex03.mp3",
          },
          {
            no: 6,
            type: "Exercise",
            file: "Pien7788_U03Ch17Ex06.mp3",
          },
        ],
      },
    ],
  },
  {
    unitNo: 4,
    title: "In the Market",
    chapters: [
      {
        chapterNo: 18,
        title: "Expressing Likes, Needs, and Desires",
        audios: [
          {
            no: 14,
            type: "Exercise",
            file: "Pien7788_U04Ch18Ex014_01.mp3",
          },
          {
            no: 14,
            type: "Exercise",
            file: "Pien7788_U04Ch18Ex014_02.mp3",
          },
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U04Ch18Ex04.mp3",
          },
          {
            no: 6,
            type: "Exercise",
            file: "Pien7788_U04Ch18Ex06.mp3",
          },
          {
            no: 9,
            type: "Exercise",
            file: "Pien7788_U04Ch18Ex09_01.mp3",
          },
          {
            no: 9,
            type: "Exercise",
            file: "Pien7788_U04Ch18Ex09_02.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U04Ch18V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U04Ch18V02.mp3",
          },
        ],
      },
      {
        chapterNo: 19,
        title: "Choosing Items and Expressing Measures",
        audios: [
          {
            no: 10,
            type: "Exercise",
            file: "Pien7788_U04Ch19Ex010.mp3",
          },
          {
            no: 5,
            type: "Exercise",
            file: "Pien7788_U04Ch19Ex05.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U04Ch19V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U04Ch19V02.mp3",
          },
        ],
      },
      {
        chapterNo: 20,
        title: "Discussing Prices",
        audios: [
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U04Ch20Ex04.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U04Ch20V01.mp3",
          },
        ],
      },
      {
        chapterNo: 21,
        title: "Unit 4 Review Activities",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U04Ch21Ex03.mp3",
          },
          {
            no: 5,
            type: "Exercise",
            file: "Pien7788_U04Ch21Ex05.mp3",
          },
          {
            no: 9,
            type: "Exercise",
            file: "Pien7788_U04Ch21Ex09.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U04Ch21V01.mp3",
          },
        ],
      },
    ],
  },
  {
    unitNo: 5,
    title: "My Childhood",
    chapters: [
      {
        chapterNo: 22,
        title: "My Childhood Home",
        audios: [
          {
            no: 6,
            type: "Exercise",
            file: "Pien7788_U05Ch22Ex06.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U05Ch22V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U05Ch22V02.mp3",
          },
        ],
      },
      {
        chapterNo: 23,
        title: "Describing One's Childhood",
        audios: [
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U05Ch23Ex04_01.mp3",
          },
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U05Ch23Ex04_02.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U05Ch23V01.mp3",
          },
        ],
      },
      {
        chapterNo: 24,
        title: "Describing a Scene in the Past",
        audios: [
          {
            no: 2,
            type: "Exercise",
            file: "Pien7788_U05Ch24Ex02.mp3",
          },
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U05Ch24Ex04.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U05Ch24V01.mp3",
          },
        ],
      },
      {
        chapterNo: 25,
        title: "Expressions of Time",
        audios: [],
      },
      {
        chapterNo: 26,
        title: "Unit 5 Review Activities",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U05Ch26Ex03.mp3",
          },
          {
            no: 6,
            type: "Exercise",
            file: "Pien7788_U05Ch26Ex06.mp3",
          },
        ],
      },
    ],
  },
  {
    unitNo: 6,
    title: "Rules and Responsibilities",
    chapters: [
      {
        chapterNo: 27,
        title: "Rules and Regulations",
        audios: [
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U06Ch27V01.mp3",
          },
        ],
      },
      {
        chapterNo: 28,
        title: "Expressing Compulsion",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U06Ch28Ex03.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U06Ch28V01.mp3",
          },
        ],
      },
      {
        chapterNo: 29,
        title: "Giving and Following Instructions",
        audios: [
          {
            no: 5,
            type: "Exercise",
            file: "Pien7788_U06Ch29Ex05.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U06Ch29V01.mp3",
          },
        ],
      },
      {
        chapterNo: 30,
        title: "Unit 6 Review Activities",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U06Ch30Ex03.mp3",
          },
          {
            no: 6,
            type: "Exercise",
            file: "Pien7788_U06Ch30Ex06.mp3",
          },
        ],
      },
    ],
  },
  {
    unitNo: 7,
    title: "A Trip to South Asia",
    chapters: [
      {
        chapterNo: 31,
        title: "My Plans",
        audios: [
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U07Ch31Ex04_01.mp3",
          },
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U07Ch31Ex04_02.mp3",
          },
          {
            no: 6,
            type: "Exercise",
            file: "Pien7788_U07Ch31Ex06.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U07Ch31V01.mp3",
          },
        ],
      },
      {
        chapterNo: 32,
        title: "My Travel Plans: Definite and Possible",
        audios: [
          {
            no: 7,
            type: "Exercise",
            file: "Pien7788_U07Ch32Ex07.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U07Ch32V01.mp3",
          },
        ],
      },
      {
        chapterNo: 33,
        title: "Arranging Transportation and Lodging",
        audios: [
          {
            no: 5,
            type: "Exercise",
            file: "Pien7788_U07Ch33Ex05_01.mp3",
          },
          {
            no: 5,
            type: "Exercise",
            file: "Pien7788_U07Ch33Ex05_02.mp3",
          },
          {
            no: 6,
            type: "Exercise",
            file: "Pien7788_U07Ch33Ex06.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U07Ch33V01.mp3",
          },
        ],
      },
      {
        chapterNo: 34,
        title: "Finding One's Way",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U07Ch34Ex03.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U07Ch34V01.mp3",
          },
        ],
      },
      {
        chapterNo: 35,
        title: "Seeking Information for Travel Plans",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U07Ch35Ex03.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U07Ch35V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U07Ch35V02.mp3",
          },
        ],
      },
      {
        chapterNo: 36,
        title: "Unit 7 Review Activities",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U07Ch36Ex03.mp3",
          },
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U07Ch36Ex04_01.mp3",
          },
          {
            no: 4,
            type: "Exercise",
            file: "Pien7788_U07Ch36Ex04_02.mp3",
          },
          {
            no: 7,
            type: "Exercise",
            file: "Pien7788_U07Ch36Ex07_01.mp3",
          },
          {
            no: 7,
            type: "Exercise",
            file: "Pien7788_U07Ch36Ex07_02.mp3",
          },
          {
            no: 10,
            type: "Exercise",
            file: "Pien7788_U07Ch36Ex10_01.mp3",
          },
          {
            no: 10,
            type: "Exercise",
            file: "Pien7788_U07Ch36Ex10_02.mp3",
          },
        ],
      },
    ],
  },

  {
    unitNo: 8,
    title: "Past Events and Experiences",
    chapters: [
      {
        chapterNo: 37,
        title: "My Weekend",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U08Ch37Ex03.mp3",
          },
          {
            no: 5,
            type: "Exercise",
            file: "Pien7788_U08Ch37Ex05.mp3",
          },
          {
            no: 7,
            type: "Exercise",
            file: "Pien7788_U08Ch37Ex07.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U08Ch37V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U08Ch37V02.mp3",
          },
        ],
      },
      {
        chapterNo: 38,
        title: "Narrating a Story",
        audios: [
          {
            no: 7,
            type: "Exercise",
            file: "Pien7788_U08Ch38Ex07.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U08Ch38V01.mp3",
          },
        ],
      },
      {
        chapterNo: 39,
        title: "My Experience and Accomplishments",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U08Ch39Ex03.mp3",
          },
          {
            no: 5,
            type: "Exercise",
            file: "Pien7788_U08Ch39Ex05.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U08Ch39V01.mp3",
          },
        ],
      },
      {
        chapterNo: 40,
        title: "At the Doctor",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U08Ch40Ex03.mp3",
          },
          {
            no: 6,
            type: "Exercise",
            file: "Pien7788_U08Ch40Ex06.mp3",
          },
        ],
      },
      {
        chapterNo: 41,
        title: "Unit 8 Review Activities",
        audios: [
          {
            no: 3,
            type: "Exercise",
            file: "Pien7788_U08Ch41Ex03.mp3",
          },
          {
            no: 8,
            type: "Exercise",
            file: "Pien7788_U08Ch41Ex08_01.mp3",
          },
          {
            no: 8,
            type: "Exercise",
            file: "Pien7788_U08Ch41Ex08_02.mp3",
          },
          {
            no: 1,
            type: "Vocabulary",
            file: "Pien7788_U08Ch41V01.mp3",
          },
          {
            no: 2,
            type: "Vocabulary",
            file: "Pien7788_U08Ch41V02.mp3",
          },
          {
            no: 3,
            type: "Vocabulary",
            file: "Pien7788_U08Ch41V03.mp3",
          },
          {
            no: 4,
            type: "Vocabulary",
            file: "Pien7788_U08Ch41V04.mp3",
          },
        ],
      },
    ],
  },
];
