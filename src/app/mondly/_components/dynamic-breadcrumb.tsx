"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import namesData from "@/app/mondly/_components/names.json";

 

interface BreadcrumbItem {
  label: string; // breadcrumb text

  href: string | undefined;
}
/**
 *  DynamicBreadcrumb component
 * @param param0 DynamicBreadcrumbProps
 * @returns JSX.Element
 */
export function DynamicBreadcrumb( ) {
  const pathname = usePathname();

  const breadcrumbs: BreadcrumbItem[] = generateBreadcrumb(pathname);

  return (
    <div className="w-full naskh-text bg-accent p-2 rounded-md"  >
      <div
        className={
          "flex flex-wrap"
        }
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="flex items-center gap-2 ">
            <ArrowLeft className="w-3 h-3" />
            <Link
              href={breadcrumb.href || ""}
              className="flex items-center gap-2"
            >
              <span className="ml-2">{breadcrumb.label}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// /mondly/categories/1/lessons/101

function generateBreadcrumb(pathname: string) {
  const breadcrumbs: BreadcrumbItem[] = [];
  const segments: string[] = pathname.split("/");
  breadcrumbs.push({ label: "المسار", href: "/mondly" });
  breadcrumbs.push({
    label: "الأقسام",

    href: "/mondly/categories",
  });
 
  if (segments[3] && isStringInteger(segments[3])) {
    breadcrumbs.push({
      label: getCategoryName(parseInt(segments[3])),
      href: `/mondly/categories/${segments[3]}`,
    });
  }
  switch (segments[4]) {
    case "lessons":
      breadcrumbs.push(
        {
          label: "الدروس",
          href: `/mondly/categories/${segments[3]}`,
        },
        {
          label: getLessonName(parseInt(segments[3]), parseInt(segments[5])),
          href: `/mondly/categories/${segments[3]}/lessons/${segments[5]}`,
        }
      );

      break;
    case "vocabularies":
      breadcrumbs.push(
        {
          label: "المفردات",
          href: undefined,
        },
        {
          label: getVocabularyName(parseInt(segments[3])),
          href: `/mondly/categories/${segments[3]}/vocabulary/${segments[5]}`,
        }
      );

      break;
    case "dialogues":
      breadcrumbs.push(
        {
          label: "المحادثة",
          href: undefined,
        },
        {
          label: getDialogueName(parseInt(segments[3])),
          href: `/mondly/categories/${segments[3]}/dialogues/${segments[5]}`,
        }
      );
      break;
    default:
      break;
  }
  return breadcrumbs;
}

function isStringInteger(str: string): boolean {
  const num = parseInt(str);
  return !isNaN(num) && String(num) === str; // Ensure the entire string was parsed as an integer
}

// function to get the name of the category
function getCategoryName(id: number) {
  const actualIndex = id - 1;
  const categoryName = namesData.data[actualIndex].category.name;
  return categoryName || "";
}

function getLessonName(cId: number, lId: number) {
  const actualCategoryIndex = cId - 1;
  const lessonName = namesData.data[actualCategoryIndex].lessons.find(
    (lesson) => lesson.id === lId
  )?.name;
  return lessonName || "";
}
function getVocabularyName(id: number) {
  const actualCategoryIndex = id - 1;
  const vocabularyName = namesData.data[actualCategoryIndex].vocabularies.find(
    (vocabulary) => vocabulary.id === id
  )?.name;
  return vocabularyName || "";
}
function getDialogueName(id: number) {
  const actualCategoryIndex = id - 1;
  const dialogueName = namesData.data[actualCategoryIndex].dialogues[0].name;
  return dialogueName || "";
}
