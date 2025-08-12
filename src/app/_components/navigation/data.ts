import { NavItem } from './types';

export const mainNavItems: NavItem[] = [
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