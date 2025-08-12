"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Importing the usePathname hook
import { Menu, X, ChevronDown } from 'lucide-react';

// --- Data types and data ---
interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

const mainNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "Mondly",
    href: "/mondly",
    items: [
      { title: "Start", href: "/mondly" },
      { title: "Categories", href: "/mondly/categories" },
      { title: "Lessons", href: "/mondly/lessons" },
    ],
  },
  {
    title: "ETC",
    href: "/etc",
    items: [
      { title: "Start", href: "/etc" },
      { title: "AI", href: "/etc/ai" },
      { title: "Course Book", href: "/etc/course-book" },
      { title: "Alphabets", href: "/etc/alphabets" },
      { title: "Grammar", href: "/etc/grammar" },
      { title: "Urdu Script Book", href: "/etc/urdu-script-book" },
      { title: "Vocabulary", href: "/etc/vocabulary" },
    ],
  },
];

// --- Sub-component for a single navigation item ---
const NavItemComponent: React.FC<{ item: NavItem; onClick?: () => void; isActive: boolean }> = ({ item, onClick, isActive }) => {
  return (
    <Link
      href={item.href}
      className={`block w-full py-2 px-4 transition-colors duration-200 ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
      onClick={onClick}
    >
      {item.title}
    </Link>
  );
};

// --- Desktop Navigation Component ---
const DesktopNav: React.FC<{ mainNavItems: NavItem[]; currentPath: string; isParentActive: (item: NavItem) => boolean }> = ({ mainNavItems, currentPath, isParentActive }) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      {mainNavItems.map((item) => {
        // Explicitly check for the root path for the "Home" link
        const isHomeActive = item.href === '/' && currentPath === '/';
        const isOtherLinkActive = item.href !== '/' && (currentPath === item.href || isParentActive(item));
        const isActive = isHomeActive || isOtherLinkActive;

        const hasSubItems = !!item.items && item.items.length > 0;
        
        return (
          <div key={item.title} className="relative group">
            <Link 
              href={item.href} 
              className={`text-lg font-medium transition-colors duration-200 flex items-center ${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`}
              // ARIA attributes for accessibility
              aria-haspopup={hasSubItems ? "true" : undefined}
              aria-expanded={false} // This will be handled by CSS hover for now
            >
              {item.title}
              {hasSubItems && <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isActive ? 'rotate-180' : 'group-hover:rotate-180'}`} aria-hidden="true" />}
            </Link>
            {hasSubItems && (
              <div 
                className="absolute top-full left-0 z-50 w-48 mt-2 opacity-0 group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out invisible bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                role="menu"
              >
                {item.items?.map((subItem) => (
                  <NavItemComponent key={subItem.title} item={subItem} isActive={subItem.href === currentPath} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// --- Mobile Navigation Component ---
const MobileNav: React.FC<{
  mainNavItems: NavItem[];
  currentPath: string;
  isParentActive: (item: NavItem) => boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  openSubMenu: string | null;
  toggleSubMenu: (title: string) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}> = ({ mainNavItems, currentPath, isParentActive, isMobileMenuOpen, toggleMobileMenu, openSubMenu, toggleSubMenu, menuRef }) => {
  return (
    // Use a higher z-index to ensure it's on top of the header
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 h-full w-64 md:hidden bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out z-[60] ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={toggleMobileMenu} aria-label="Close menu" className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {mainNavItems.map((item) => {
            // Explicitly check for the root path for the "Home" link
            const isHomeActive = item.href === '/' && currentPath === '/';
            const isOtherLinkActive = item.href !== '/' && (currentPath === item.href || isParentActive(item));
            const isActive = isHomeActive || isOtherLinkActive;

            const hasSubItems = !!item.items && item.items.length > 0;
            return (
              <div key={item.title} className="border-b border-gray-200 dark:border-gray-700">
                {hasSubItems ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(item.title)}
                      className={`w-full flex justify-between items-center py-3 px-4 text-lg font-medium transition-colors duration-200 ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      aria-expanded={openSubMenu === item.title}
                      aria-controls={`submenu-${item.title.toLowerCase()}`}
                    >
                      <span>{item.title}</span>
                      <ChevronDown size={18} className={`transition-transform duration-200 ${openSubMenu === item.title || isActive ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {openSubMenu === item.title && (
                      <div id={`submenu-${item.title.toLowerCase()}`} role="menu" className="bg-gray-50 dark:bg-gray-800 py-2">
                        {item.items?.map((subItem) => (
                          <NavItemComponent key={subItem.title} item={subItem} onClick={toggleMobileMenu} isActive={subItem.href === currentPath} />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavItemComponent item={item} onClick={toggleMobileMenu} isActive={item.href === currentPath} />
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function MainSiteNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentPath = usePathname(); // Using the Next.js hook to get the current path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  // Improved click-outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the menu container
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Also check if the click is not on the toggle button itself
        const toggleButton = document.querySelector('[aria-label="Toggle navigation menu"]');
        if (toggleButton && !toggleButton.contains(event.target as Node)) {
            setIsMobileMenuOpen(false);
        }
      }
    };
    
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const isParentActive = (item: NavItem) => {
    if (item.items) {
      return item.items.some(subItem => subItem.href === currentPath);
    }
    return false;
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-inter mb-10">
      <header className="fixed top-0 left-0 w-full z-[50] shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Brand
          </Link>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} aria-label="Toggle navigation menu" className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
          <DesktopNav mainNavItems={mainNavItems} currentPath={currentPath} isParentActive={isParentActive} />
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
        isParentActive={isParentActive}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        openSubMenu={openSubMenu}
        toggleSubMenu={toggleSubMenu}
        menuRef={menuRef}
      />
  
    </div>
  );
}
