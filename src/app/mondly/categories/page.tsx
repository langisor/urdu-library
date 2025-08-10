import Link from "next/link";
import { promises } from "fs";
import { CategoriesCards } from "./_components/categories-cards";
import path from "path";
import { JsonViewerComponent } from "@/components/json-viewer";

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

const file = "src/app/mondly/_data/all.json";

async function getCategories() {
  const filepath = path.join(process.cwd(), file);
  console.log("filepath", filepath);
  const data = await promises.readFile(filepath, "utf-8");
  console.log("data", data);
  // return JSON.parse(data).categories;
}

export default async function CategoriesPage() {
  await getCategories();
  return (
    <div>
      <h1>Categories</h1>

      {/* <CategoriesCards categories={categories} /> */}
    </div>
  );
}
