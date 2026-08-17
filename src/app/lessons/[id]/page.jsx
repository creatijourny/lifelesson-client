
import { notFound } from "next/navigation";
import { getFavoriteCount, getLesson, getUserLessonCount } from "@/lib/actions/lessons";
import { redirect } from "next/navigation";

import LessonHero from "@/components/lesson-details/LessonHero";
import LessonMeta from "@/components/lesson-details/LessonMeta";
import LessonStats from "@/components/lesson-details/LessonStats";
import LessonActions from "@/components/lesson-details/LessonActions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CommentSection from "@/components/comments/CommentSection";
import PremiumLocked from "@/components/lesson-details/PremiumLocked";

export default async function LessonDetailsPage({ params }) {
    
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
  redirect(`/login?callbackUrl=/lessons/${params.id}`);
}
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


