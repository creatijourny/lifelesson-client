"use client";

import { Input } from "@heroui/react";
// import { Magnifier } from "@gravity-ui/icons";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

export default function LessonToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const category =
    searchParams.get("category") || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.push(
        `/lessons?${params.toString()}`
      );
    }, 400);

    return () => clearTimeout(timer);

  }, [search]);

  return (
    <div className="max-w-4xl mx-auto justify-end mt-4 flex flex-col gap-4 md:flex-row">

      <Input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search lesson title..."
  className="md:flex-1"
/>

      <select
        className="rounded-xl border px-4 py-3"
        value={category}
        onChange={(e) => {
          const params =
            new URLSearchParams(
              searchParams.toString()
            );

          if (e.target.value) {
            params.set(
              "category",
              e.target.value
            );
          } else {
            params.delete(
              "category"
            );
          }

          params.set("page", "1");

          router.push(
            `/lessons?${params.toString()}`
          );
        }}
      >
        <option value="">
          All Categories
        </option>

        <option value="personal-growth">
          Personal Growth
        </option>

        <option value="career">
          Career
        </option>

        <option value="relationships">
          Relationships
        </option>

        <option value="mindset">
          Mindset
        </option>

        <option value="mistakes-learned">
          Mistakes Learned
        </option>
      </select>

    </div>
  );
}