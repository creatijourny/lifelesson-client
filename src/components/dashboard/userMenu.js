import {
  House,
  SquarePlus,
  BookOpen,
  Heart,
  Person,
} from "@gravity-ui/icons";

export const userMenu = [
  {
    title: "Home",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "Add Lesson",
    href: "/dashboard/add-lesson",
    icon: SquarePlus,
  },
  {
    title: "My Lessons",
    href: "/dashboard/my-lessons",
    icon: BookOpen,
  },
  {
    title: "My Favorites",
    href: "/dashboard/my-favorites",
    icon: Heart,
  },
  {
    title: "User Profile",
    href: "/dashboard/profile",
    icon: Person,
  },
];