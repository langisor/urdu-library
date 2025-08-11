import { promises } from "fs";
import { CategoriesCards } from "./_components/categories-cards";
import path from "path";

import { CategoryItem } from "../_types/data-services";

const file = "src/app/mondly/_data/all.json";

async function getCategories() {
  const filepath = path.join(process.cwd(), file);
  console.log("filepath", filepath);
  const data = await promises.readFile(filepath, "utf-8");
  const parsedData = JSON.parse(data) as { data: { category: CategoryItem }[] };
 const categories:CategoryItem[] = [];
 for(const item of  parsedData.data)
  categories.push({...item.category});
 return categories;
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  console.log("categories", categories);
  return (
    <div>
      <h1>Categories</h1>

      <CategoriesCards categories={categories} />
    </div>
  );
}
