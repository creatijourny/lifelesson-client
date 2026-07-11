"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@heroui/react";
import { Bars, Xmark, Person, BookOpen } from "@gravity-ui/icons";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const publicLinks = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Public Lessons",
        href: "/lessons",
    },
];



export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);



    const navLinks = [...publicLinks];

    const { data: session, isPending } = authClient.useSession();

    const isLoggedIn = !!session;
    const user = session?.user;


    if (isLoggedIn) {
        navLinks.splice(1, 0,
            {
                title: "Add Lesson",
                href: "/dashboard/add-lesson",
            },
            {
                title: "My Lessons",
                href: "/dashboard/my-lessons",
            }
        );

        if (user.plan === "free") {
            navLinks.push({
                title: "Pricing / Upgrade",
                href: "/pricing",
            });
        }
    }

    const handleSignOut = async () => {
        await authClient.signOut();
    }

    return (
        <header className="sticky top-0 z-50 bg-[#FFFFFF] shadow-sm border-b border-zinc-50">
            <nav className="max-w-7xl mx-auto flex items-center justify-between h-20 px-5 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">

                    <Image
                        src="/lifelogo.png"
                        alt="Life Lessons Logo"
                        width={40}
                        height={40}
                        priority
                        className="object-contain" />

                    <h1 className="text-3xl font-extrabold tracking-tight">
                        <span className="text-sky-500">life </span>
                        <span className="text-orange-500">lessons</span>
                    </h1>

                    {/* <Link href="/" className="shrink-0">
                            <h1 className="text-3xl font-extrabold tracking-tight">
                                <span className="text-sky-500">hire</span>
                                <span className="text-orange-500">loop</span>
                            </h1>
                        </Link> */}


                    {/* <div className="leading-none">
                        <h2 className="font-bold text-xl text-slate-800">
                            life lessons
                        </h2>
                        
                    </div> */}
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex items-center gap-10">
                    {navLinks.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`relative pb-2 font-medium transition ${pathname === item.href
                                    ? "text-indigo-600"
                                    : "text-zinc-400 hover:text-indigo-600"
                                    }`}
                            >
                                {item.title}

                                {pathname === item.href && (
                                    <span className="absolute left-0 bottom-0 h-[2px] w-full rounded bg-indigo-600"></span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                    {!isLoggedIn ? (<>
                        <Link href="/login">
                            <Button

                                variant="bordered"
                                radius="sm"
                                startContent={<Person className="h-4 w-4" />}
                                className="border-slate-300"
                            >
                                Sign in
                            </Button>
                        </Link>

                        <Link href="/sign-up">
                            <Button


                                color="primary"
                                radius="sm"
                            >
                                Sign up
                            </Button>
                        </Link>
                    </>) : (
                        <>
                            <Link href="/dashboard">
                                <Button
                                    variant="bordered"
                                    onPress={() => setOpen(false)}
                                >
                                    Dashboard
                                </Button>
                            </Link>
                            {/* <div className="font-bold text-orange-500">
                                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                            </div> */}
                            <div>
                                {/* <p className="font-semibold">{user?.name}</p> */}
                                <p className="text-sm text-orange-500">
                                    {user?.role
                                        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                                        : ""}
                                </p>
                            </div>

                            <Button onClick={handleSignOut}
                                color="danger"
                                variant="flat"
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden"
                >
                    {open ? (
                        <Xmark className="h-6 w-6" />
                    ) : (
                        <Bars className="h-6 w-6" />
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            {open && (
                <div className="lg:hidden border-t border-slate-200 bg-white">
                    <ul className="flex flex-col px-5 py-5 space-y-5">
                        {navLinks.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`block ${pathname === item.href
                                        ? "text-indigo-600 font-semibold"
                                        : "text-slate-700"
                                        }`}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}

                        <div className="pt-3 border-t flex flex-col gap-3">
                            {!isLoggedIn ? (
                                <>
                                    <Link href="/login">
                                        <Button
                                            variant="bordered"
                                            startContent={<Person className="h-4 w-4" />}
                                            onPress={() => setOpen(false)}
                                        >
                                            Login
                                        </Button>
                                    </Link>

                                    <Link href="/sign-up">
                                        <Button
                                            color="primary"
                                            onPress={() => setOpen(false)}
                                        >
                                            Sign up
                                        </Button>
                                    </Link>
                                </>) : (
                                <>
                                    <Link href="/dashboard">
                                        <Button
                                            variant="bordered"
                                            onPress={() => setOpen(false)}
                                        >
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <div className="font-bold text-orange-500">
                                        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                                    </div>

                                    <Button onClick={handleSignOut}
                                        color="danger"
                                        variant="flat"
                                    >
                                        Logout
                                    </Button>
                                </>
                            )})
                        </div>
                    </ul>
                </div>
            )}
        </header>
    );
}


// "use client";
// import { useState } from "react";
// import { Link, Button } from "@heroui/react";

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
//       <header className="flex h-16 items-center justify-between px-6">
//         <div className="flex items-center gap-4">
//           <button
//             className="md:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             <span className="sr-only">Menu</span>
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//           <div>Logo</div>
//         </div>
//         <ul className="hidden items-center gap-4 md:flex">
//           <li>
//             <Link href="#">Features</Link>
//           </li>
//           <li>
//             <Link href="#">Pricing</Link>
//           </li>
//         </ul>
//       </header>
//       {isMenuOpen && (
//         <div className="border-t border-separator md:hidden">
//           <ul className="flex flex-col gap-2 p-4">
//             <li>
//               <Link href="#" className="block py-2">
//                 Features
//               </Link>
//             </li>
//             <li>
//               <Link href="#" className="block py-2">
//                 Pricing
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;