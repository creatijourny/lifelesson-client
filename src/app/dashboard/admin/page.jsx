import { getAdminDashboardData } from "@/lib/actions/lessons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Card,
  Chip,
  Avatar,
} from "@heroui/react";
import LessonGrowthChart from "@/components/dashboard/LessonGrowthChart";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";


export default async function AdminDashboardPage() {

  // -----------------------------
  // Authentication
  // -----------------------------

  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session) {
    redirect("/login");
  }

  // -----------------------------
  // Admin authorization
  // -----------------------------

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  // -----------------------------
  // Dashboard data
  // -----------------------------

  const dashboard =
    await getAdminDashboardData();

    console.log("DASHBOARD DATA:", dashboard);
console.log("LESSON GROWTH:", dashboard.lessonGrowth);
console.log("USER GROWTH:", dashboard.userGrowth);

  const {
    totalUsers,
    totalPublicLessons,
    totalReportedLessons,
    todaysNewLessons,
    mostActiveContributors,
  } = dashboard; 


  return (
    <div className="p-6">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {session.user.name}
        </h1>

        <p className="mt-2 text-default-500">
          Here's what's happening on
          LifeLesson today.
        </p>
      </div>

      {/* Analytics Cards */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {/* Users */}

        <Card className="p-6 border">
          <p className="text-sm text-default-500">
            Total Users
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalUsers}
          </p>
        </Card>

        {/* Public Lessons */}

        <Card className="p-6 border">
          <p className="text-sm text-default-500">
            Public Lessons
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalPublicLessons}
          </p>
        </Card>

        {/* Reports */}

        <Card className="p-6 border">
          <p className="text-sm text-default-500">
            Reported Lessons
          </p>

          <p className="mt-2 text-3xl font-bold text-danger">
            {totalReportedLessons}
          </p>
        </Card>

        {/* Today's Lessons */}

        <Card className="p-6 border">
          <p className="text-sm text-default-500">
            Today's New Lessons
          </p>

          <p className="mt-2 text-3xl font-bold">
            {todaysNewLessons}
          </p>
        </Card>

      </div>

      {/* Most Active Contributors */}

      <Card className="mt-8 p-6">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-xl font-semibold">
              Most Active Contributors
            </h2>

            <p className="text-sm text-default-500 mt-1">
              Contributors with the most
              published lessons.
            </p>
          </div>

        </div>

        <div className="space-y-4">

          {mostActiveContributors.length ===
          0 ? (
            <p className="text-default-500">
              No contributors found.
            </p>
          ) : (

            mostActiveContributors.map(
              (contributor, index) => (

                <div
                  key={
                    contributor.userId
                  }
                  className="flex items-center justify-between gap-4 rounded-xl border p-4"
                >

                  <div className="flex items-center gap-4">

                    <span className="w-6 text-sm font-semibold text-default-400">
                      #{index + 1}
                    </span>

                    <Avatar
                      src={
                        contributor.image
                      }
                      name={
                        contributor.name
                      }
                    />

                    <div>

                      <p className="font-semibold">
                        {contributor.name}
                      </p>

                      <p className="text-sm text-default-500">
                        {
                          contributor.email
                        }
                      </p>

                    </div>

                  </div>


                  <Chip
                    color="primary"
                    variant="flat"
                  >
                    {
                      contributor.lessonCount
                    }{" "}
                    lessons
                  </Chip>

                </div>

              )
            )

          )}

        </div>

      </Card>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">

  <LessonGrowthChart
    data={dashboard.lessonGrowth}
  />

  <UserGrowthChart
    data={dashboard.userGrowth}
  />

</div>

    </div>
  );
}


