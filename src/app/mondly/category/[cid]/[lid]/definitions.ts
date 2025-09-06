
// Define the shape of a Lesson object using a TypeScript interface.
export interface Lesson {
 id: number;
 title: string;
 subtitle: string;
}

// Define the props for the LessonCard component.
export interface LessonCardProps {
 lesson: Lesson;
 onStart: (lessonId: number) => void;
 onGenerateStory: (lessonSubtitle: string) => Promise<void>;
 // onTextToSpeech: (lessonTitle: string, lessonSubtitle: string) => Promise<void>;
 isStoryLoading: boolean;
 // isTtsLoading: boolean;
}
export type LessonItem = {
 id: number;
 index: number;
 categoryID: number;
 name: string;
 countPhrases: number;
 countWords: number;
 countQuiz: number;
 quizzes: number[];
}

export type QuizFItem = {
 id: number;
 alts: Array<{
   key: string;
   text: string;
   image: string;
   phonetic: string;
   audio_updated_at: number;
   image_updated_at: number;
 }>;
 sols: Array<{
   key: string;
   text: string;
   audio_updated_at: number;
 }>;
 type: string;
 lesson: number;
 wordID: number;
 modifiers: number;
 alternates: Array<number>;
};

export type QuizQbItem = {
 id: number;
 alts: Array<{
   key: string;
   text: string;
   phonetic: string;
   audio_updated_at: number;
 }>;
 sols: Array<{
   key: string;
   text: string;
   dictionary?: Array<{
     raw: string;
     translations: Array<{
       text: string;
       type: string;
       phonetic: string;
     }>;
   }>;
   phraseType?: number;
   text_tokens?: Array<{
     raw: {
       text: string;
       length: number;
       location: number;
     };
     linker: {
       text: string;
       length: number;
       location: number;
     };
     prefix: {
       text: string;
       length: number;
       location: number;
     };
     suffix: {
       text: string;
       length: number;
       location: number;
     };
   }>;
   audio_updated_at?: number;
 }>;
 type: string;
 lesson: number;
 wordID: number;
 modifiers: number;
 alternates: Array<number>;
};

export type QuizT1Item = {
 id: number;
 ord: Array<string>;
 sols: Array<{
   key: string;
   text: string;
   phonetic?: string;
   dictionary?: Array<{
     raw: string;
     translations: Array<{
       text?: string;
       type: string;
       phonetic: any;
       id?: number;
       conj?: {
         fu: Array<{
           m: {
             text: string;
           };
           t: {
             key: string;
             text: string;
             phonetic: string;
             audio_updated_at: number;
           };
         }>;
         pa: Array<{
           m: {
             text: string;
           };
           t: {
             key: string;
             text: string;
             phonetic: string;
             audio_updated_at: number;
           };
         }>;
         pr: Array<{
           m: {
             text: string;
           };
           t: {
             key: string;
             text: string;
             phonetic: string;
             audio_updated_at: number;
           };
         }>;
       };
       name?: {
         m: string;
         t: string;
         phonetic: string;
       };
       tenseNames?: {
         fu: string;
         pa: string;
         pr: string;
       };
     }>;
   }>;
   phraseType?: number;
   text_tokens?: Array<{
     raw: {
       text: string;
       length: number;
       location: number;
     };
     linker: {
       text: string;
       length: number;
       location: number;
     };
     prefix: {
       text: string;
       length: number;
       location: number;
     };
     suffix: {
       text: string;
       length: number;
       location: number;
     };
   }>;
   phonetic_tokens?: Array<{
     raw: {
       text: string;
       length: number;
       location: number;
     };
     linker: {
       text: string;
       length: number;
       location: number;
     };
     prefix: {
       text: string;
       length: number;
       location: number;
     };
     suffix: {
       text: string;
       length: number;
       location: number;
     };
   }>;
   audio_updated_at: number;
 }>;
 alts?: Array<any>;
 type: string;
 lesson: number;
 tokens: Array<{
   key: string;
   raw: {
     text: string;
     length: number;
     location: number;
   };
   text: string;
   linker: {
     text: string;
     length: number;
     location: number;
   };
   prefix: {
     text: string;
     length: number;
     location: number;
   };
   suffix: {
     text: string;
     length: number;
     location: number;
   };
 }>;
 wordID: number;
 modifiers: number;
 alternates: Array<any>;
 tokensEqualSize: boolean;
};
export type QuizT1bItem = {
 id: number;
 ord: Array<string>;
 sols: Array<{
   key: string;
   text: string;
   dictionary?: Array<{
     raw: string;
     translations: Array<any>;
   }>;
   phraseType?: number;
   text_tokens?: Array<{
     raw: {
       text: string;
       length: number;
       location: number;
     };
     linker: {
       text: string;
       length: number;
       location: number;
     };
     prefix: {
       text: string;
       length: number;
       location: number;
     };
     suffix: {
       text: string;
       length: number;
       location: number;
     };
   }>;
   audio_updated_at: number;
   phonetic?: string;
 }>;
 type: string;
 lesson: number;
 tokens: Array<{
   key: string;
   raw: {
     text: string;
     length: number;
     location: number;
   };
   text: string;
   linker: {
     text: string;
     length: number;
     location: number;
   };
   prefix: {
     text: string;
     length: number;
     location: number;
   };
   suffix: {
     text: string;
     length: number;
     location: number;
   };
 }>;
 wordID: number;
 modifiers: number;
 alternates: Array<any>;
 tokensPhonetic: Array<{
   key: string;
   raw: {
     text: string;
     length: number;
     location: number;
   };
   text: string;
   linker: {
     text: string;
     length: number;
     location: number;
   };
   prefix: {
     text: string;
     length: number;
     location: number;
   };
   suffix: {
     text: string;
     length: number;
     location: number;
   };
 }>;
 tokensEqualSize: boolean;
};
export type QuizT2Item = {
 id: number;
 sols: Array<{
   key: string;
   text: string;
   phonetic?: string;
   dictionary?: Array<{
     raw: string;
     translations: Array<{
       text?: string;
       type: string;
       phonetic: any;
       id?: number;
       conj?: {
         fu: Array<{
           m: {
             text: string;
           };
           t: {
             key: string;
             text: string;
             phonetic: string;
             audio_updated_at: number;
           };
         }>;
         pa: Array<{
           m: {
             text: string;
           };
           t: {
             key: string;
             text: string;
             phonetic: string;
             audio_updated_at: number;
           };
         }>;
         pr: Array<{
           m: {
             text: string;
           };
           t: {
             key: string;
             text: string;
             phonetic: string;
             audio_updated_at: number;
           };
         }>;
       };
       name?: {
         m: string;
         t: string;
         phonetic: string;
       };
       tenseNames?: {
         fu: string;
         pa: string;
         pr: string;
       };
     }>;
   }>;
   phraseType?: number;
   text_tokens?: Array<{
     raw: {
       text: string;
       length: number;
       location: number;
     };
     linker: {
       text: string;
       length: number;
       location: number;
     };
     prefix: {
       text: string;
       length: number;
       location: number;
     };
     suffix: {
       text: string;
       length: number;
       location: number;
     };
   }>;
   phonetic_tokens?: Array<{
     raw: {
       text: string;
       length: number;
       location: number;
     };
     linker: {
       text: string;
       length: number;
       location: number;
     };
     prefix: {
       text: string;
       length: number;
       location: number;
     };
     suffix: {
       text: string;
       length: number;
       location: number;
     };
   }>;
   audio_updated_at: number;
 }>;
 type: string;
 lesson: number;
 wordID: number;
 modifiers: number;
 alternates: Array<any>;
};
