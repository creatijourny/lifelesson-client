'use server'

import { getLessons } from "@/lib/actions/lessons";
import LessonCard from "@/components/LessonCard";

export default async function LessonsPage() {
  const lessons = await getLessons();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">
          Life Lessons
        </h1>

        <p className="mt-3 text-default-500">
          Discover wisdom shared by people from
          different walks of life.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
          />
        ))}
      </div>
    </section>
  );
}