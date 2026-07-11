import Link from "next/link";
import { Card, Button } from "@heroui/react";

export default function LessonCard({
  lesson,
}) {
  return (
    <Card className="rounded-2xl border border-default-200 p-5">
      <div className="space-y-4">
        <div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {lesson.category}
          </span>
        </div>

        <h2 className="line-clamp-2 text-xl font-semibold">
          {lesson.title}
        </h2>

        <p className="line-clamp-4 text-default-500">
          {lesson.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-default-400">
            {lesson.emotionalTone}
          </span>

          <Link href={`/lessons/${lesson._id}`}>
          <Button
            color="primary"
            size="sm"
          >
            Read More
          </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}