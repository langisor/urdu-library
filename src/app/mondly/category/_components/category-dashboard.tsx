import { CategoryCard } from "./category-card";
import { Button } from "@/components/general/button";
import Link from "next/link";
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

export function CategoryDashboard({ categories }: { categories: Category[] }) {
  return (
   
      <div className="container flex flex-wrap items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          مدرب <span className="text-[hsl(280,100%,70%)]">اللغة</span> - الأوردو
        </h1>
        {categories.map((category) => (
          <div className="flex flex-col justify-center items-center gap-6" key={category.id}>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href={`/mondly/category/${category.id}`}
            
          >
            <CategoryCard category={category} />
          </Link>
          <Link
           href={`/mondly/category/${category.id}/vocabularies/${category.vocabularies[0]}`}
           className=""
            >
              <Button>مراجعة المفردات </Button>
              </Link>
          </div>
        ))}

      </div>
  
  );
}
