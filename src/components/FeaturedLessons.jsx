import Link from "next/link";

import { Button } from "@heroui/react";

import LessonCard from "@/components/LessonCard";

import { getFeaturedLessons } from "@/lib/actions/lessons";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { motion } from "motion/react"
import FeaturedSectionHeader from "./FeaturedSectionHeader";

export default async function FeaturedLessons() {
  const lessons =
    await getFeaturedLessons();

  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  const isPremiumUser =
    session?.user?.plan === "premium";

  if (!lessons.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-5 mt-3">

      <div className="mb-4 text-center">

        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 mb-4 text-sm font-semibold text-amber-700">
          ⭐ Editor's Picks
        </span>
        
        {/* <h2 className="mt-3 text-4xl font-extrabold text-slate-800 md:text-5xl">
          Featured Life Lessons
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Carefully selected stories filled
          with wisdom, resilience, and
          unforgettable experiences worth
          exploring.
        </p> */}
        <FeaturedSectionHeader />

      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
            isPremiumUser={isPremiumUser}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link href="/lessons">
          <Button
            radius="full"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 text-white shadow-lg hover:scale-105"
          >
            Explore All Lessons
          </Button>
        </Link>
      </div>

    </section>
  );
}