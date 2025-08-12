"use client";
import React, { useMemo } from "react";
// This import is a placeholder, as the actual `next/navigation` module
// is not available in this specific runtime environment.
// In a real Next.js application, this would resolve correctly.
// To avoid compilation errors in this environment, we are commenting it out
// and providing a mock for demonstration purposes.
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// The local import path needs to be adjusted based on the file structure.
// This path is a placeholder and should be verified in a real project.
// The import is mocked to prevent compilation errors in this environment.
// In a real Next.js app, this would be a regular import.
// For now, the names and getParentName are defined locally.
const names = [
    {
        id: 1,
        name: "مرحبا",
        lessons: [
            { id: 101, name: "أسرتي", parentName: "مرحبا" },
            { id: 102, name: "التحيات", parentName: "مرحبا" },
            { id: 103, name: "مقابلة الناس", parentName: "مرحبا" },
            { id: 104, name: "أنا لدي ...", parentName: "مرحبا" },
            { id: 105, name: "أنا أشرب ...", parentName: "مرحبا" },
            { id: 106, name: "المقدمات", parentName: "مرحبا" }
        ],
        vocabularies: [
            { id: 101, name: "المفردات", parentName: "مرحبا" }
        ],
        dialogues: [
            { id: 101, name: "مرحبًا", parentName: "مرحبا" }
        ]
    },
    {
        id: 2,
        name: "الأسرة",
        lessons: [
            { id: 201, name: "الوالدان والأطفال", parentName: "الأسرة" },
            { id: 202, name: "الأسرة والحيوانات الأليفة", parentName: "الأسرة" },
            { id: 203, name: "الأجداد", parentName: "الأسرة" },
            { id: 204, name: "الأسرة والأصدقاء", parentName: "الأسرة" },
            { id: 205, name: "الأقارب", parentName: "الأسرة" },
            { id: 206, name: "أسرتي", parentName: "الأسرة" }
        ],
        vocabularies: [
            { id: 201, name: "المفردات", parentName: "الأسرة" }
        ],
        dialogues: [
            { id: 201, name: "أسرتي", parentName: "الأسرة" }
        ]
    },
    {
        id: 3,
        name: "البلدان واللغات",
        lessons: [
            { id: 301, name: "اللغات 1", parentName: "البلدان واللغات" },
            { id: 302, name: "اللغات 2", parentName: "البلدان واللغات" },
            { id: 303, name: "اللغات 3", parentName: "البلدان واللغات" },
            { id: 304, name: "الجنسيات", parentName: "البلدان واللغات" },
            { id: 305, name: "من أين أنت؟", parentName: "البلدان واللغات" },
            { id: 306, name: "البلدان والمدن", parentName: "البلدان واللغات" }
        ],
        vocabularies: [
            { id: 301, name: "المفردات", parentName: "البلدان واللغات" }
        ],
        dialogues: [
            { id: 301, name: "سعدتُ بلقائك!", parentName: "البلدان واللغات" }
        ]
    },
    {
        id: 4,
        name: "الرومانسية",
        lessons: [
            { id: 401, name: "الإطراءات", parentName: "الرومانسية" },
            { id: 402, name: "العلاقات", parentName: "الرومانسية" },
            { id: 403, name: "الزواج", parentName: "الرومانسية" },
            { id: 404, name: "استقبال زفاف", parentName: "الرومانسية" },
            { id: 405, name: "الخروج 1", parentName: "الرومانسية" },
            { id: 406, name: "الخروج 2", parentName: "الرومانسية" }
        ],
        vocabularies: [
            { id: 401, name: "المفردات", parentName: "الرومانسية" }
        ],
        dialogues: [
            { id: 401, name: "طلب الخروج مع أحدهم", parentName: "الرومانسية" }
        ]
    },
    {
        id: 5,
        name: "الطعام والمشروبات",
        lessons: [
            { id: 501, name: "الفاكهة", parentName: "الطعام والمشروبات" },
            { id: 502, name: "المشروبات", parentName: "الطعام والمشروبات" },
            { id: 503, name: "الطعام", parentName: "الطعام والمشروبات" },
            { id: 504, name: "الخضروات", parentName: "الطعام والمشروبات" },
            { id: 505, name: "الوجبات", parentName: "الطعام والمشروبات" },
            { id: 506, name: "قائمة التسوق", parentName: "الطعام والمشروبات" }
        ],
        vocabularies: [
            { id: 501, name: "المفردات", parentName: "الطعام والمشروبات" }
        ],
        dialogues: [
            { id: 501, name: "قائمة التسوق", parentName: "الطعام والمشروبات" }
        ]
    },
    {
        id: 6,
        name: "الطقس",
        lessons: [
            { id: 601, name: "ألوان الطبيعة", parentName: "الطقس" },
            { id: 602, name: "كيف الطقس اليوم؟", parentName: "الطقس" },
            { id: 603, name: "الطقس والملابس", parentName: "الطقس" },
            { id: 604, name: "التعابير الزمنية", parentName: "الطقس" },
            { id: 605, name: "الفصول", parentName: "الطقس" },
            { id: 606, name: "درجات الحرارة", parentName: "الطقس" }
        ],
        vocabularies: [
            { id: 601, name: "المفردات", parentName: "الطقس" }
        ],
        dialogues: [
            { id: 601, name: "الطقس", parentName: "الطقس" }
        ]
    },
    {
        id: 7,
        name: "الرياضة والهوايات",
        lessons: [
            { id: 701, name: "الرياضة", parentName: "الرياضة والهوايات" },
            { id: 702, name: "الأنشطة", parentName: "الرياضة والهوايات" },
            { id: 703, name: "الهوايات", parentName: "الرياضة والهوايات" },
            { id: 704, name: "الموسيقى", parentName: "الرياضة والهوايات" },
            { id: 705, name: "الحديقة", parentName: "الرياضة والهوايات" },
            { id: 706, name: "الأدوات المنزلية", parentName: "الرياضة والهوايات" }
        ],
        vocabularies: [
            { id: 701, name: "المفردات", parentName: "الرياضة والهوايات" }
        ],
        dialogues: [
            { id: 701, name: "ماذا تفعل في أوقات الفراغ؟", parentName: "الرياضة والهوايات" }
        ]
    },
    {
        id: 8,
        name: "العمل والدراسة",
        lessons: [
            { id: 801, name: "المدرسة", parentName: "العمل والدراسة" },
            { id: 802, name: "الدراسة", parentName: "العمل والدراسة" },
            { id: 803, name: "العمل", parentName: "العمل والدراسة" },
            { id: 804, name: "المهن", parentName: "العمل والدراسة" },
            { id: 805, name: "العمل 2", parentName: "العمل والدراسة" },
            { id: 806, name: "المكتب", parentName: "العمل والدراسة" }
        ],
        vocabularies: [
            { id: 801, name: "المفردات", parentName: "العمل والدراسة" }
        ],
        dialogues: [
            { id: 801, name: "المهن", parentName: "العمل والدراسة" }
        ]
    },
    {
        id: 9,
        name: "السفر والمغامرات",
        lessons: [
            { id: 901, name: "السيارة", parentName: "السفر والمغامرات" },
            { id: 902, name: "الأماكن", parentName: "السفر والمغامرات" },
            { id: 903, name: "الأماكن 2", parentName: "السفر والمغامرات" },
            { id: 904, name: "المحلات", parentName: "السفر والمغامرات" },
            { id: 905, name: "المهن", parentName: "السفر والمغامرات" },
            { id: 906, name: "العمل والدراسة", parentName: "السفر والمغامرات" }
        ],
        vocabularies: [
            { id: 901, name: "المفردات", parentName: "السفر والمغامرات" }
        ],
        dialogues: [
            { id: 901, name: "تجارب الماضي", parentName: "السفر والمغامرات" }
        ]
    }
];

