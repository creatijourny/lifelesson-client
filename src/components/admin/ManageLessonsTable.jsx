"use client";

import { useState } from "react";

import {
    Button,
    Chip,
    Modal,
} from "@heroui/react";

import { toast } from "react-toastify";

import {
    deleteAdminLesson,
    updateAdminLesson,
    updateLessonAccessLevel,
} from "@/lib/actions/lessons";


export default function ManageLessonsTable({
    initialLessons = [],
}) {
    const [lessons, setLessons] =
        useState(initialLessons);

    const [updatingId, setUpdatingId] =
        useState(null);

    const [deleteTarget, setDeleteTarget] =
        useState(null);

    async function handleDelete() {
        if (!deleteTarget) return;

        try {
            setUpdatingId(
                deleteTarget._id
            );

            await deleteAdminLesson(
                deleteTarget._id
            );

            setLessons((prev) =>
                prev.filter(
                    (lesson) =>
                        lesson._id !==
                        deleteTarget._id
                )
            );

            toast.success(
                "Lesson deleted successfully."
            );

            setDeleteTarget(null);

        } catch (error) {
            console.error(error);

            toast.error(
                error.message ||
                "Failed to delete lesson."
            );

        } finally {
            setUpdatingId(null);
        }
    }


    async function toggleLesson(
        lesson,
        field
    ) {
        try {
            setUpdatingId(lesson._id);

            const newValue =
                !lesson[field];

            await updateAdminLesson(
                lesson._id,
                {
                    [field]: newValue,
                }
            );

            setLessons((prev) =>
                prev.map((item) =>
                    item._id === lesson._id
                        ? {
                            ...item,
                            [field]: newValue,
                        }
                        : item
                )
            );

            toast.success(
                field === "featured"
                    ? newValue
                        ? "Lesson featured."
                        : "Lesson removed from featured."
                    : newValue
                        ? "Lesson marked as reviewed."
                        : "Lesson marked as unreviewed."
            );

        } catch (error) {
            console.error(error);

            toast.error(
                error.message ||
                "Failed to update lesson."
            );

        } finally {
            setUpdatingId(null);
        }
    }
    async function handleTogglePremium(lesson) {
  try {
    setUpdatingId(lesson._id);

    const newAccessLevel =
      lesson.accessLevel === "Premium"
        ? "Free"
        : "Premium";

    await updateLessonAccessLevel(
      lesson._id,
      newAccessLevel
    );

    setLessons((prev) =>
      prev.map((item) =>
        item._id === lesson._id
          ? {
              ...item,
              accessLevel: newAccessLevel,
            }
          : item
      )
    );

    toast.success(
      newAccessLevel === "Premium"
        ? "Lesson is now Premium."
        : "Lesson is now Free."
    );

  } catch (error) {
    console.error(error);

    toast.error(
      "Failed to update lesson access."
    );
  } finally {
    setUpdatingId(null);
  }
}


    return (
        <>
            <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

                <table className="w-full min-w-[1100px]">

                    <thead className="border-b bg-default-50">

                        <tr>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Lesson
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Author
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Category
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Visibility
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Access
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Status
                            </th>

                            <th className="px-5 py-4 text-right text-sm font-semibold">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {lessons.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="px-6 py-12 text-center text-default-500"
                                >
                                    No lessons found.
                                </td>

                            </tr>

                        ) : (

                            lessons.map((lesson) => (

                                <tr
                                    key={lesson._id}
                                    className="border-b last:border-b-0 hover:bg-default-50"
                                >

                                    <td className="max-w-[300px] px-5 py-4">

                                        <div className="font-semibold">
                                            {lesson.title}
                                        </div>

                                        <div className="mt-1 line-clamp-2 text-sm text-default-500">
                                            {lesson.description}
                                        </div>

                                    </td>


                                    <td className="px-5 py-4">

                                        <div className="font-medium">
                                            {lesson.authorName ||
                                                "Unknown"}
                                        </div>

                                        <div className="text-xs text-default-500">
                                            {lesson.authorEmail}
                                        </div>

                                    </td>


                                    <td className="px-5 py-4">

                                        <Chip
                                            size="sm"
                                            variant="flat"
                                        >
                                            {lesson.category}
                                        </Chip>

                                    </td>

                                    {/* 
                                    <td className="px-5 py-4">

                                        <Chip
                                            size="sm"
                                            color={
                                                lesson.visibility ===
                                                    "Public"
                                                    ? "success"
                                                    : "default"
                                            }
                                            variant="flat"
                                        >
                                            {lesson.visibility}
                                        </Chip>

                                    </td> */}
                                    <td className="px-5 py-4">
                                        <Chip
                                            size="sm"
                                            color={
                                                lesson.visibility === "Public"
                                                    ? "success"
                                                    : "default"
                                            }
                                            variant="flat"
                                        >
                                            {lesson.visibility || "Private"}
                                        </Chip>
                                    </td>
                                    <td className="px-5 py-4">
                                        <Chip
                                            size="sm"
                                            color={
                                                lesson.accessLevel === "Premium"
                                                    ? "warning"
                                                    : "default"
                                            }
                                            variant="flat"
                                        >
                                            {lesson.accessLevel || "Free"}
                                        </Chip>
                                    </td>


                                    <td className="px-5 py-4">

                                        <div className="flex flex-wrap gap-2">

                                            {lesson.featured && (
                                                <Chip
                                                    size="sm"
                                                    color="warning"
                                                    variant="flat"
                                                >
                                                    Featured
                                                </Chip>
                                            )}

                                            {lesson.reviewed && (
                                                <Chip
                                                    size="sm"
                                                    color="success"
                                                    variant="flat"
                                                >
                                                    Reviewed
                                                </Chip>
                                            )}

                                            {(lesson.flagged ||
                                                lesson.flags?.length >
                                                0) && (
                                                    <Chip
                                                        size="sm"
                                                        color="danger"
                                                        variant="flat"
                                                    >
                                                        Flagged
                                                    </Chip>
                                                )}

                                        </div>

                                    </td>


                                    <td className="px-5 py-4">

                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="flat"
                                                color={
                                                    lesson.accessLevel === "Premium"
                                                        ? "warning"
                                                        : "success"
                                                }
                                                onPress={() =>
                                                    handleTogglePremium(lesson)
                                                }
                                                isLoading={
                                                    updatingId === lesson._id
                                                }
                                            >
                                                {lesson.accessLevel === "Premium"
                                                    ? "Make Free"
                                                    : "Make Premium"}
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="flat"
                                                color="warning"
                                                isLoading={
                                                    updatingId ===
                                                    lesson._id
                                                }
                                                onPress={() =>
                                                    toggleLesson(
                                                        lesson,
                                                        "featured"
                                                    )
                                                }
                                            >
                                                {lesson.featured
                                                    ? "Unfeature"
                                                    : "Feature"}
                                            </Button>


                                            <Button
                                                size="sm"
                                                variant="flat"
                                                color="success"
                                                isLoading={
                                                    updatingId ===
                                                    lesson._id
                                                }
                                                onPress={() =>
                                                    toggleLesson(
                                                        lesson,
                                                        "reviewed"
                                                    )
                                                }
                                            >
                                                {lesson.reviewed
                                                    ? "Unreview"
                                                    : "Review"}
                                            </Button>


                                            <Button
                                                size="sm"
                                                variant="flat"
                                                color="danger"
                                                onPress={() =>
                                                    setDeleteTarget(
                                                        lesson
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>


            {/* Delete Confirmation */}

            {/* <Modal
        isOpen={
          !!deleteTarget
        }
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
      >

        <Modal.Content>

          <Modal.Header>
            Delete Lesson
          </Modal.Header>

          <Modal.Body>

            <p>
              Are you sure you want to
              delete{" "}
              <strong>
                {deleteTarget?.title}
              </strong>
              ?
            </p>

            <p className="mt-2 text-sm text-danger">
              This action cannot be
              undone.
            </p>

          </Modal.Body>

          <Modal.Footer>

            <Button
              variant="light"
              onPress={() =>
                setDeleteTarget(null)
              }
            >
              Cancel
            </Button>

            <Button
              color="danger"
              isLoading={
                updatingId ===
                deleteTarget?._id
              }
              onPress={handleDelete}
            >
              Delete Lesson
            </Button>

          </Modal.Footer>

        </Modal.Content>

      </Modal> */}

            <Modal>
                <Modal.Backdrop
                    isOpen={!!deleteTarget}
                    onOpenChange={(open) => {
                        if (!open) {
                            setDeleteTarget(null);
                        }
                    }}
                    variant="blur"
                >
                    <Modal.Container
                        size="sm"
                        placement="center"
                    >
                        <Modal.Dialog>

                            {({ close }) => (
                                <>
                                    <Modal.CloseTrigger />

                                    <Modal.Header>
                                        <Modal.Heading>
                                            Delete Lesson
                                        </Modal.Heading>
                                    </Modal.Header>

                                    <Modal.Body>

                                        <p>
                                            Are you sure you want to
                                            delete{" "}
                                            <strong>
                                                {deleteTarget?.title}
                                            </strong>
                                            ?
                                        </p>

                                        <p className="mt-2 text-sm text-danger">
                                            This action cannot be undone.
                                        </p>

                                    </Modal.Body>

                                    <Modal.Footer>

                                        <Button
                                            variant="light"
                                            onPress={() => {
                                                setDeleteTarget(null);
                                                close();
                                            }}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            color="danger"
                                            isLoading={
                                                updatingId ===
                                                deleteTarget?._id
                                            }
                                            onPress={async () => {
                                                await handleDelete();
                                                close();
                                            }}
                                        >
                                            Delete Lesson
                                        </Button>

                                    </Modal.Footer>
                                </>
                            )}

                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

        </>
    );
}