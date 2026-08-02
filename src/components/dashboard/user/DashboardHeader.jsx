"use client";

import Image from "next/image";
import { Card } from "@heroui/react";

export default function DashboardHeader({ session }) {
    

  const user = session?.user;

  console.log(session);
console.log(session?.user);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="rounded-2xl border border-default-200 bg-gradient-to-r from-sky-50 via-white to-indigo-50 p-6 shadow-sm">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-white shadow">
            <h3>Header</h3>
            {/* <Image
              src={user?.image || "/default-avatar.png"}
              alt={user?.name || "User"}
              fill
              className="object-cover"
            /> */}

          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Welcome back,
              <span className="ml-2 text-sky-600">
                {user?.name || "Friend"} 👋
              </span>
            </h1>

            <p className="mt-1 text-default-600">
              Ready to inspire others today? Manage your lessons and track your activity.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="rounded-xl bg-white px-5 py-3 text-center shadow-sm">

          <p className="text-xs uppercase tracking-wide text-default-500">
            Today
          </p>

          <h3 className="mt-1 text-lg font-semibold text-slate-700">
            {today}
          </h3>

        </div>

      </div>

    </Card>
  );
}