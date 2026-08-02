"use client";

import Link from "next/link";

import { Card, Button } from "@heroui/react";

import {
  SquarePlus,
  BookOpen,
  Bookmark,
  Person,
} from "@gravity-ui/icons";

export default function QuickActions() {
  const actions = [
    {
      title: "Create Lesson",
      description:
        "Write and publish a new life lesson.",
      href: "/dashboard/create-lesson",
      icon: SquarePlus,
      color: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      title: "My Lessons",
      description:
        "Manage all your published lessons.",
      href: "/dashboard/my-lessons",
      icon: BookOpen,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Favorites",
      description:
        "View your saved favorite lessons.",
      href: "/dashboard/favorites",
      icon: Bookmark,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Profile",
      description:
        "Update your profile information.",
      href: "/dashboard/profile",
      icon: Person,
      color: "bg-violet-50",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <Card className="rounded-2xl border border-default-200 p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <p className="text-sm text-default-500">
          Frequently used dashboard shortcuts.
        </p>

      </div>

      <div className="grid gap-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Card
              key={action.title}
              className="border border-default-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start gap-4">

                <div
                  className={`${action.color} flex h-14 w-14 items-center justify-center rounded-xl`}
                >
                  <Icon
                    className={`h-7 w-7 ${action.iconColor}`}
                  />
                </div>

                <div className="flex-1">

                  <h3 className="font-semibold text-slate-800">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-sm text-default-500">
                    {action.description}
                  </p>

                  <Button
                    as={Link}
                    href={action.href}
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="mt-4"
                  >
                    Open
                  </Button>

                </div>

              </div>

            </Card>
          );
        })}

      </div>

    </Card>
  );
}