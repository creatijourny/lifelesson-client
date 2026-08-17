import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import {
  getProfile,
  getProfileStats,
  getUserPublicLessons,
} from "@/lib/actions/profile";

import ProfileContent from "@/components/dashboard/profile/ProfileContent";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;

  // Load everything in parallel
  const [profile, stats, lessons] = await Promise.all([
    getProfile(userId),
    getProfileStats(userId),
    getUserPublicLessons(userId),
  ]);

  return (
    <section className="space-y-6">     

      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="mt-1 text-default-500">
          Manage your account information and view your public lessons.
        </p>
      </div>

      <ProfileContent 
      profile={profile} 
      stats={stats} 
      lessons={lessons} 
      />

    </section>
  );
}