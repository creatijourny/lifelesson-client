import {
    House,
  Persons,
  BookOpen,
  TriangleExclamation,
  Person,
} from "@gravity-ui/icons";

export const adminMenu = [
  {
    title: "Home",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "Manage Users",
    href: "/dashboard/admin/manage-users",
    icon: Persons,
  },
  {
    title: "Manage Lessons",
    href: "/dashboard/admin/manage-lessons",
    icon: BookOpen,
  },
  {
    title: "Reported Lessons",
    href: "/dashboard/admin/reported-lessons",
    icon: TriangleExclamation,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: Person,
  },
];