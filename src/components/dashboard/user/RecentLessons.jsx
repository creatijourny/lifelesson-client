"use client";

import Link from "next/link";

import { Card, Chip, Button } from "@heroui/react";

import {
  Pencil,
  Eye,
  BookOpen,
} from "@gravity-ui/icons";

export default function RecentLessons({
  lessons = [],
}) {
  return (
    <Card className="rounded-2xl border border-default-200 p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            Recent Lessons
          </h2>

          <p className="text-sm text-default-500">
            Your latest published lessons
          </p>

        </div>

        <Button
          as={Link}
          href="/dashboard/my-lessons"
          variant="flat"
          color="primary"
          size="sm"
        >
          View All
        </Button>

      </div>

      {/* Empty State */}

      {lessons.length === 0 ? (
        <div className="flex flex-col items-center py-12 text-center">

          <BookOpen className="mb-4 h-12 w-12 text-default-300" />

          <h3 className="text-lg font-semibold">
            No lessons yet
          </h3>

          <p className="mt-2 text-default-500">
            Start sharing your knowledge by creating your
            first lesson.
          </p>

          <Button
            as={Link}
            href="/dashboard/create-lesson"
            color="primary"
            className="mt-6"
          >
            Create Lesson
          </Button>

        </div>
      ) : (
        <div className="space-y-4">

          {lessons.map((lesson) => (

            <Card
              key={lesson._id}
              className="border border-default-200 p-5 shadow-none transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}

                <div className="flex-1">

                  <h3 className="text-lg font-semibold text-slate-800">
                    {lesson.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">

                    <Chip
                      size="sm"
                      variant="flat"
                      color="primary"
                    >
                      {lesson.category}
                    </Chip>

                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        lesson.visibility === "Public"
                          ? "success"
                          : "warning"
                      }
                    >
                      {lesson.visibility}
                    </Chip>

                  </div>

                  <p className="mt-3 text-sm text-default-500">
                    {new Date(
                      lesson.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                {/* Right */}

                <div className="flex gap-2">

                  <Button
                    as={Link}
                    href={`/lessons/${lesson._id}`}
                    variant="flat"
                    color="primary"
                    startContent={<Eye />}
                  >
                    View
                  </Button>

                  <Button
                    as={Link}
                    href={`/dashboard/edit-lesson/${lesson._id}`}
                    color="primary"
                    startContent={<Pencil />}
                  >
                    Edit
                  </Button>

                </div>

              </div>

            </Card>

          ))}

        </div>
      )}

    </Card>
  );
}