function getParentName(elementId: number): string | null {
    for (const category of names) {
        const lesson = category.lessons.find(l => l.id === elementId);
        if (lesson) {
            return lesson.parentName;
        }

        const vocabulary = category.vocabularies.find(v => v.id === elementId);
        if (vocabulary) {
            return vocabulary.parentName;
        }

        const dialogue = category.dialogues.find(d => d.id === elementId);
        if (dialogue) {
            return dialogue.parentName;
        }
    }
    return null;
}


// Define the structure for a single breadcrumb item in the path.
interface BreadcrumbItem {
  id: number;
  name: string;
  path: string; // Add a path property to store the full dynamic path
}

/**
 * BreadcrumbComponent dynamically generates a breadcrumb trail by parsing
 * a pathname string. It now uses the new data structure to find names and parent names.
 */
const BreadcrumbComponent = () => {
  const pathname = usePathname();
  const breadcrumbItems = useMemo(() => {
    const spilittedPaths = pathname.split("/");
    const pathSegments = spilittedPaths.filter(Boolean);
   
    const items: BreadcrumbItem[] = [];
    let currentPath = "";

    // Assuming a path structure like: /categories/1/lessons/101
    // The loop iterates over pairs of segments (e.g., 'categories' and '1')
    for (let i = 0; i < pathSegments.length; i += 2) {
      const type = pathSegments[i];
      const id = parseInt(pathSegments[i + 1], 10);

      if (!id || isNaN(id)) continue;
      
      // Build the full path dynamically
      currentPath += `/${type}/${id}`;

      // Handle the top-level category breadcrumb
      if (type === "categories") {
          const category = names.find(c => c.id === id);
          if (category) {
              items.push({ id, name: category.name, path: currentPath });
          }
      }
      // Handle nested items like lessons, vocabularies, and dialogues
      else {
          let nestedItem = null;
          let parentCategory = null;

          // Find the nested item and its parent category in a single pass
          for (const category of names) {
            // Ensure category[type] exists and is an array before calling find
            const foundItem = Array.isArray(category[type as keyof typeof category])
                ? (category[type as keyof typeof category] as any[]).find((item: any) => item.id === id)
                : undefined;
            if (foundItem) {
              nestedItem = foundItem;
              parentCategory = category;
              break;
            }
          }
          
          if (nestedItem && parentCategory) {
              // Add the parent category as the first breadcrumb item if it's not already there
              if (items.length === 0 || items[0].id !== parentCategory.id) {
                  items.unshift({id: parentCategory.id, name: parentCategory.name, path: `/categories/${parentCategory.id}`});
              }

              if (nestedItem.name) {
                  items.push({ id, name: nestedItem.name, path: currentPath });
              }
          }
      }
    }
    return items;
  }, [pathname]);

  if (breadcrumbItems.length === 0) {
    console.log("No breadcrumb items found");
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-2">
            <BreadcrumbItem>
              <BreadcrumbLink href={item.path}>
                {item.name || "N/A"}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
