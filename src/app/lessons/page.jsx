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
  // console.log(params);
  // const token = await getTokenServer();
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
    <section className="mx-auto max-w-7xl px-4 py-2">

        {/* Header */}
        {/* <div className="mb-6 text-center">

          <h1 className="text-4xl font-bold">
            Life Lessons
          </h1>

          <p className="mt-3 text-default-500">
            Discover wisdom shared by people from
            different walks of life.
          </p>

        </div> */}
        <div className="relative overflow-hidden rounded bg-gradient-to-br from-sky-50 via-white to-cyan-50 px-6 py-4 text-center">

  {/* Decorative glow */}
  <div className="absolute -left-12 top-0 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl"></div>
  <div className="absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl"></div>

  <div className="relative z-10">

    <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
      ✨ Inspiring Stories
    </span>

    <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-800 md:text-5xl">
      Life Lessons
      <span className="block bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">
        That Inspire Growth
      </span>
    </h1>

    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
      Discover wisdom, experiences, and unforgettable moments shared by people
      from different walks of life—each story carries a lesson worth remembering.
    </p>

  </div>

</div>

        <LessonToolbar />

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
