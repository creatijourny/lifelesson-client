"use client";

export default function ManageLessonsFilters({
  filters,
  setFilters,
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">

      <select
        value={filters.category}
        onChange={(e) =>
          setFilters({
            ...filters,
            category: e.target.value,
          })
        }
        className="rounded-xl border px-4 py-2.5"
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


      <select
        value={filters.visibility}
        onChange={(e) =>
          setFilters({
            ...filters,
            visibility: e.target.value,
          })
        }
        className="rounded-xl border px-4 py-2.5"
      >
        <option value="">
          All Visibility
        </option>

        <option value="Public">
          Public
        </option>

        <option value="Private">
          Private
        </option>
      </select>


      <select
        value={filters.flagged}
        onChange={(e) =>
          setFilters({
            ...filters,
            flagged: e.target.value,
          })
        }
        className="rounded-xl border px-4 py-2.5"
      >
        <option value="">
          All Lessons
        </option>

        <option value="true">
          Flagged Only
        </option>
      </select>

    </div>
  );
}