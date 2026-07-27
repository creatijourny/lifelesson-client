"use client";
console.log("CommentSection rendered");

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

import {
  getComments,
  getCommentsCount,
} from "@/lib/actions/lessons";

export default function CommentSection({
  lesson,
  session,
}) {
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  const [loading, setLoading] = useState(true);

  // Load comments + count
  async function loadComments() {
    try {
      setLoading(true);

      const commentsData = await getComments(
        lesson._id
      );

      const countData =
        await getCommentsCount(
          lesson._id
        );

      setComments(commentsData);

      setCommentsCount(countData.count);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComments();
  }, [lesson._id]);

  return (
    <Card className="mt-8 rounded-2xl border border-default-200 p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-semibold">
            Comments
          </h2>

          <p className="text-sm text-default-500">
            {commentsCount}{" "}
            {commentsCount === 1
              ? "Comment"
              : "Comments"}
          </p>

        </div>

      </div>

      {/* Comment Form */}

      <CommentForm
        lessonId={lesson._id}
        session={session}
        onCommentAdded={loadComments}
      />

      {/* Divider */}

      <div className="my-6 border-t border-default-200" />

      {/* Comments */}

      {loading ? (

        <p className="text-center text-default-500">
          Loading comments...
        </p>

      ) : (

        <CommentList
          comments={comments}
          session={session}
          onRefresh={loadComments}
        />

      )}

    </Card>
  );
}