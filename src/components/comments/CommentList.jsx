"use client";

import CommentCard from "./CommentCard";

export default function CommentList({
  comments = [],
  session,
  onRefresh,
}) {
  // No comments yet
  if (comments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-default-300 bg-default-50 py-12 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No comments yet
        </h3>

        <p className="mt-2 text-sm text-default-500">
          Be the first to share your thoughts about this lesson.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          session={session}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}