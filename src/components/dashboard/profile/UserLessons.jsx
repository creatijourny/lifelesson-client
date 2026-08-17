import LessonCard from "@/components/LessonCard";
// import UserLessonCard from "./UserLessonCard";

export default function UserLessons({ lessons=[] }) {
  return (
    <section className="space-y-6">

      <div>
        <h2 className="text-2xl font-bold">
          My Public Lessons
        </h2>
        
      </div>

      {lessons.length === 0 ? (
        <div className="rounded-xl border border-dashed border-default-300 py-16 text-center">
          <h3 className="text-lg font-semibold">
            No public lessons yet
          </h3>

          <p className="mt-2 text-default-500">
            Publish a lesson to make it appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            
            <LessonCard key={lesson._id} lesson={lesson}/>
          ))}
        </div>
      )}
    </section>
  );
}