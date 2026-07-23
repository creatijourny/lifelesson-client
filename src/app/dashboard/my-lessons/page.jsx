import { LessonsTable } from "@/components/dashboard/user/LessonsTable";

const SERVER_URL=process.env.NEXT_PUBLIC_BASE_URL;

const MyLessonsPage = async () => {

    const res = await fetch(`${SERVER_URL}/lessons`)
    const lessons = await res.json();
    

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">All my lessons here.</h2>

            <LessonsTable lessons={lessons}/>
        </div>
    );
};

export default MyLessonsPage;