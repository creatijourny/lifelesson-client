"use client";

import { Card } from "@heroui/react";
import {
  SquareChartBar,
  Bookmark,
  Globe,
} from "@gravity-ui/icons";
import { motion } from "motion/react"

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
             
              <motion.div
  whileHover={{
    scale: 1.06,
    y: -8,
    rotateX: 4,
    rotateY: -3,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
    },
  }}
  whileTap={{ scale: 0.96 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.5,
    ease: "easeOut",
  }}
  className="rounded-2xl p-4 transition-shadow hover:bg-gradient-to-br hover:from-sky-50 hover:to-cyan-50 hover:shadow-xl hover:shadow-cyan-200/50"
>
  <motion.p
    className="text-sm font-semibold uppercase tracking-wide text-slate-500"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.1 }}
  >
    {item.title}
  </motion.p>

  <motion.h2
    className="mt-2 text-4xl font-extrabold text-slate-800"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      delay: 0.2,
      type: "spring",
      stiffness: 260,
    }}
  >
    {item.value}
  </motion.h2>
</motion.div>


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