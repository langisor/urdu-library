import { CategoryDashboard } from "./_components/category-dashboard";
import { queryClient } from "@/lib/postgres-client";
type Category = {
  id: number;
  name: string;
  countLesson: number;
  countDialogue: number;
  countVocabulary: number;
  time: number;
  dialogues: number[];
  lessons: number[];
  vocabularies: number[];
};
async function getCategories() {
  const categoriesData = await queryClient`
    select * from "Category" order by id asc;
  `;
  const categories: Category[] = [];
  for (const c of categoriesData) {
    categories.push({
      id: c.id,
      name: c.name,
      countLesson: c.countLesson,
      countDialogue: c.countDialogue,
      countVocabulary: c.countVocabulary,
      time: c.time,
      dialogues: c.dialogues,
      lessons: c.lessons,
      vocabularies: c.vocabularies,
    });
  }
  return categories;
}

export default async function CategoryPage() {
  const categories = await getCategories();
  return <CategoryDashboard categories={categories} />;
}
