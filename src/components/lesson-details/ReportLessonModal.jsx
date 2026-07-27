"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { reportLesson } from "@/lib/actions/lessons";

export default function ReportLessonModal({
  lesson,
  session,
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const reasons = [
    "Spam",
    "Harassment",
    "False Information",
    "Copyright",
    "Hate Speech",
    "Other",
  ];

  async function handleSubmit() {
    if (!session?.user) {
      toast.info("Please login first.");
      return;
    }

    if (!reason) {
      toast.warning("Please select a reason.");
      return;
    }

    setLoading(true);

    // try {
    //   await reportLesson({
    //     lessonId: lesson._id,
    //     reporterUserId: session.user.id,
    //     reporterEmail: session.user.email,
    //     reason,
    //   });

    //   toast.success("Lesson reported.");

    //   setOpen(false);
    //   setReason("");

    // } catch (err) {

    //   toast.error(err.message);

    // } finally {
    //   setLoading(false);
    // }

    const result = await reportLesson({
  lessonId: lesson._id,
  reporterUserId: session.user.id,
  reporterEmail: session.user.email,
  reason,
});

if (result.alreadyReported) {
  toast.info(result.message);
  setOpen(false);
  return;
}

toast.success("Lesson reported successfully.");
setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-red-50 px-5 py-2 font-medium text-red-600 hover:bg-red-100"
      >
        🚩 Report
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="text-xl font-semibold">
              Report Lesson
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Help us understand why you're reporting this lesson.
            </p>

            <select
              className="mt-5 w-full rounded-lg border p-3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select a reason</option>

              {reasons.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}

            </select>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg bg-slate-100 px-4 py-2"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleSubmit}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                {loading
                  ? "Submitting..."
                  : "Submit Report"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}