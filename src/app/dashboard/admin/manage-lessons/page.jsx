import {
  getAdminLessons,
} from "@/lib/actions/lessons";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ManageLessonsTable from "@/components/admin/ManageLessonsTable";
import AddAdminLesson from "@/components/admin/AddAdminLesson";
import Link from "next/link";
import { Button } from "@heroui/react";


export default async function ManageLessonsPage({
  searchParams,
}) {
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

  const params = await searchParams;

  const data =
    await getAdminLessons(params);


  return (
    <section className="mx-auto max-w-[1600px] p-6">

      {/* <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Manage Lessons
        </h1>

        <p className="mt-2 text-default-500">
          Review, moderate, and manage
          lessons submitted by users.
        </p>

      </div> */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

  <div>
    <h1 className="text-3xl font-bold">
      Manage Lessons
    </h1>

    <p className="mt-2 text-default-500">
      Review, moderate, and manage lessons
      submitted by users.
    </p>
  </div>  

<Link href="/dashboard/add-lesson">
  <Button color="primary">
    Create Lesson
  </Button>
</Link>

  {/* <AddAdminLesson /> */}

</div>


      {/* Stats */}

      <div className="mb-8 grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <p className="text-sm text-default-500">
            Public Lessons
          </p>

          <p className="mt-2 text-3xl font-bold">
            {data.stats.publicLessons}
          </p>

        </div>


        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <p className="text-sm text-default-500">
            Private Lessons
          </p>

          <p className="mt-2 text-3xl font-bold">
            {data.stats.privateLessons}
          </p>

        </div>

      </div>


      <ManageLessonsTable
        initialLessons={
          data.lessons
        }
      />

    </section>
  );
}