import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }) {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const role = session?.user?.role || "user";

    return (
        <div className="flex min-h-screen">

            <DashboardSidebar role={role} />
            

            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>

        </div>
    );
}





// import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
// import React, { Children } from 'react';

// const DashboardLayout = ({children}) => {
//     return (
//         <div className='flex min-h-screen'>
//             <DashboardSidebar />
//             <div className='flex-1'>
//                 {children}
//                 </div>
//         </div>
//     );
// };

// export default DashboardLayout;