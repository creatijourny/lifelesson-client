import UserDashboardHome from "@/components/dashboard/user/UserDashboardHome";
import { getDashboardData } from "@/lib/actions/lessons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    if (session.user.role === "admin") {
        redirect("/dashboard/admin");
    }

    const stats =
    await getDashboardData(
      session.user.id
    );

    return (
        <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {session.user.name}
      </h1>

      <UserDashboardHome 
      session={session}
      stats={stats}
      recentLessons={stats.recentLessons}
      />
    </div>
    );
}