"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import {
  Calendar,
  Clock,
  Eye,
  ArrowsRotateRight,
} from "@gravity-ui/icons";


export default function LessonMeta({
  lesson,
  totalLessons = 0,
}) {
  const {
    createdAt,
    updatedAt,
    visibility = "Public",
    description = "",

    authorId,
    authorName,
    authorImage,
    authorPremium,
  } = lesson;

  const createdDate = createdAt 
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const updatedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : createdDate;

  const words = description.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <Card className="mt-4 rounded-xl border border-default-200 p-6 shadow-sm">

     {/* Author Header */}
     {/* <AuthorCard /> */}

      <div className="flex flex-col gap-4 border-b border-default-200 pb-5 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">

          <Image
            src={authorImage || "/default-avatar.png"}
            alt={authorName}
            width={60}
            height={60}
            className="h-20 w-20 rounded-full object-cover"
          />

          <div>
            <h3 className="text-lg font-semibold">
              Author: {authorName}
            </h3>

            {authorPremium && (
              <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                ⭐ Premium
              </span>
            )}
          </div>

        </div>

        <div className="text-right">

          <p className="text-sm text-default-500">
            Total Lessons
          </p>

          <p className="text-2xl font-bold text-cyan-700">
            {totalLessons}
          </p>

          <Link href={`/profile/${authorId}`}>
            <Button
              size="sm"
              variant="flat"
              className="mt-2"
            >
              View Profile
            </Button>
          </Link>

        </div>

      </div>

      {/* ================= LESSON INFO ================= */}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">

        <div className="flex gap-4 rounded-xl bg-default-50 p-4">
          <Calendar className="mt-1 h-5 w-5 text-cyan-600" />

          <div>
            <p className="text-sm text-default-500">
              Created
            </p>

            <p className="font-semibold">
              {createdDate}
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-xl bg-default-50 p-4">
          <ArrowsRotateRight className="mt-1 h-5 w-5 text-green-600" />

          <div>
            <p className="text-sm text-default-500">
              Updated
            </p>

            <p className="font-semibold">
              {updatedDate}
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-xl bg-default-50 p-4">
          <Eye className="mt-1 h-5 w-5 text-violet-600" />

          <div>
            <p className="text-sm text-default-500">
              Visibility
            </p>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                visibility === "Public"
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {visibility}
            </span>
          </div>
        </div>

        <div className="flex gap-4 rounded-xl bg-default-50 p-4">
          <Clock className="mt-1 h-5 w-5 text-orange-600" />

          <div>
            <p className="text-sm text-default-500">
              Reading Time
            </p>

            <p className="font-semibold">
              {readingTime} min read
            </p>
          </div>
        </div>

      </div>

    </Card>
  );
}



// "use client";

// import { Card } from "@heroui/react";
// import {
//   Calendar,
//   Clock,
//   Eye,
//   ArrowsRotateRight,
// } from "@gravity-ui/icons";
// import AuthorCard from "../AuthorCard";

// export default function LessonMeta({ lesson }) {
//   const {
//     createdAt,
//     updatedAt,
//     visibility = "Public",
//     description = "",
//   } = lesson;

//   // Format dates
//   const createdDate = createdAt
//     ? new Date(createdAt).toLocaleDateString("en-US", {
//         month: "long",
//         day: "numeric",
//         year: "numeric",
//       })
//     : "N/A";

//   const updatedDate = updatedAt
//     ? new Date(updatedAt).toLocaleDateString("en-US", {
//         month: "long",
//         day: "numeric",
//         year: "numeric",
//       })
//     : createdDate;

//   // Approximate reading time
//   const words = description.trim().split(/\s+/).length;
//   const readingTime = Math.max(1, Math.ceil(words / 200));

//   return (
//     <Card className="mt-3 rounded-xl border border-default-200 p-6 shadow-sm">
//       <div className="mb-2">
//         <h2 className="text-xl font-semibold text-slate-800">
//           Lesson Information
//         </h2>

//         <p className="mt-1 text-sm text-default-500">
//           Basic information about this lesson.
//         </p>
//       </div>

      

//       <div className="grid gap-5 sm:grid-cols-2">

//         {/* Created */}
//         <div className="flex items-start gap-4 rounded-xl bg-default-50 p-4">
//           <Calendar className="mt-1 h-5 w-5 text-cyan-600" />

//           <div>
//             <p className="text-sm text-default-500">
//               Created
//             </p>

//             <p className="font-semibold text-slate-700">
//               {createdDate}
//             </p>
//           </div>
//         </div>

//         {/* Updated */}
//         <div className="flex items-start gap-4 rounded-xl bg-default-50 p-4">
//           <ArrowsRotateRight className="mt-1 h-5 w-5 text-green-600" />

//           <div>
//             <p className="text-sm text-default-500">
//               Updated
//             </p>

//             <p className="font-semibold text-slate-700">
//               {updatedDate}
//             </p>
//           </div>
//         </div>

//         {/* Visibility */}
//         <div className="flex items-start gap-4 rounded-xl bg-default-50 p-4">
//           <Eye className="mt-1 h-5 w-5 text-violet-600" />

//           <div>
//             <p className="text-sm text-default-500">
//               Visibility
//             </p>

//             <span
//               className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
//                 visibility === "Public"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-amber-100 text-amber-700"
//               }`}
//             >
//               {visibility}
//             </span>
//           </div>
//         </div>

//         {/* Reading Time */}
//         <div className="flex items-start gap-4 rounded-xl bg-default-50 p-4">
//           <Clock className="mt-1 h-5 w-5 text-orange-600" />

//           <div>
//             <p className="text-sm text-default-500">
//               Reading Time
//             </p>

//             <p className="font-semibold text-slate-700">
//               {readingTime} min read
//             </p>
//           </div>
//         </div>

//       </div>
//     </Card>
//   );
// }