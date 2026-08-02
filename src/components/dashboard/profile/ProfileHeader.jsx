"use client";

import { Avatar, Button, Chip, Card } from "@heroui/react";
import { Edit } from "lucide-react";
import Image from "next/image";

export default function ProfileHeader({
  profile,
  onEdit,
}) 
{
    console.log(profile);
  return (
    <Card className="rounded-2xl border border-default-200 p-6 shadow-sm">

      <div className="flex flex-col items-center gap-6 md:flex-row">

        {/* Avatar */}

        <Image
          src={profile?.image}
          alt={profile?.name}
          width={28}
          height={28}
          className="h-20 w-20 rounded-full text-3xl"
        />

        {/* Profile Info */}

        <div className="flex-1 text-center md:text-left">

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">

            <h2 className="text-3xl font-bold">
              {profile?.name}
            </h2>

            {profile?.premium && (
              <Chip
                color="warning"
                variant="flat"
                className="font-semibold"
              >
                ⭐ Premium
              </Chip>
            )}

          </div>

          <p className="mt-2 text-default-600">
            {profile?.email}
          </p>

          {profile?.createdAt && (
            <p className="mt-1 text-sm text-default-400">
              Joined{" "}
              {new Date(
                profile.createdAt
              ).toLocaleDateString()}
            </p>
          )}

        </div>

        {/* Edit Button */}

        <div>

          <Button
            color="primary"
            startContent={<Edit size={18} />}
            onPress={onEdit}
          >
            Edit Profile
          </Button>

        </div>

      </div>

    </Card>
  );
}