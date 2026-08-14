"use client";

import {
  useState,
} from "react";

import {
  Button,
  Chip,
} from "@heroui/react";

import {
  deleteReportedLesson,
  ignoreLessonReports,
} from "@/lib/actions/lessons";

import { toast } from "react-toastify";

import ReportDetailsModal from "./ReportDetailsModal";

export default function ReportedLessonsTable({
  initialLessons,
}) {
  const [lessons, setLessons] =
    useState(initialLessons || []);

  const [selectedLesson, setSelectedLesson] =
    useState(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [loadingId, setLoadingId] =
    useState(null);

  function openReports(lesson) {
    setSelectedLesson(lesson);
    setModalOpen(true);
  }

  async function handleDelete(lesson) {
    const confirmed =
      window.confirm(
        `Permanently delete "${lesson.title}"? This cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setLoadingId(lesson._id);

      await deleteReportedLesson(
        lesson._id
      );

      setLessons((prev) =>
        prev.filter(
          (item) =>
            item._id !== lesson._id
        )
      );

      toast.success(
        "Lesson permanently deleted."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
          "Failed to delete lesson."
      );
    } finally {
      setLoadingId(null);
    }
  }

  async function handleIgnore(lesson) {
    const confirmed =
      window.confirm(
        `Ignore all reports for "${lesson.title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setLoadingId(lesson._id);

      await ignoreLessonReports(
        lesson._id
      );

      setLessons((prev) =>
        prev.filter(
          (item) =>
            item._id !== lesson._id
        )
      );

      toast.success(
        "Reports cleared. Lesson remains live."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
          "Failed to clear reports."
      );
    } finally {
      setLoadingId(null);
    }
  }

  if (!lessons.length) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center">
        <h3 className="text-lg font-semibold">
          No reported lessons
        </h3>

        <p className="mt-2 text-sm text-default-500">
          There are currently no lessons
          requiring moderation.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

        <table className="w-full text-left">

          <thead className="border-b bg-default-50">
            <tr>
              <th className="px-5 py-4 text-sm font-semibold">
                Lesson
              </th>

              <th className="px-5 py-4 text-sm font-semibold">
                Author
              </th>

              <th className="px-5 py-4 text-sm font-semibold">
                Reports
              </th>

              <th className="px-5 py-4 text-sm font-semibold">
                Visibility
              </th>

              <th className="px-5 py-4 text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr
                key={lesson._id}
                className="border-b last:border-b-0"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold">
                      {lesson.title}
                    </p>

                    <p className="mt-1 max-w-md truncate text-sm text-default-500">
                      {lesson.description}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm font-medium">
                    {lesson.authorName ||
                      "Unknown"}
                  </p>

                  <p className="text-xs text-default-500">
                    {lesson.authorEmail ||
                      ""}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <Chip
                    color="danger"
                    variant="flat"
                  >
                    {lesson.reportCount}
                  </Chip>
                </td>

                <td className="px-5 py-4">
                  <Chip
                    variant="flat"
                    color={
                      lesson.visibility ===
                      "Public"
                        ? "success"
                        : "default"
                    }
                  >
                    {lesson.visibility}
                  </Chip>
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">

                    <Button
                      size="sm"
                      variant="flat"
                      onPress={() =>
                        openReports(
                          lesson
                        )
                      }
                    >
                      View Reports
                    </Button>

                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      isLoading={
                        loadingId ===
                        lesson._id
                      }
                      onPress={() =>
                        handleDelete(
                          lesson
                        )
                      }
                    >
                      Delete Lesson
                    </Button>

                    <Button
                      size="sm"
                      color="success"
                      variant="flat"
                      isLoading={
                        loadingId ===
                        lesson._id
                      }
                      onPress={() =>
                        handleIgnore(
                          lesson
                        )
                      }
                    >
                      Ignore
                    </Button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <ReportDetailsModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        lesson={selectedLesson}
      />
    </>
  );
}