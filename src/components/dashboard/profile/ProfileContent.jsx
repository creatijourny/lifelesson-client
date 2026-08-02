"use client";

import { useState } from "react";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import UserLessons from "./UserLessons";
import EditProfileModal from "./EditProfileModal";

export default function ProfileContent({
  profile,
  stats,
  lessons,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProfileHeader
        profile={profile}
        onEdit={() => setOpen(true)}
      />

      <ProfileStats stats={stats} />

      <UserLessons lessons={lessons} />

      <EditProfileModal
        isOpen={open}
        onOpenChange={setOpen}
        profile={profile}
      />
    </>
  );
}