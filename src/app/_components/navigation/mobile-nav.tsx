"use client";

import { X, ChevronDown } from "lucide-react";
import { NavItem } from './types';
import { NavItemComponent } from './nav-item';

interface MobileNavProps {
  mainNavItems: NavItem[];
  currentPath: string;
  isParentActive: (item: NavItem) => boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  openSubMenu: string | null;
  toggleSubMenu: (title: string) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  mainNavItems,
  currentPath,
  isParentActive,
  isMobileMenuOpen,
  toggleMobileMenu,
  openSubMenu,
  toggleSubMenu,
  menuRef,
}) => {
  return (
    // Use a higher z-index to ensure it's on top of the header
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 h-full w-64 md:hidden bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out z-[60] ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button
            onClick={toggleMobileMenu}
            aria-label="Close menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {mainNavItems.map((item) => {
            // Explicitly check for the root path for the "Home" link
            const isHomeActive = item.href === "/" && currentPath === "/";
            const isOtherLinkActive =
              item.href !== "/" &&
              (currentPath === item.href || isParentActive(item));
            const isActive = isHomeActive || isOtherLinkActive;

            const hasSubItems = !!item.items && item.items.length > 0;
            return (
              <div
                key={item.title}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                {hasSubItems ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(item.title)}
                      className={`w-full flex justify-between items-center py-3 px-4 text-lg font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      aria-expanded={openSubMenu === item.title}
                      aria-controls={`submenu-${item.title.toLowerCase()}`}
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          openSubMenu === item.title || isActive
                            ? "rotate-180"
                            : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {openSubMenu === item.title && (
                      <div
                        id={`submenu-${item.title.toLowerCase()}`}
                        role="menu"
                        className="bg-gray-50 dark:bg-gray-800 py-2"
                      >
                        {item.items?.map((subItem) => (
                          <NavItemComponent
                            key={subItem.title}
                            item={subItem}
                            onClick={toggleMobileMenu}
                            isActive={subItem.href === currentPath}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavItemComponent
                    item={item}
                    onClick={toggleMobileMenu}
                    isActive={item.href === currentPath}
                  />
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};