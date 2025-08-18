"use client";
import { usePathname } from "next/navigation";
import LessonCard from "./lesson-card";
import { LessonItem, VocabularyData } from "@/app/mondly/_types/data-services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "lucide-react";
interface CategoryDashboardProps {
  lessonsData: LessonItem[];
  vocabularyData: VocabularyData;
}
export default function CategoryDashboard(data: CategoryDashboardProps) {
  const { lessonsData, vocabularyData } = data;
  const pathname = usePathname();
  return (
    <div className="p-8 bg-gray-100 min-h-screen" dir="rtl">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto mb-10 text-right">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
          دروسك
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
          تتبع تقدمك في دروس اللغة العربية والمفردات. كل درس مصمم لمساعدتك على
          إتقان مهاراتك اللغوية بفعالية.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {/* Render Vocabulary Card with a unique style */}
        <LessonCard
          key={vocabularyData.vocabulary.id}
          id={vocabularyData.vocabulary.id}
          title={"المفردات الرئيسية"}
          description={`تحتوي هذه المجموعة على ${vocabularyData.vocabulary.countWords} كلمة و ${vocabularyData.vocabulary.countPhrases} عبارة.`}
          status={vocabularyData.vocabulary.done ? "مكتمل" : "قيد التقدم"}
          progress={
            vocabularyData.vocabulary.done
              ? 100
              : Math.floor(
                  (vocabularyData.vocabulary.countDone /
                    vocabularyData.vocabulary.countItem) *
                    100
                )
          }
          link={`${pathname}/vocabularies?vid=${vocabularyData.vocabulary.id}`}
          isVocabularyCard={true}
        />

        {/* Render Lesson Cards */}
        {lessonsData.map((lesson) => {
          // Determine status and progress based on the `done` property
          const status = lesson.done ? "مكتمل" : "قيد التقدم";
          const progress = lesson.done ? 100 : Math.floor(Math.random() * 99);

          // Generate a simple description
          const description = `هذا الدرس هو من مستوى ${
            lesson.difficulty === "beginner" ? "المبتدئين" : undefined
          } ويحتوي على ${lesson.countWords} كلمة و ${
            lesson.countPhrases
          } عبارة.`;

          return (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.name}
              description={description}
              status={status}
              progress={progress}
              link={`${pathname}/lessons/${lesson.id}`}
            />
          );
        })}
        {/* render fake Dialogue Card */}
        <LessonCard
          key={vocabularyData.vocabulary.name + "dialogue"}
          id={vocabularyData.vocabulary.id}
          title={"المحادثة"}
          description={"TODO: add dialogues"}
          status={vocabularyData.vocabulary.done ? "مكتمل" : "قيد التقدم"}
          progress={0}
          link={`${pathname}/vocabularies?cid=${vocabularyData.vocabulary.id}`}
          isVocabularyCard={true}
        />
      </div>
    </div>
  );
}
