"use client";

import { Card } from "@heroui/react";
import {
  SquareChartBar,
  Bookmark,
  Globe,
} from "@gravity-ui/icons";

export default function DashboardStats({
  totalLessons = 0,
  totalFavorites = 0,
  publicLessons = 0,
}) {
  const stats = [
    {
      title: "Total Lessons",
      value: totalLessons,
      icon: SquareChartBar,
      bg: "bg-sky-50",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      title: "Saved Favorites",
      value: totalFavorites,
      icon: Bookmark,
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Public Lessons",
      value: publicLessons,
      icon: Globe,
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className={`${item.bg} rounded-2xl border border-default-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-default-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold text-slate-800">
                  {item.value}
                </h2>

              </div>

              <div
                className={`${item.iconBg} flex h-16 w-16 items-center justify-center rounded-2xl`}
              >
                <Icon
                  className={`h-8 w-8 ${item.iconColor}`}
                />
              </div>

            </div>

          </Card>
        );
      })}

    </div>
  );
}