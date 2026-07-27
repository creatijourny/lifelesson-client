"use client";

import { Card } from "@heroui/react";

import LikeButton from "./LikeButton";
import FavoriteButton from "./FavoriteButton";
import ReportLessonModal from "./ReportLessonModal";


export default function LessonActions({
  lesson,
  session,
}) {
  return (
    <Card className="mt-6 rounded-2xl border border-default-200 p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Interact with this Lesson
        </h2>

        <p className="text-sm text-default-500">
          Save, like or report this lesson.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">

        <LikeButton
          lesson={lesson}
          session={session}
        />

        <FavoriteButton
          lesson={lesson}
          session={session}
        />

        <ReportLessonModal
          lesson={lesson}
          session={session}
        />

      </div>

    </Card>
  );
}