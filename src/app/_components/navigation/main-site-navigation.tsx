"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Shadcn UI components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
// import app logo
import Logo from "@/assets/app.png";

// Lucide React for icons
import { Menu } from "lucide-react";

// The navigation data from your data.ts file
// NOTE: Make sure this path is correct for your project structure
import { mainNavItems } from "./data";
import { NavItem } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

// Helper function to check if a link is active
const isActive = (pathname: string, href: string) => {
  // Check if the current path matches the href
  const isMatches = pathname === href;

  // Check if the href is a parent or child of the current path
  const isParentOrChild = pathname.startsWith(`${href}/`);

  return isMatches || isParentOrChild;
};

// Main header component

export default function MainHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile(); // default breakpoint is 768
  // style active link
  const activeLinkStyle = "text-primary font-bold bg-blue-500";

  // handle click event by closing the mobile menu
  const handleClosingSheet = () => {
    setOpen(false);
  };

  console.log("isMobile: ", isMobile);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center space-x-4 ">
          {/* Logo or site title */}
          <Link
            href="/"
            className="flex flex-row space-x-2 items-end   text-xl font-bold"
          >
            <Image
              src={Logo}
              // sizes="100vw"
              alt="Logo"
              width={60}
              height={50}
              className="object-contain rounded-xl p-2 w-16 h-16"
            />
          </Link>
          {isMobile && <QuickBookCourseLink />}
          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNavItems.map((item: NavItem) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      // Handle dropdown menu items
                      <>
                        <NavigationMenuTrigger className="data-[state=open]:text-primary data-[state=open]:bg-accent">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-1 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.items.map((subItem: NavItem) => (
                              <li key={subItem.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.href}
                                    className={navigationMenuTriggerStyle({
                                      className: isActive(
                                        pathname,
                                        subItem.href
                                      )
                                        ? activeLinkStyle
                                        : "",
                                    })}
                                    onClick={handleClosingSheet}
                                  >
                                    <div className="text-md font-medium leading-none">
                                      {subItem.title}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      // Handle single link items
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle({
                          className: isActive(pathname, item.href)
                            ? activeLinkStyle
                            : "",
                        })}
                        onClick={handleClosingSheet}
                      >
                        <Link href={item.href}>{item.title}</Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden flex  items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="xs:max-w-full  p-2 flex flex-col"
            >
              <SheetHeader>
                <SheetTitle>Urdu Library</SheetTitle>
                <SheetDescription className="sr-only">
                  Mobile Navigation Menu
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 flex flex-col space-y-4">
                {mainNavItems.map((item: NavItem) => (
                  <div key={item.title}>
                    {item.items ? (
                      // Collapsible menu for mobile
                      <div className="pl-2 ">
                        <p className="text-lg font-semibold">{item.title}</p>
                        <Separator className="my-2" />
                        <div className="flex flex-col space-y-2 pl-4">
                          {item.items.map((subItem: NavItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className={`text-base hover:text-primary ${
                                isActive(pathname, subItem.href)
                                  ? activeLinkStyle
                                  : ""
                              }`}
                              onClick={handleClosingSheet}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Single link for mobile
                      <Link
                        href={item.href}
                        className={`text-lg font-semibold  hover:text-primary ${
                          isActive(pathname, item.href) ? activeLinkStyle : ""
                        }`}
                        onClick={handleClosingSheet}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function QuickBookCourseLink() {
  const imgSrc = "/materials/course-book-cover.jpeg";

  return (
    <Link href="/etc/course-book" className="flex items-center justify-center">
      <Image
        src={imgSrc}
        sizes="100vw"
        alt="Course Book"
        width={60}
        height={50}
        className="object-contain rounded-xl p-2 w-16 h-16 cursor-pointer"
      />
    </Link>
  );
}
