"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activePage = Number(currentPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", String(page));

    router.push(`/lessons?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-2">

      {/* Previous */}
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
          currentPage <= 1
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer hover:bg-sky-200"
        }`}
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex gap-2">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => goToPage(page)}
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

      {/* Next */}
      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
          currentPage >= totalPages
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer hover:bg-sky-200"
        }`}
      >
        Next
      </button>

    </div>
  );
}