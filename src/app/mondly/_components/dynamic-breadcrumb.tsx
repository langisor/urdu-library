"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; 
// Define the structure for a single breadcrumb item in the path.
export interface BreadcrumbItem {
  id: number;
  name: string;
  
}
interface BreadcrumbProps {
    items: BreadcrumbItem[];
}
export  function DynamicBreadcrumb({items}: BreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        <BreadcrumbLink href={`/mondly/categories/${item.id}`}>
                            {item.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );   

}