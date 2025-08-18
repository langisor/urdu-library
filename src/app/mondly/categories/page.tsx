 
import { CategoriesCards } from "./_components/categories-cards";
 
import { CategoryItem } from "../_types/data-services";
import { queryClient } from "@/lib/postgres-client";
 
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
