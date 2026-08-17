import { LessonsTable } from "@/components/dashboard/user/LessonsTable";
import { getMyLessons } from "@/lib/actions/lessons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyLessonsPage() {

  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  const lessons =
    await getMyLessons(
      session.user.id
    );    

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My lessons</h2>

            <LessonsTable lessons={lessons}/>
        </div>
    );
};

