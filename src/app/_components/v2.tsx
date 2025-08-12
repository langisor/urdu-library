"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { mainNavItems } from "./navigation/data";
import { DesktopNav } from "./navigation/desktop-nav";
import { MobileNav } from "./navigation/mobile-nav";
import { useNavigation } from "./navigation/useNavigation";
import { isParentActive } from "./navigation/utils";

export default function MainSiteNavigation() {
  const currentPath = usePathname();
  const {
    isMobileMenuOpen,
    openSubMenu,
    menuRef,
    toggleMobileMenu,
    toggleSubMenu,
  } = useNavigation();

  const handleIsParentActive = (item: any) => isParentActive(item, currentPath);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-inter mb-10">
      <header className="fixed top-0 left-0 w-full z-[50] shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {isMobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Brand
          </Link>
          <DesktopNav
            mainNavItems={mainNavItems}
            currentPath={currentPath}
            isParentActive={handleIsParentActive}
          />
        </nav>
      </header>

      {/* Semi-transparent overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 transition-opacity duration-300 z-[55]"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      <MobileNav
        mainNavItems={mainNavItems}
        currentPath={currentPath}
        isParentActive={handleIsParentActive}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        openSubMenu={openSubMenu}
        toggleSubMenu={toggleSubMenu}
        menuRef={menuRef}
      />
    </div>
  );
}
