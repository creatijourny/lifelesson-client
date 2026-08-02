// "use client";


// import DashboardHeader from "@/components/dashboard/user/DashboardHeader";
// import DashboardStats from "./DashboardStats";
// import QuickActions from "./QuickActions";
// import RecentLessons from "./RecentLessons";

// export default function UserDashboardHome({
//   session,
//   stats,
//   recentLessons,
// }) {
//   return (
//     <section className="space-y-8">

//       {/* Header */}
//       <DashboardHeader session={session} />

//       {/* Statistics */}
//       <div>
//         <h3>Dashboard Stats</h3>
//       </div>
//       <DashboardStats
//         totalLessons={stats.totalLessons}
//         totalFavorites={stats.totalFavorites}
//         publicLessons={stats.publicLessons}
//       />

//       {/* Main Content */}
//       <div className="grid gap-8 lg:grid-cols-3">

//         {/* Recent Lessons */}
//         <div className="lg:col-span-2">
//           <RecentLessons
//             lessons={recentLessons}
//           />
//         </div>

//         {/* Quick Actions */}
//         {/* <div>
//           {/* <QuickActions /> */}
//         </div> */}

//       </div>

//     </section>
//   );
// }