import Link from "next/link";
import { Card, Button } from "@heroui/react";

export default function LessonCard({ lesson }) {
  const { _id, title, description, category, tone } = lesson;
  return (
    <Card className="rounded-2xl border border-default-200 p-5">
      <div className="space-y-4">
        <div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {category}
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