"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function PaginationManageLessons({
  currentPage,
  totalPages,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activePage = Number(currentPage);

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      "page",
      String(page)
    );

    router.push(
      `/dashboard/admin/manage-lessons?${params.toString()}`
    );
    router.refresh();
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-2">

      <button
        type="button"
        onClick={() =>
          goToPage(activePage - 1)
        }
        disabled={activePage <= 1}
        className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
          activePage <= 1
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer hover:bg-sky-200"
        }`}
      >
        Previous
      </button>

      <div className="flex gap-2">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() =>
              goToPage(page)
            }
            className={`min-w-10 rounded-lg border px-3 py-2 text-sm font-medium transition ${
              page === activePage
                ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-lg shadow-blue-300/60 ring-2 ring-sky-300"
                : "cursor-pointer hover:bg-sky-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          goToPage(activePage + 1)
        }
        disabled={
          activePage >= totalPages
        }
        className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
          activePage >= totalPages
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer hover:bg-sky-200"
        }`}
      >
        Next
      </button>

    </div>
  );
}