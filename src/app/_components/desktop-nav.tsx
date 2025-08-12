"use client";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { mainNavItems } from "./data";
import { NavItemComponent } from "./nav-item";


// --- Desktop Navigation Component ---
const DesktopNav = ({ currentPath, isParentActive }: any) => {
    return (
      <div className="flex items-center space-x-6">
        {mainNavItems.map((item) => {
          const isActive = item.href === currentPath || isParentActive(item);
          return item.items ? (
            <div key={item.title} className="relative group">
              {/* Replace <a> with <Link> in your Next.js project */}
              <a
                href={item.href}
                className={`text-lg font-medium transition-colors duration-200 flex items-center ${
                  isActive ? "text-blue-500" : "hover:text-blue-500"
                }`}
              >
                {item.title}
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-200 ${
                    isParentActive(item) ? "rotate-180" : "group-hover:rotate-180"
                  }`}
                />
              </a>
              <div className="absolute top-full left-0 z-10 w-48 mt-2 opacity-0 group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out invisible bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                {item.items?.map((subItem) => (
                  <NavItemComponent
                    key={subItem.title}
                    item={subItem}
                    isActive={subItem.href === currentPath}
                  />
                ))}
              </div>
            </div>
          ) : (
            <NavItemComponent key={item.title} item={item} isActive={isActive} />
          );
        })}
      </div>
    );
  };