import Link from "next/link";
import { Card, Button, Chip } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function LessonCard({
  lesson, isPremiumUser }) {

  const { _id, title, description, category, tone } = lesson;
  // const { data: session } = authClient.useSession();

  // const isPremiumLesson =
  //   lesson.accessLevel === "Premium";


  // const isPremiumUser =
  //   session?.user?.plan === "premium";

  const categoryColors = {
    "personal-growth": "bg-blue-100 text-blue-700",
    career: "bg-emerald-100 text-emerald-700",
    relationships: "bg-pink-100 text-pink-700",
    mindset: "bg-purple-100 text-purple-700",
    "mistakes-learned": "bg-amber-100 text-amber-700",
  };

  const categoryStyle =
    categoryColors[category] ||
    "bg-slate-100 text-slate-700";

  const shouldDim =
    lesson.accessLevel === "Premium" &&
    !isPremiumUser;

  // const shouldDim =
  //   isPremiumLesson && !isPremiumUser;

  return (
    // <Card className="rounded-2xl border border-default-200 p-5">
    <Card
      className={`
    rounded-3xl border border-slate-200/70
    bg-gradient-to-br from-white via-slate-50 to-sky-50
    p-6 shadow-sm transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl
    ${shouldDim ? "opacity-75 grayscale hover:opacity-100 hover:grayscale-0" : ""}
  `}
    // className={
    //   shouldDim
    //     ? "opacity-70 grayscale hover:opacity-90 hover:grayscale-0"
    //     : ""
    // }
    >
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryStyle}`}>
            {category}
          </span>
          <span>
            {
              lesson.accessLevel === "Premium" && (

                <Chip
                  variant="solid"
                  className="bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold shadow-lg"
                >
                  👑 Premium
                </Chip>

                // <Chip                
                //   color="warning"
                //   variant="solid"
                //   className="bg-orange-200 font-semibold text-orange-600 shadow-md"
                // >
                //   👑 Premium
                // </Chip>
              )
            }
          </span>
        </div>

        <h2 className="line-clamp-2 text-2xl font-bold leading-snug text-slate-800">
          {title}
        </h2>

        <p className="line-clamp-4 text-[15px] leading-7 text-slate-600">
          {description}
        </p>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
  <div className="flex items-center gap-2">
    <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
    <span className="text-sm capitalize text-slate-500">
      {tone}
    </span>
  </div>

  <Link href={`/lessons/${_id}`}>
    <Button
      radius="full"
      className="bg-gradient-to-r from-cyan-500 to-blue-500 px-5 text-white shadow-md transition hover:scale-105 hover:shadow-lg"
    >
      View Details
    </Button>
  </Link>
</div>

        {/* <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-default-400">
            {tone}
          </span>

          <Link href={`/lessons/${_id}`}>
            <Button variant="secondary" className="w-3/4 mt-2 bg-cyan-500 text-white">
              View Details
            </Button>
          </Link>

        </div> */}
      </div>
    </Card>
  );
}