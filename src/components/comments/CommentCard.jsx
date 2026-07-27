"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import {
  updateComment,
  deleteComment,
} from "@/lib/actions/lessons";

export default function CommentCard({
  comment,
  session,
  onRefresh,
}) {
  const isOwner =
    session?.user?.id === comment.userId;

  const [editing, setEditing] = useState(false);

  const [text, setText] = useState(comment.text);

  const [loading, setLoading] = useState(false);

  const createdDate = new Date(
    comment.createdAt
  ).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  async function handleUpdate() {
    if (!text.trim()) {
      toast.warning("Comment cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      await updateComment(comment._id, text);

      toast.success("Comment updated.");

      setEditing(false);

      onRefresh();

    } catch (err) {
      toast.error(err.message);

    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this comment?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      await deleteComment(comment._id);

      toast.success("Comment deleted.");

      onRefresh();

    } catch (err) {
      toast.error(err.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-default-200 bg-white p-5 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Image
            src={
              comment.userImage ||
              "/default-avatar.png"
            }
            alt={comment.userName}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />

          <div>

            <h4 className="font-semibold">
              {comment.userName}
            </h4>

            <p className="text-xs text-default-500">
              {createdDate}
            </p>

          </div>

        </div>

        {isOwner && (
          <div className="flex gap-2">

            <button
              onClick={() =>
                setEditing(!editing)
              }
              className="rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600 hover:bg-blue-100"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="rounded-lg bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100"
            >
              Delete
            </button>

          </div>
        )}

      </div>

      {/* Body */}

      <div className="mt-4">

        {editing ? (

          <>
            <textarea
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              rows={4}
              className="w-full rounded-lg border p-3"
            />

            <div className="mt-3 flex justify-end gap-2">

              <button
                onClick={() => {
                  setEditing(false);
                  setText(comment.text);
                }}
                className="rounded-lg bg-gray-100 px-4 py-2"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleUpdate}
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Save
              </button>

            </div>

          </>

        ) : (

          <p className="whitespace-pre-wrap text-slate-700">
            {comment.text}
          </p>

        )}

      </div>

    </div>
  );
}