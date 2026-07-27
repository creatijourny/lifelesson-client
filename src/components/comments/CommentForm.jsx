"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { createComment } from "@/lib/actions/lessons";

export default function CommentForm({
  lessonId,
  session,
  onCommentAdded,
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!session?.user) {
      toast.info("Please login to comment.");
      return;
    }

    if (!text.trim()) {
      toast.warning("Please write a comment.");
      return;
    }

    setLoading(true);

    try {
      await createComment({
        lessonId,
        userId: session.user.id,
        userName: session.user.name,
        userImage: session.user.image,
        text: text.trim(),
      });

      toast.success("Comment added.");

      setText("");

      // Refresh parent
      onCommentAdded();

    } catch (err) {
      console.log(err);

      toast.error(err.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-default-200 bg-default-50 p-5"
    >
      <h3 className="mb-4 text-lg font-semibold">
        Leave a Comment
      </h3>

      <textarea
        rows={4}
        placeholder={
          session?.user
            ? "Share your thoughts about this lesson..."
            : "Login to write a comment..."
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!session?.user || loading}
        className="w-full rounded-xl border border-default-300 bg-white p-4 outline-none transition focus:border-cyan-500"
      />

      <div className="mt-4 flex items-center justify-between">

        <p className="text-sm text-default-500">
          {text.length}/500
        </p>

        <button
          type="submit"
          disabled={
            loading ||
            !session?.user ||
            !text.trim()
          }
          className={`rounded-xl px-6 py-2 font-medium transition
          ${
            loading
              ? "cursor-not-allowed bg-slate-300 text-white"
              : "bg-cyan-600 text-white hover:bg-cyan-700"
          }`}
        >
          {loading
            ? "Posting..."
            : "Post Comment"}
        </button>

      </div>
    </form>
  );
}