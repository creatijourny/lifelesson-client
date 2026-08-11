"use client";

import { useState } from "react";
import {
  Button,
  Chip,
} from "@heroui/react";

import { toast } from "react-toastify";

import {
  updateUserRole,
} from "@/lib/actions/lessons";

export default function ManageUsersTable({
  initialUsers = [],
  isAdmin = false,
}) {
  const [users, setUsers] =
    useState(initialUsers);

  const [updatingId, setUpdatingId] =
    useState(null);

  async function handleRoleChange(
    userId,
    currentRole
  ) {
    const newRole =
      currentRole === "admin"
        ? "user"
        : "admin";

    try {
      setUpdatingId(userId);

      await updateUserRole(
        userId,
        newRole
      );

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? {
                ...user,
                role: newRole,
              }
            : user
        )
      );

      toast.success(
        `User role changed to ${newRole}.`
      );

    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
          "Failed to update role."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

      <table className="w-full min-w-[750px]">

        <thead className="border-b bg-default-50">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              User Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Role
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Total Lessons
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="px-6 py-12 text-center text-default-500"
              >
                No users found.
              </td>

            </tr>

          ) : (

            users.map((user) => (

              <tr
                key={user._id}
                className="border-b last:border-b-0 hover:bg-default-50"
              >

                <td className="px-6 py-4 font-medium">
                  {user.name || "Unknown"}
                </td>

                <td className="px-6 py-4 text-default-600">
                  {user.email}
                </td>

                <td className="px-6 py-4">

                  {user.role === "admin" ? (

                    <Chip
                      color="success"
                      variant="flat"
                    >
                      Admin
                    </Chip>

                  ) : (

                    <Chip
                      color="default"
                      variant="flat"
                    >
                      User
                    </Chip>

                  )}

                </td>

                <td className="px-6 py-4 font-medium">
                  {user.totalLessons}
                </td>

                {isAdmin && ( <td className="px-6 py-4 text-right">

                  <Button
                    size="sm"
                    color={
                      user.role === "admin"
                        ? "warning"
                        : "primary"
                    }
                    variant="flat"
                    isLoading={
                      updatingId ===
                      user._id
                    }
                    onPress={() =>
                      handleRoleChange(
                        user._id,
                        user.role
                      )
                    }
                  >
                    {user.role === "admin"
                      ? "Remove Admin"
                      : "Make Admin"}
                  </Button>

                </td>
                )}

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}