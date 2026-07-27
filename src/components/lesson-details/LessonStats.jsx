"use client";

import { Card } from "@heroui/react";
import {
  Heart,
  Bookmark,  
  Comment,
} from "@gravity-ui/icons";

export default function LessonStats({
  lesson,
  favoritesCount = 0,
  commentsCount = 0,
}) {

  const likesCount = lesson?.likes?.length || 0;

  const stats = [
    {
      icon: Heart,
      label: "Likes",
      value: likesCount,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      icon: Bookmark,
      label: "Favorites",
      value: favoritesCount,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: Comment,
      label: "Comments",
      value: commentsCount,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
  ];

  return (
    <Card className="mt-6 rounded-2xl border border-default-200 p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Engagement
        </h2>

        <p className="text-sm text-default-500">
          Community interaction on this lesson.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`${item.bg} rounded-xl p-5 flex flex-col items-center justify-center`}
            >
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow ${item.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="text-2xl font-bold">
                {formatCount(item.value)}
              </h3>

              <p className="mt-1 text-sm text-default-500">
                {item.label}
              </p>
            </div>
          );
        })}

      </div>

    </Card>
  );
}

function formatCount(num) {

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }

  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }

  return num;
}