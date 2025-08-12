"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { names } from "@/app/mondly/_lib/breadcrub-data";

interface BreadcrumbSegment {
  name: string;
  href: string;
  isCurrentPage?: boolean;
}

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbSegment[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbSegment[] = [];

    // Always start with Home if not on home page
    if (pathname !== "/") {
      breadcrumbs.push({
        name: "الرئيسية",
        href: "/",
      });
    }

    // Handle mondly routes
    if (segments.includes("mondly")) {
      const mondlyIndex = segments.indexOf("mondly");

      // Add Mondly root
      breadcrumbs.push({
        name: "الخريطة",
        href: "/mondly",
      });

      // Handle categories
      if (
        segments[mondlyIndex + 1] === "categories" &&
        segments[mondlyIndex + 2]
      ) {
        const categoryId = parseInt(segments[mondlyIndex + 2]);
        const category = names.find((cat) => cat.id === categoryId);

        if (category) {
          breadcrumbs.push({
            name: category.name,
            href: `/mondly/categories/${categoryId}`,
          });
        
          const subcategory = segments[mondlyIndex + 3];          // Handle subcategories (lessons, vocabulary, dialogue)
          if (subcategory) {
            let subcategoryName =  subcategory;
            // Capitalize and translate common subcategories
            switch (subcategory) {
              case "lessons":
                subcategoryName = "الدروس";
                break;

              case "vocabulary":
                subcategoryName = "المفردات";
                break;
              case "dialogue":
                subcategoryName = "الحوار";
                break;
            }

            breadcrumbs.push({
              name: subcategoryName,
              href: `/mondly/categories/${categoryId}/${subcategory}`,
            });

            // Handle specific lesson/vocabulary/dialogue items
            if (segments[mondlyIndex + 4] && subcategory) {
              const itemId = parseInt(segments[mondlyIndex + 4]);
              let itemName = segments[mondlyIndex + 4];

              // Find the specific item name
              if (subcategory === "lessons" && category.lessons) {
                const lesson = category.lessons.find(
                  (lesson) => lesson.id === itemId
                );
                if (lesson) itemName = lesson.name;
              } else if (
                subcategory === "vocabulary" &&
                category.vocabularies
              ) {
                const vocab = category.vocabularies.find(
                  (vocab) => vocab.id === itemId
                );
                if (vocab) itemName = vocab.name;
              } else if (subcategory === "dialogue" && category.dialogues) {
                const dialogue = category.dialogues.find(
                  (dialogue) => dialogue.id === itemId
                );
                if (dialogue) itemName = dialogue.name;
              }

              breadcrumbs.push({
                name: itemName,
                href: `/mondly/categories/${categoryId}/${subcategory}/${itemId}`,
                // href: subcategoryHref ,

                isCurrentPage: true,
              });
            } else {
              // Mark subcategory as current page if it's the last segment
              breadcrumbs[breadcrumbs.length - 1].isCurrentPage = true;
            }
          } else {
            // Mark category as current page if it's the last segment
            breadcrumbs[breadcrumbs.length - 1].isCurrentPage = true;
          }
        }
      }
    } else {
      // Handle other routes by capitalizing segments
      segments.forEach((segment, index) => {
        const href = "/mondly" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        breadcrumbs.push({
          name: segment.charAt(0).toUpperCase() + segment.slice(1),
          href,
          isCurrentPage: isLast,
        });
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {breadcrumb.isCurrentPage ? (
                <span className="max-w-20 truncate md:max-w-none bg-blue-500 text-white border-2 rounded-xl p-2">
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="max-w-20 truncate md:max-w-none"
                >
                  {breadcrumb.name}
                </Link>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
