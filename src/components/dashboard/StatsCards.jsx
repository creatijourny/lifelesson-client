"use client";

import { Card } from "@heroui/react";
import {
  Persons,
  BookOpen,
  TriangleExclamation,
  Star,  
  SquareChartColumn,
} from "@gravity-ui/icons";

const stats = [
  {
    title: "Total Users",
    value: "2,846",
    change: "+12%",
    desc: "Registered users",
    icon: Persons,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    title: "Public Lessons",
    value: "1,528",
    change: "+8%",
    desc: "Published lessons",
    icon: BookOpen,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Flagged Lessons",
    value: "36",
    change: "+4",
    desc: "Pending review",
    icon: TriangleExclamation,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    badge: "bg-red-100 text-red-700",
  },
  {
    title: "Top Contributors",
    value: "127",
    change: "+5%",
    desc: "This month",
    icon: Star,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    badge: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Today's Lessons",
    value: "43",
    change: "+18%",
    desc: "Published today",
    icon: SquareChartColumn,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    badge: "bg-purple-100 text-purple-700",
  },
];

export default function StatsCards() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="border border-default-200 shadow-sm rounded-2xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}
                >
                  <Icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${item.badge}`}
                >
                  {item.change}
                </span>
              </div>

              <h4 className="mt-6 text-sm font-medium text-default-500">
                {item.title}
              </h4>

              <h2 className="mt-2 text-4xl font-bold">
                {item.value}
              </h2>

              <p className="mt-2 text-sm text-default-400">
                {item.desc}
              </p>
            </div>
          </Card>
        );
      })}
    </section>
  );
}