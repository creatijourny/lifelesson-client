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
  const shouldDim =
    lesson.accessLevel === "Premium" &&
    !isPremiumUser;

  // const shouldDim =
  //   isPremiumLesson && !isPremiumUser;

  return (
    // <Card className="rounded-2xl border border-default-200 p-5">
    <Card
      className={
        shouldDim
          ? "opacity-70 grayscale hover:opacity-90 hover:grayscale-0"
          : ""
      }
    >
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {category}
          </span>
          <span>
            {
              lesson.accessLevel === "Premium" && (

                <Chip                
                  color="warning"
                  variant="solid"
                  className="bg-orange-200 font-semibold text-orange-600 shadow-md"
                >
                  👑 Premium
                </Chip>
              )
            }
          </span>
        </div>

        <h2 className="line-clamp-2 text-xl font-semibold">
          {title}
        </h2>

        <p className="line-clamp-4 text-default-500">
          {description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-default-400">
            {tone}
          </span>

          <Link href={`/lessons/${_id}`}>
            <Button variant="secondary" className="w-3/4 mt-2 bg-cyan-500 text-white">
              View Details
            </Button>
          </Link>

          {/* <Link href={`/lessons/${lesson._id}`}>
          <Button
            color="primary"
            size="sm"
          >
            Read More
          </Button>
          </Link> */}
        </div>
      </div>
    </Card>
  );
}