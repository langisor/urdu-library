"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NavItem } from './types';
import { NavItemComponent } from './nav-item';

interface DesktopNavProps {
  mainNavItems: NavItem[];
  currentPath: string;
  isParentActive: (item: NavItem) => boolean;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ 
  mainNavItems, 
  currentPath, 
  isParentActive 
}) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      {mainNavItems.map((item) => {
        // Explicitly check for the root path for the "Home" link
        const isHomeActive = item.href === "/" && currentPath === "/";
        const isOtherLinkActive =
          item.href !== "/" &&
          (currentPath === item.href || isParentActive(item));
        const isActive = isHomeActive || isOtherLinkActive;

        const hasSubItems = !!item.items && item.items.length > 0;

        return (
          <div key={item.title} className="relative group">
            <Link
              href={item.href}
              className={`text-lg font-medium transition-colors duration-200 flex items-center ${
                isActive ? "text-blue-500" : "hover:text-blue-500"
              }`}
              // ARIA attributes for accessibility
              aria-haspopup={hasSubItems ? "true" : undefined}
              aria-expanded={false} // This will be handled by CSS hover for now
            >
              {item.title}
              {hasSubItems && (
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-200 ${
                    isActive ? "rotate-180" : "group-hover:rotate-180"
                  }`}
                  aria-hidden="true"
                />
              )}
            </Link>
            {hasSubItems && (
              <div
                className="absolute top-full left-0 z-50 w-48 mt-2 opacity-0 group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out invisible bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                role="menu"
              >
                {item.items?.map((subItem) => (
                  <NavItemComponent
                    key={subItem.title}
                    item={subItem}
                    isActive={subItem.href === currentPath}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};