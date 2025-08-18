import { promises } from "fs";
import { CategoriesCards } from "./_components/categories-cards";
import path from "path";
import { CategoryItem } from "../_types/data-services";
const file = "src/app/mondly/_data/all.json";
import { queryClient } from "@/lib/postgres-client";
// async function getCategories() {
//   const filepath = path.join(process.cwd(), file);
//   const data = await promises.readFile(filepath, "utf-8");
//   const parsedData = JSON.parse(data) as { data: { category: CategoryItem }[] };
//   const categories: CategoryItem[] = [];
//   for (const item of parsedData.data) categories.push({ ...item.category });
//   return categories;
// }
async function getCategories() {
  const categories = await queryClient`
  SELECT * FROM "Category"
  `;
  return categories  as unknown as CategoryItem[];
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="flex flex-col gap-4">
      <CategoriesCards categories={categories} />
      {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
    </div>
  );
}
