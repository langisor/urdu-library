"use client";
import React, { useMemo } from "react";
// This import is a placeholder, as the actual `next/navigation` module
// is not available in this specific runtime environment.
// In a real Next.js application, this would resolve correctly.
// To avoid compilation errors in this environment, we are commenting it out
// and providing a mock for demonstration purposes.
// import { usePathname } from "next/navigation";
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

import { names } from "./data";
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
  // Mock `usePathname` for this environment to prevent compilation errors.
  const usePathname = () => "/categories/1/lessons/101"; // Example path
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
