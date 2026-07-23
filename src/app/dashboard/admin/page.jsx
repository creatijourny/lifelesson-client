import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin dashboard page</h2>
    </div>
  );
};

export default AdminDashboard;


// 'use client';

// import ActiveContributors from '@/components/dashboard/ActiveContributors';
// import LessonGrowthChart from '@/components/dashboard/LessonGrowthChart';
// import StatsCards from '@/components/dashboard/StatsCards';
// import UserGrowthChart from '@/components/dashboard/UserGrowthChart';
// import { useSession } from '@/lib/auth-client';
// // import { Calendar, BookOpen, Flag, StarFill, PersonPencil, Persons } from '@gravity-ui/icons';
// import { Spinner } from '@heroui/react';


// const AdminDashboardHome = () => {

//   const { data: session, isPending } = useSession();

//   if (isPending) {
//     return <div className="flex flex-col items-center gap-2">
//       <Spinner color="success" />
//       <span className="text-xs text-muted">Success</span>
//     </div>
//   }
//   const user = session?.user;
//   return (
//     <div className='space-y-5'>
//       <h2 className='text-2xl font-medium'>Welcome, {user?.name}</h2>
//       <h1 className="text-3xl font-bold">Dashboard Overview</h1>
//         <p className="mt-2 text-default-500">
//           Monitor your platform statistics and activity.
//         </p>
//       <StatsCards />

//     <div className="grid gap-6 lg:grid-cols-2">
//         <LessonGrowthChart />
//         <UserGrowthChart />
//       </div>
     
//       <ActiveContributors />

//     </div>   

//   );
// };

// export default AdminDashboardHome;


 // <div>
    //   <h2 className='text-2xl font-medium'>Welcome, {user?.name}</h2>

      
    //   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        
    //     <Card className="rounded-2xl border border-default-200 bg-content1 shadow-sm">
    //       <div className="p-3 space-y-3">
    //         <div className="flex items-center justify-between">
    //           <div className="rounded-xl bg-blue-500/15 text-blue-600 p-3">
    //             <Persons />
    //           </div>

    //           <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
    //             +12%
    //           </span>
    //         </div>

    //         <div>
    //           <p className="text-sm text-default-500">
    //             Total Users
    //           </p>

    //           <h2 className="mt-2 text-3xl font-bold">
    //             18,540
    //           </h2>

    //           <p className="mt-1 text-xs text-default-400">
    //             Registered members
    //           </p>
    //         </div>
    //       </div>
    //     </Card>
    //     {/* Total public lessons */}
    //     <Card className="rounded-2xl border border-default-200 shadow-sm">
    //       <div className="p-2">
    //         <div className="flex items-center justify-between">
    //           <div className="h-12 w-12 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
    //             <BookOpen className='h-6 w-6'/>
    //           </div>

    //           <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
    //             +8.5%
    //           </span>
    //         </div>

    //         <h4 className="mt-6 text-sm font-medium text-default-500">
    //           Total Public Lessons
    //         </h4>

    //         <h2 className="mt-2 text-4xl font-bold">
    //           4,286
    //         </h2>

    //         <p className="mt-2 text-sm text-default-400">
    //           Published and visible lessons
    //         </p>
    //       </div>
    //     </Card>

    //     {/* Flagged lessons */}
    //     <Card className="rounded-2xl border border-default-200 shadow-sm">
    //       <div className="p-3">
    //         <div className="flex items-center justify-between">
    //           <div className="h-12 w-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
    //             <Flag />
    //           </div>

    //           <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
    //             +3
    //           </span>
    //         </div>

    //         <h4 className="mt-6 text-sm font-medium text-default-500">
    //           Flagged Lessons
    //         </h4>

    //         <h2 className="mt-2 text-4xl font-bold">
    //           31
    //         </h2>

    //         <p className="mt-2 text-sm text-default-400">
    //           Awaiting admin review
    //         </p>
    //       </div>
    //     </Card>

    //     {/* Most Active Contributors */}
    //     <Card className="rounded-2xl border border-default-200 shadow-sm">
    //       <div className="p-3">
    //         <div className="flex items-center justify-between">
    //           <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
    //             <StarFill />
    //           </div>

    //           <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
    //             Top 5
    //           </span>
    //         </div>

    //         <h4 className="mt-6 text-sm font-medium text-default-500">
    //           Active Contributors
    //         </h4>

    //         <h2 className="mt-2 text-4xl font-bold">
    //           154
    //         </h2>

    //         <p className="mt-2 text-sm text-default-400">
    //           Users published this month
    //         </p>
    //       </div>
    //     </Card>

    //     {/* Today's New Lessons */}
    //     <Card className="rounded-2xl border border-default-200 shadow-sm">
    //       <div className="p-2">
    //         <div className="flex items-center justify-between">
    //           <div className="h-12 w-12 rounded-xl bg-emerald-100 text-green-600 flex items-center justify-center">
    //             <Calendar />
    //           </div>

    //           <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
    //             Today
    //           </span>
    //         </div>

    //         <h4 className="mt-6 text-sm font-medium text-default-500">
    //           New Lessons
    //         </h4>

    //         <h2 className="mt-2 text-4xl font-bold">
    //           47
    //         </h2>

    //         <p className="mt-2 text-sm text-default-400">
    //           Published in the last 24 hours
    //         </p>
    //       </div>
    //     </Card>

    //     {/* Total Registered Users */}

    //     <Card className="rounded-2xl border border-default-200 shadow-sm">
    //       <div className="p-2">
    //         <div className="flex items-center justify-between">
    //           <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
    //             <PersonPencil />
    //           </div>

    //           <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
    //             +14%
    //           </span>
    //         </div>

    //         <h4 className="mt-6 text-sm font-medium text-default-500">
    //           Total Members
    //         </h4>

    //         <h2 className="mt-2 text-4xl font-bold">
    //           18,542
    //         </h2>

    //         <p className="mt-2 text-sm text-default-400">
    //           Registered platform members
    //         </p>
    //       </div>
    //     </Card>
    //   </div>

    // </div>

