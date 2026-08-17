import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { auth } from "@/lib/auth";
import { getLesson } from "@/lib/actions/lessons";

import UpdateLessonForm from "@/components/dashboard/user/UpdateLessonForm";

export default async function UpdateLessonPage({
  params,
}) {
  const { id } = await params;

  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session) {
    notFound();
  }

  const lesson = await getLesson(id);
  console.log("Lesson:", lesson);
  console.log("Author:", lesson?.authorId);
  console.log("Session user:", session.user.id);

  if (!lesson) {
    notFound();
  }
  
  if (
    lesson.authorId !==
    session.user.id
  ) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Update Lesson
      </h1>

      <UpdateLessonForm
        lesson={lesson}
        session={session}
      />

    </section>
  );
}