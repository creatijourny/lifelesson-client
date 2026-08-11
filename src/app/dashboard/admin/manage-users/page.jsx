import {
  getAdminUsers,
} from "@/lib/actions/lessons";

import {
  auth,
} from "@/lib/auth";

import {
  headers,
} from "next/headers";

import {
  redirect,
} from "next/navigation";

import ManageUsersTable from "@/components/admin/ManageUsersTable";

export default async function ManageUsersPage() {

  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session) {
    redirect("/login");
  }

  // Extra protection:
  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const users =
    await getAdminUsers();

  return (
    <section className="mx-auto max-w-7xl p-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Manage Users
        </h1>

        <p className="mt-2 text-default-500">
          Manage user accounts, roles,
          and activity.
        </p>

      </div>

      <ManageUsersTable
        initialUsers={users}
        isAdmin={session.user.role === "admin"}
      />

    </section>
  );
}