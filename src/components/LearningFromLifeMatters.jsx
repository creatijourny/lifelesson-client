"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Heart, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Preserve Your Wisdom",
    description:
      "Capture meaningful experiences before they fade and build a personal library of lessons for your future self.",
    color: "from-sky-400 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Grow Through Reflection",
    description:
      "Revisiting past experiences helps you recognize patterns, make wiser decisions, and grow with intention.",
    color: "from-indigo-400 to-sky-500",
  },
  {
    icon: Heart,
    title: "Inspire Others",
    description:
      "Your story could become someone else's breakthrough by sharing real experiences that create genuine connections.",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Sparkles,
    title: "Build a Better Future",
    description:
      "Every lesson learned today becomes a stepping stone toward a more confident and resilient tomorrow.",
    color: "from-amber-400 to-orange-500",
  },
];

export default function WhyLearningFmLifeMatters() {
  return (
    <section className="relative overflow-hidden py-8">
      {/* Soft background glow */}
      <div className="absolute left-0 top-10 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl"></div>
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-700">
            🌱 Why It Matters
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.15,
              duration: 0.7,
            }}
            className="mt-5 bg-gradient-to-r from-slate-800 via-sky-700 to-cyan-600 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl"
          >
            Why Learning From Life Matters
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "220px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mx-auto mt-3 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
          />

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Every experience—whether joyful or challenging—holds a lesson that
            can shape a better future. By preserving these moments, we create a
            lasting source of wisdom for ourselves and others.
          </p>
        </motion.div>

        {/* Benefit Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="group rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-7 shadow-sm transition-all hover:shadow-xl hover:shadow-sky-200/40"
              >
                <div
                  className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-bold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}