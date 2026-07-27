'use client'

import { Bell, Envelope, Gear, House, LayoutSideContentLeft, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

import SidebarItem from "./SidebarItem";
import { userMenu } from "./userMenu";
import { adminMenu } from "./adminMenu";
import { role } from "better-auth/client";

export function DashboardSidebar({ role }) {
  const navItems = [
    { icon: House, label: "Home" },
    { icon: Magnifier, label: "My Lessons" },
    { icon: Bell, label: "Add Lesson" },
    { icon: Envelope, label: "My Favourites" },
    { icon: Person, label: "Profile" }
  ];

  const navContent = <nav className="flex flex-col gap-1">
    <div className="mb-6 border-b border-default-200 pb-4">
      <h2 className="text-xl font-bold text-foreground">
        Dashboard
      </h2>     
    </div>

    {/* User Menu */}

    {role === "user" && (
      <>
      <div className="space-y-1">

      {userMenu.map((item) => (
        <SidebarItem
          key={item.href}
          item={item}
        />
      ))}

    </div>
      </>
    )}

    {/* Admin Menu */}

    {role === "admin" && (
      <>
        <div className="my-3 border-t" />

        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-default-500">
          Administration
        </p>

        <div className="space-y-1">

          {adminMenu.map((item) => (
            <SidebarItem
              key={item.href}
              item={item}
            />
          ))}

        </div>
      </>
    )}
  </nav>

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-2 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left"
            className="w-64 max-w-[80vw]">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="py-4">
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}


// "use client";

// import SidebarItem from "./SidebarItem";
// import { userMenu } from "./userMenu";
// import { adminMenu } from "./adminMenu";

// export function DashboardSidebar({ role }) {
//   return (
//     <aside className="sticky top-0 h-screen w-62 shrink-0 border-r border-default-200 bg-background p-6">

//       <div className="mb-8">
//         <h2 className="text-2xl text-slate-600 font-bold">
//           Dashboard
//         </h2>
//       </div>

//       {/* User Menu */}

//       <div className="space-y-1">

//         {userMenu.map((item) => (
//           <SidebarItem
//             key={item.href}
//             item={item}
//           />
//         ))}

//       </div>

//       {/* Admin Menu */}

//       {role === "admin" && (
//         <>
//           <div className="my-6 border-t" />

//           <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-default-500">
//             Administration
//           </p>

//           <div className="space-y-1">

//             {adminMenu.map((item) => (
//               <SidebarItem
//                 key={item.href}
//                 item={item}
//               />
//             ))}

//           </div>
//         </>
//       )}

//     </aside>
//   );
// }



// // import {Bell, Envelope, Gear, House, LayoutSideContentLeft, Magnifier, Person} from "@gravity-ui/icons";
// // import {Button, Drawer} from "@heroui/react";

// // export function DashboardSidebar() {
// //   const navItems = [
// //     {icon: House, label: "Home"},
// //     {icon: Magnifier, label: "Manage Users"},
// //     {icon: Bell, label: "Manage Lessons"},
// //     {icon: Envelope, label: "Flagged Lessons"},
// //     {icon: Person, label: "Admin Profile"}
// //   ];

// //   const navContent = <nav className="flex flex-col gap-1">
// //                 {navItems.map((item) => (
// //                   <button
// //                     key={item.label}
// //                     className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
// //                     type="button"
// //                   >
// //                     <item.icon className="size-5 text-muted" />
// //                     {item.label}
// //                   </button>
// //                 ))}
// //               </nav>

// //   return (
// //     <>
// //     <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
// //       {navContent}
// //     </aside>
// //     <Drawer>
// //       <Button className="lg:hidden" variant="secondary">
// //         <LayoutSideContentLeft />
// //         Sidebar
// //       </Button>
// //       <Drawer.Backdrop>
// //         <Drawer.Content placement="left">
// //           <Drawer.Dialog>
// //             <Drawer.CloseTrigger />
// //             <Drawer.Header>
// //               <Drawer.Heading>Navigation</Drawer.Heading>
// //             </Drawer.Header>
// //             <Drawer.Body>
// //               {navContent}
// //             </Drawer.Body>
// //           </Drawer.Dialog>
// //         </Drawer.Content>
// //       </Drawer.Backdrop>
// //     </Drawer>
// //     </>
// //   );
// // }