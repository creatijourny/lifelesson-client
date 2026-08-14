import {
  getReportedLessons,
} from "@/lib/actions/lessons";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ReportedLessonsTable from "@/components/admin/ReportedLessonsTable";

export default async function ReportedLessonsPage() {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const data =
    await getReportedLessons();

  return (
    <section className="mx-auto max-w-[1600px] p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Reported Lessons
        </h1>

        <p className="mt-2 text-default-500">
          Review reported content and take
          appropriate moderation actions.
        </p>
      </div>

      <ReportedLessonsTable
        initialLessons={
          data.lessons
        }
      />

    </section>
  );
}