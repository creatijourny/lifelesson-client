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

    return (
        <div className="p-6">
      <h1 className="text-3xl font-bold">
        Welcome, {session.user.name}
      </h1>

      <p>User dashboard content goes here...</p>
    </div>
    );
}