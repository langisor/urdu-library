"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const pathNames = pathname.split("/").filter((name) => name !== "");
  const breadCrumbItems = [];
  for (let i = 0; i < pathNames.length; i++) {
    breadCrumbItems.push({
      id: i,
      name: pathNames[i],
      href: `/${pathNames.slice(0, i + 1).join("/")}`,
    });
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink asChild>
              <Link href={item.href}>{item.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{pathNames[pathNames.length-1]}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
