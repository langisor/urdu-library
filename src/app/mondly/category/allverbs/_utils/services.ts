import { queryClient } from "@/lib/postgres-client";
import { DictionaryQuiz, Sol, Dictionary, Translation } from "./types";
export async function getVerbsForLessons(cid: string | number) {
  // get lessons from category
  const lessons = await queryClient`
 select "lessons" from "Category" where "id"=${Number(cid)}
`;
  const lessonsArray = lessons[0].lessons;
  // select all rows from Quiz table where column "type" equals one of  ["W1b","Q","Qb","T1","T1b","T2","C1b","C2b","R"] and lessonID is equal 101
  const parsedData: DictionaryQuiz[] = [];

  const verbsArray: Translation[] = [];
  for (const lesson of lessonsArray) {
    const data = await queryClient`
SELECT * FROM "Quiz" WHERE "type" IN ('W1b', 'Q', 'Qb', 'T1', 'T1b', 'T2', 'C1b', 'C2b', 'R') AND "lessonID"=${lesson}
`;
    for (const q of data) {
      parsedData.push(JSON.parse(JSON.stringify(q.quizData as DictionaryQuiz)));
    }
  }

  for (const q of parsedData) {
    const dicts = q.sols[0].dictionary as Dictionary[];
    const translations = dicts.map((dict: Dictionary) => {
      if (dict.translations.length > 0) {
        for (const t of dict.translations as Translation[]) {
          if (t.type === "verb") {
            verbsArray.push({
              id: t.id,
              conj: t.conj,
              name: t.name,
              tenseNames: t.tenseNames,
            } as Translation);
          }
        }
      }
    });
  }
  // remove duplicates using map cpllection
  const uniqueVerbs = new Map(
    verbsArray.map((verb) => [verb.id, verb])
  ).values();

  const uniqueVerbsArray = Array.from(uniqueVerbs);
  return uniqueVerbsArray;
}

export async function getAllCategoriesVerbs() {
  const categories = await queryClient`
 select "id" from "Category"  order by "id" asc
`;
  const cat_Ids = categories.map((item) => item.id);
  const verbsArray: Translation[] = [];
  for (const cId of cat_Ids) {
    console.log("process category ", cId);
    const verbs = await getVerbsForLessons(cId);
    verbsArray.push(...verbs);
  }

  console.log("Filtering verbs...");
  const uniqueVerbs = new Map(
    verbsArray.map((verb) => [verb.id, verb])
  ).values();

  console.log("Filtering verbs...done");
  const uniqueVerbsArray = Array.from(uniqueVerbs);
  // return uniqueVerbsArray;
  return uniqueVerbsArray;
}
