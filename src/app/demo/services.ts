import { queryClient } from "@/lib/postgres-client";
import { RowList, Row } from "postgres";
 
export enum TQuizType {
 L1 = "L1",
 T2 = "T2",
 T2b = "T2b",
 D = "D",
 T1b = "T1b",
 P = "P",
 Qb = "Qb",
 Q = "Q",
 T1 = "T1",
 R = "R",
 C2b = "C2b",
 W1b = "W1b",
 C1b = "C1b",
 F = "F",
}

export interface GetQuizzesProps {
 quizID?: string;
 type?: TQuizType;
 limit?: number | null;
 lessonID?: string;
}

 
export async function getQuizzes({
 type,
 limit = 5,
 lessonID,
 quizID,
}: GetQuizzesProps) {
 const column = ["quizData"];
 let result: Row[] = [];
 // if quizID is provided
 if (quizID) {
   result = await queryClient`
    SELECT ${queryClient(column)} FROM "Quiz" WHERE id = ${quizID};
   `;
   return result.map((row) => row.quizData);
 }
 // if lessonID is provided ignore all other filters
 if (lessonID) {
   result = await queryClient`
    SELECT ${queryClient(column)} FROM "Quiz" WHERE "lessonID" = ${lessonID};
   `;
   return result.map((row) => row.quizData);
 }
 // if type is provided
 if (type) {
   result = await queryClient`
    SELECT ${queryClient(
      column
    )} FROM "Quiz" WHERE type = ${type} LIMIT ${limit};
   `;
   return result.map((row) => row.quizData);
 }
 // if no filter is provided return distinct Quiz type
 result = await queryClient`
  SELECT DISTINCT type FROM "Quiz";
 `;
 return result.map((row) => row.type);
}