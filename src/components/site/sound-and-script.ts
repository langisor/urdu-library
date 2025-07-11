interface AudioFile {
  exercise: number;
  file: string;
}
interface LessonNode {
  lesson: number;
  audios: AudioFile[];
}

export const SoundAndScriptData: LessonNode[] = [
  {
    lesson: 1,
    audios: [
      {
        exercise: 2,
        file: "Pien7788_SSL01Ex02.mp3",
      },
      {
        exercise: 3,
        file: "Pien7788_SSL01Ex03.mp3",
      },
      {
        exercise: 5,
        file: "Pien7788_SSL01Ex05.mp3",
      },
      {
        exercise: 6,
        file: "Pien7788_SSL01Ex06.mp3",
      },

    ],
  },
  {
    lesson: 2,
    audios:[
     {
        exercise:1,
        file:"Pien7788_SSL02Ex01.mp3",
     },
     {
        exercise:2,
        file:"Pien7788_SSL02Ex02.mp3",
     },
     {
        exercise:3,
        file:"Pien7788_SSL02Ex03.mp3",
     },
     {
        exercise:5,
        file:"Pien7788_SSL02Ex05.mp3",
     },
     {
        exercise:6,
        file:"Pien7788_SSL02Ex06.mp3",
     },
     {
        exercise:7,
        file:"Pien7788_SSL02Ex07.mp3",
     },
    ]
  },
  {
    lesson: 3,
    audios:[
     {
        exercise:1,
        file:"Pien7788_SSL03Ex01.mp3",
     },
     {
        exercise:2,
        file:"Pien7788_SSL03Ex02.mp3",
     },
     {
        exercise:3,
        file:"Pien7788_SSL03Ex03.mp3",
     },
     {
        exercise:4,
        file:"Pien7788_SSL03Ex04.mp3",
     },
    ]
  },
  {
    lesson: 4,
    audios:[
     {
        exercise:1,
        file:"Pien7788_SSL04Ex01.mp3",
     },
     {
        exercise:2,
        file:"Pien7788_SSL04Ex02.mp3",
     },
     {
        exercise:3,
        file:"Pien7788_SSL04Ex03.mp3",
     },
    ]
  },
  {
    lesson: 5,
    audios:[
     {
        exercise:1,
        file:"Pien7788_SSL05Ex01.mp3",
     },
     {
        exercise:2,
        file:"Pien7788_SSL05Ex02.mp3",
     },
     {
        exercise:3,
        file:"Pien7788_SSL05Ex03.mp3",
     },
    ]
  },
  {
    lesson: 6,
    audios:[
     {
        exercise:1,
        file:"Pien7788_SSL06Ex01.mp3",
     },
     {
        exercise:2,
        file:"Pien7788_SSL06Ex02.mp3",
     },
    ]
  },
  {
    lesson: 7,
    audios:[
     {
        exercise:1,
        file:"Pien7788_SSL07Ex01.mp3",
     },
     {
        exercise:2,
        file:"Pien7788_SSL07Ex02.mp3",
     },
     {
        exercise:3,
        file:"Pien7788_SSL07Ex03.mp3",
     },
   
    ]
  },
  {
    lesson: 8,
    audios:[
     {
        exercise:2,
        file:"Pien7788_SSL08Ex02.mp3",
     },
     {
        exercise:3,
        file:"Pien7788_SSL08Ex03.mp3",
     },
     {
        exercise:5,
        file:"Pien7788_SSL08Ex05.mp3",
     },
     {
        exercise:6,
        file:"Pien7788_SSL08Ex06.mp3",
     },
   
    ]
  },

  {
    lesson: 9,
    audios:[
     {
        exercise:2,
        file:"Pien7788_SSL09Ex02.mp3",
     },
     {
        exercise:3,
        file:"Pien7788_SSL09Ex03.mp3",
     },
     {
        exercise:5,
        file:"Pien7788_SSL09Ex05.mp3",
     },
     {
        exercise:6,
        file:"Pien7788_SSL09Ex06.mp3",
     },
   
    ]
  },
];

