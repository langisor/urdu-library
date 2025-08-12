"use client";

import React from "react";
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

// This is a custom breadcrumb component for your Next.js application.
// It dynamically generates navigation links based on the current URL pathname.
//
// To use this, simply place <DynamicBreadcrumb /> in your layout or page components.
// It requires the 'use client' directive because it uses the usePathname hook.
// It is designed to work with your specific file structure and routing.
//
export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // A helper function to format the segment text for display.
  // It attempts to make dynamic segments (e.g., [cid]) more readable.
  const formatSegment = (segment: string, index: number) => {
    // Handle the root path.
    if (index === 0) {
      return "Home";
    }
    // Check if the previous segment was a category, lesson, or vocabulary.
    // This allows us to provide more context.
    const previousSegment = pathSegments[index - 1];

    // For the category dashboard
    if (previousSegment === "categories" && !isNaN(parseInt(segment))) {
      return `Category ${segment}`;
    }

    // For the lesson page
    if (previousSegment === "lessons" && !isNaN(parseInt(segment))) {
      return `Lesson ${segment}`;
    }

    // For the vocabulary page
    if (previousSegment === "vocabulary" && !isNaN(parseInt(segment))) {
      return `Vocabulary ${segment}`;
    }

    // Default to capitalizing the first letter of the segment.
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment: string, index: number) => {
          const isLastSegment = index === pathSegments.length - 1;
          const currentPath = `/${pathSegments.slice(0, index + 1).join("/")}`;

          return (
            <React.Fragment key={currentPath}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLastSegment ? (
                  <BreadcrumbPage>
                    {formatSegment(segment, index)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={currentPath}>
                      {formatSegment(segment, index)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
