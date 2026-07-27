"use client";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { toggleFavorite } from "@/lib/actions/lessons";

export default function FavoriteButton({
  lesson,
  session,

}) {
  const userId = session?.user?.id;
  const [saved, setSaved] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function loadFavoriteInfo() {

      // Check if current user already saved this lesson
      const checkRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/check/${lesson._id}/${userId}`
      );

      const checkData = await checkRes.json();

      setSaved(checkData.saved);

      // Load total favorite count
      const countRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/count/${lesson._id}`
      );

      const countData = await countRes.json();

      setCount(countData.count);
    }

    loadFavoriteInfo();

  }, [lesson._id, userId]);

  //   const initialSaved =
  //     lesson.favorites?.includes(userId);
  //   const [saved, setSaved] = useState(initialSaved);

  //   const [count, setCount] = useState(
  //     lesson.favorites?.length || 0
  //   );



  async function handleFavorite() {
    if (!session?.user) {
      toast.info("Please login to save lessons.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {

      // optimistic update

      if (saved) {
        setSaved(false);
        setCount((prev) => prev - 1);
      } else {
        setSaved(true);
        setCount((prev) => prev + 1);
      }

      console.log({
  saved,
  userId,
  lessonId: lesson._id,
});

      // Toggle Favorite
      await toggleFavorite(
        lesson._id,
        userId,
        saved
      );
      const countRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/count/${lesson._id}`
      );
      const countData = await countRes.json();
      setCount(countData.count);

      const checkRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/check/${lesson._id}/${userId}`
      );
      const checkData = await checkRes.json();
      setSaved(checkData.saved);

    } catch (err) {

      // rollback

      if (saved) {
        setSaved(true);
        setCount((prev) => prev + 1);
      } else {
        setSaved(false);
        setCount((prev) => prev - 1);
      }

      toast.error("Failed to update favorites.");

      console.error(err.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleFavorite}
      disabled={loading}
      className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium transition
      ${saved
          ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }
      ${loading ? "cursor-not-allowed opacity-60" : ""}
      `}
    >
      🔖

      {saved ? "Saved" : "Save"}

      <span className="font-semibold">
        ({count})
      </span>
    </button>
  );
}