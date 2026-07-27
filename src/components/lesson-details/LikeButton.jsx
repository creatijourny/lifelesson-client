"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Heart } from "@gravity-ui/icons";
import { toast } from "react-toastify";

import { toggleLike } from "@/lib/actions/lessons";

export default function LikeButton({
    lesson,
    session,
}) {

    const userId = session?.user?.id;

    const initialLiked =
        lesson.likes?.includes(userId);

    const [liked, setLiked] = useState(initialLiked);

    const [count, setCount] = useState(
        lesson.likes?.length || 0
    );

    const [loading, setLoading] = useState(false);

    const handleLike = async () => {

        if (!session?.user) {
            toast.info("Please log in to like this lesson.");
            return;
        }

        if (loading) return;

        setLoading(true);

        try {

            // optimistic UI

            if (liked) {

                setLiked(false);
                setCount((prev) => prev - 1);

            } else {

                setLiked(true);
                setCount((prev) => prev + 1);

            }

            await toggleLike(
                lesson._id,
                userId
            );

        } catch (err) {

            // rollback

            if (liked) {

                setLiked(true);
                setCount((prev) => prev + 1);

            } else {

                setLiked(false);
                setCount((prev) => prev - 1);

            }

            toast.error("Something went wrong.");

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <button
            onClick={handleLike}
            disabled={loading}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium transition
    ${liked
                    ? "bg-pink-100 text-pink-700 hover:bg-pink-200"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
    ${loading ? "cursor-not-allowed opacity-60" : ""}
  `}
        >
            ❤️ {liked ? "Liked" : "Like"}
            <span>({count})</span>
        </button>

        //     <Button
        //   onPress={handleLike}
        //   isLoading={loading}
        //   variant="flat"
        //   startContent={<Heart className="h-5 w-5" />}
        //   className={
        //     liked
        //       ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
        //       : "bg-default-100 text-slate-600 hover:bg-default-200"
        //   }
        // >
        //   {liked ? "Liked" : "Like"}

        //   <span className="ml-2 font-semibold">
        //     ({count})
        //   </span>
        // </Button>

       

    );

}