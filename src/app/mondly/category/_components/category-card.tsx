import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, MessageCircle, BookText, RotateCcw } from "lucide-react";

import Image from "next/image";
function getCategoryImagePath(id: number) {
  const localUrl = `/media/mondly/categories-images/${id}.jpeg`;
  return localUrl;
}
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
export function CategoryCard({ category }: { category: Category }) {
  // temp
  const disabled = false;
  const progress = category.countLesson+category.countDialogue+category.countVocabulary;
  const countDone = 0;
  const countReviewLesson = 0;

  return (
    <div className="transition-transform duration-300 hover:scale-101 border border-gray-400 rounded-xl px-2 py-2">
      
      <Card className="">
        <CardContent className="">
          <h3 className="text-xl font-bold text-center mb-2">
            {category.name}
          </h3>
          <div className="relative w-full h-72 top-0.5 left-0.5 ">
            <Image
              src={getCategoryImagePath(category.id)}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* progress */}
           
          </div>
          <Progress className="mt-6  px-3 py-1 h-4 rounded-lg text-md" value={0}>
              <span className="text-xs text-center absolute left-1/2 -translate-x-1/2">
                {category.lessons.length}/{category.countLesson}
              </span>
            </Progress>
        </CardContent>
      </Card>
      <Card dir="rtl" className="mt-2 px-4">
        <CardContent className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-4 px-2">
          <StatItem
            icon={<BookOpen className="h-4 w-4 text-white" />}
            label="دروس"
            count={category.countLesson}
          />
          <StatItem
            icon={<MessageCircle className="h-4 w-4 text-white" />}
            label="محادثات"
            count={category.countDialogue || 0}
          />
          <StatItem
            icon={<BookText className="h-4 w-4 text-white" />}
            label="مفردات"
            count={category.countVocabulary || 0}
          />
          <StatItem
            icon={<RotateCcw className="h-4 w-4 text-white" />}
            label="مراجعة"
            count={countReviewLesson || 0}
          />
        </CardContent>
      </Card>
    </div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  count: number;
}

const StatItem = ({ icon, label, count }: StatItemProps) => (
  <div className="flex flex-wrap items-center justify-center  text-sm">
    <div className="h-8 w-8 rounded-lg bg-orange-600 backdrop-blur-sm flex  items-center justify-center px-2">
      {icon}
    </div>
    <div
      className="flex gap-2 items-center text-blue-700 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg "
      style={{ direction: "rtl" }}
    >
      <span className="font-medium ">{count}</span>
      <span className=" text-xs">{label}</span>
    </div>
  </div>
);
