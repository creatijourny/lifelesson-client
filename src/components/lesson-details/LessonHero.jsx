import Image from "next/image";
import { Chip } from "@heroui/react";

export default function LessonHero({ lesson }) {
  const {
    title,
    description,
    category,
    tone,
    imageUrl,
  } = lesson;

  return (
    <section className="overflow-hidden rounded-xl border border-default-200 bg-content1 shadow-sm">

      {/* Featured Image */}

      {imageUrl ? (
        <div className="relative h-72 w-full md:h-96">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-72 items-center justify-center bg-default-100 md:h-96">
          <p className="text-default-500">
            No Featured Image
          </p>
        </div>
      )}

      {/* Content */}

      <div className="space-y-6 p-6 md:p-8">

        {/* Category & Tone */}

        <div className="flex flex-wrap gap-3">
          <Chip
            color="primary"
            variant="flat"
            className="capitalize"
          >
            {category}
          </Chip>

          <Chip
            color="secondary"
            variant="flat"
            className="capitalize"
          >
            {tone}
          </Chip>
        </div>

        {/* Title */}

        <h1 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {title}
        </h1>

        {/* Description */}

        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <p className="whitespace-pre-line leading-8 text-default-700">
            {description}
          </p>
        </div>

      </div>
    </section>
  );
}