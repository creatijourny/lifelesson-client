// import React from 'react';

// const LessonDetailsPage = () => {
//     return (
//         <div>
//             <h2>Details page</h2>
//         </div>
//     );
// };

// export default LessonDetailsPage;


import { notFound } from "next/navigation";
import { getFavoriteCount, getLesson, getUserLessonCount } from "@/lib/actions/lessons";


import LessonHero from "@/components/lesson-details/LessonHero";
import LessonMeta from "@/components/lesson-details/LessonMeta";
import LessonStats from "@/components/lesson-details/LessonStats";
import LessonActions from "@/components/lesson-details/LessonActions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CommentSection from "@/components/comments/CommentSection";
import PremiumLocked from "@/components/lesson-details/PremiumLocked";
// import AuthorCard from "@/components/lesson-details/AuthorCard";
// import LessonStats from "@/components/lesson-details/LessonStats";
// import LessonActions from "@/components/lesson-details/LessonActions";
// import CommentSection from "@/components/lesson-details/CommentSection";

export default async function LessonDetailsPage({ params }) {

    
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const { id } = await params;
    // const lesson = await getLesson(params.id);
    const lesson = await getLesson(id); 
    
    const user = session?.user;

  const isOwner =
    user?.id === lesson.authorId;

  const isPremium =
    user?.plan === "premium";

  const canView =
    lesson.accessLevel !== "Premium" ||
    isOwner ||
    isPremium;

  if (!canView) {
    return <PremiumLocked />;
  }

    const { totalLessons } = await getUserLessonCount(
        lesson.authorId
    );
    //   console.log(lesson);

    if (!lesson) {
        notFound();
    }
    const favoriteData = await getFavoriteCount(lesson._id);

    return (
        <section className="mx-auto max-w-5xl p-2">

            <LessonHero lesson={lesson} />

            <div className="grid gap-5 lg:grid-cols-3">

                <div className="space-y-3 lg:col-span-2">

                    <LessonMeta lesson={lesson} />

                    <LessonStats
                        lesson={lesson}
                        favoritesCount={favoriteData.count}
                    />

                    <LessonActions lesson={lesson} session={session} />

                    <CommentSection 
                        lesson={lesson} 
                        session={session}
                        />

                </div>

                <div>

                    {/* <AuthorCard author={lesson.author} /> */}

                </div>

            </div>

        </section>
    );
}



// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { Chip } from "@heroui/react";
// import { getLessons } from "@/lib/actions/lessons";

// export default async function LessonDetailsPage({ params }) {
//   const { id } = params;

//   const lesson = await getLessons(id);

//   if (!lesson) {
//     notFound();
//   }

//   const {
//     title,
//     description,
//     category,
//     tone,
//     imageUrl,
//     accessLevel,
//     visibility,
//     createdAt,
//   } = lesson;

//   return (
//     <section className="mx-auto max-w-5xl px-4 py-8">
//       <div className="overflow-hidden rounded-2xl border border-default-200 bg-content1 shadow-sm">

//         {/* Image */}

//         {imageUrl && (
//           <Image
//             src={imageUrl}
//             alt={title}
//             width={800}
//             height={500}
//             className="h-[350px] w-full object-cover"
//             priority
//           />
//         )}

//         <div className="space-y-6 p-8">

//           {/* Category & Tone */}

//           <div className="flex flex-wrap gap-3">
//             <Chip color="primary" variant="flat">
//               {category}
//             </Chip>

//             <Chip color="secondary" variant="flat">
//               {tone}
//             </Chip>

//             <Chip variant="bordered">
//               {accessLevel}
//             </Chip>

//             <Chip variant="bordered">
//               {visibility}
//             </Chip>
//           </div>

//           {/* Title */}

//           <h1 className="text-4xl font-bold">
//             {title}
//           </h1>

//           {/* Description */}

//           <div className="prose max-w-none">
//             <p className="whitespace-pre-line text-default-700">
//               {description}
//             </p>
//           </div>

//           {/* Footer */}

//           <div className="border-t pt-5 text-sm text-default-500">
//             Created on{" "}
//             {createdAt
//               ? new Date(createdAt).toLocaleDateString()
//               : "N/A"}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }