'use server'

import { getLessons } from "@/lib/actions/lessons";
import LessonCard from "@/components/LessonCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LessonToolbar from "@/components/lessons/LessonToolbar";
import Pagination from "@/components/lessons/Pagination";


export default async function LessonsPage({ searchParams, }) {
  // const page = await searchParams;
  // console.log(page);

  const params = await searchParams;
  console.log(params);
  const result = await getLessons(params);
  const lessons = result.lessons;
  // const lessons = await getLessons(params);
  const pagination = result.pagination;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isPremiumUser =
  session?.user?.plan === "premium";  
  


  return (
    <>
    <LessonToolbar />


    {/* <section className="mx-auto max-w-7xl px-4 py-10">
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
            isPremiumUser={isPremiumUser}
          />
        ))}
      </div>
    </section> */}

    <section className="mx-auto max-w-7xl px-4 py-10">

        {/* Header */}
        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold">
            Life Lessons
          </h1>

          <p className="mt-3 text-default-500">
            Discover wisdom shared by people from
            different walks of life.
          </p>

        </div>

        {/* Results */}
        {lessons.length === 0 ? (
          <div className="py-20 text-center">

            <h2 className="text-2xl font-semibold">
              No lessons found
            </h2>
            <p className="mt-2 text-default-500">
              Try changing your search or category filter.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {lessons.map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                isPremiumUser={isPremiumUser}
              />
            ))}

          </div>
        )}
         {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        )}

      </section>
    </>
  );
}
