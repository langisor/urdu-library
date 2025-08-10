import Link from "next/link";
import { promises } from "fs";
import { CategoriesCards } from "./_components/categories-cards";
import path from "path";
import { JsonViewer } from "../../components/json-viewer";


interface Category {
  id: number;
  name: string;
  countLesson: number;
  countDialogue: number;
  countVocabulary: number;
  countOxfordTest: number;
  countDone: number;
  disabled: boolean;
}


const file = "src/lib/json/urdu/categories.json";

async function getCategories() {
  const filepath = path.join(process.cwd(), file);
  const data = await promises.readFile(filepath, "utf-8");
  return JSON.parse(data).categories;
}

export default async function CategoriesPage() {
  const categories = await getCategories();
//   console.log("categories", categories);
  return (
    <div>
      <h1>Categories</h1>
      <hr />
      
      <CategoriesCards categories={categories} />
      {/* <JsonViewer value={categories} /> */}
    </div>
  );
}
