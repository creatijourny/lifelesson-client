import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import {
  getProfile,
  getProfileStats,
  getUserPublicLessons,
} from "@/lib/actions/profile";

// import ProfileHeader from "@/components/dashboard/profile/ProfileHeader";
// import ProfileStats from "@/components/dashboard/profile/ProfileStats";
// import UserLessons from "@/components/dashboard/profile/UserLessons";
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

      {/* Page Title */}

      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="mt-1 text-default-500">
          Manage your account information and view your public lessons.
        </p>
      </div>

      {/* Profile */}
      <ProfileContent 
      profile={profile} 
      stats={stats} 
      lessons={lessons} 
      />

      {/* <ProfileHeader
        profile={profile}
      /> */}

      {/* Statistics */}

      {/* <ProfileStats
        stats={stats}
      /> */}

      {/* User Lessons */}

      {/* <UserLessons
        lessons={lessons}
      /> */}

    </section>
  );
}