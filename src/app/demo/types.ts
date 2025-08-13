export const _db_tables = [
 "Category",
 "Lesson",
 "Quiz",
 "Vocabulary",
 "VItems",
];
export const _db_columns = {
 Category: [
   "id",
   "name",
   "countLesson",
   "countVocabulary",
 
   "time",
 ],
 Lesson: [
   "id",
   "name",
   "index",
   "categoryID",
   "difficulty",
   "countQuiz",
   "countWord",
   "countPhrase",
   "quizzes",
 ],

 Quiz: ["id", "type", "lessonID", "quizData"],
 Vocabulary: [
   "id",
   "categoryID",
   "countItem",
   "countWord",
   "countPhrase",
   "Item",
 ],
 VItems: ["id", "vocabulary", "wordID", "key", "vItemData"],
};

export const _db_columns_names = Object.keys(_db_columns);
export const _db_tables_names = Object.keys(_db_tables);

export const _db_columns_values = Object.values(_db_columns);
export const _db_tables_values = Object.values(_db_tables);

export const _db_columns_values_flat = _db_columns_values.flat();
export const _db_tables_values_flat = _db_tables_values.flat(); 

// types

export interface ICategory {
 id: number;
 name: string;
 countLesson: number;
 countVocabulary: number;
 countQuiz: number;
 time: string;
}

export interface ILesson {
 id: number;
 name: string;
 index: number;
 categoryID: number;
 difficulty: string;
 countQuiz: number;
 countWord: number;
 countPhrase: number;
 quizzes: string;
}

export interface IQuiz {
 id: number;
 type: string;
 lessonID: number;
 quizData: string;
}

export interface IVocabulary {
 id: number;
 categoryID: number;
 countItem: number;
 countWord: number;
 countPhrase: number;
 vItems: string;
}

export interface IVItems {
 id: number;
 vocabulary: string;
 wordID: number;
 key: string;
 vItemData: string;
}