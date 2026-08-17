"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, Button } from "@heroui/react";
import { Bars, Xmark, Person, BookOpen } from "@gravity-ui/icons";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import PremiumBadge from "./PremiumBadge";

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

    const { data: session, isPending } =
        authClient.useSession();

    const isLoggedIn = !!session;
    const user = session?.user;

    const navLinks = [...publicLinks];

    if (isLoggedIn) {
        navLinks.splice(1, 0, {
            title: "Dashboard",
            href: "/dashboard",
        });

        // Show Pricing only for Free users
        if (user?.plan !== "premium") {
            navLinks.push({
                title: "Pricing / Upgrade",
                href: "/pricing",
            });
        }
        console.log(user);
    }
    const handleSignOut = async () => {
        await authClient.signOut();
        redirect('/');
    }

    return (
        <header className="sticky top-0 z-50 border-b border-white/20 bg-gradient-to-r from-slate-50/90 via-white/85 to-sky-50/90 backdrop-blur-xl shadow-sm shadow-slate-200/30">
            {/* <header className="sticky top-0 z-50 bg-background/70 shadow-sm border-b border-zinc-50"> */}
            <nav className="max-w-7xl mx-auto flex items-center justify-between h-15 px-2 lg:px-3">
                {/* Logo */}
                {/* <Link href="/" className="flex items-center gap-3">

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
                </Link>  */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/lifelogo.png"
                        alt="Life Lessons Logo"
                        width={40}
                        height={40}
                        priority
                        className="object-contain"
                    />

                    <h1 className="text-3xl font-extrabold tracking-tight">
                        <span className="text-sky-500">life </span>
                        <span className="text-orange-500">lessons</span>
                    </h1>
                </Link>

                <ul className="hidden lg:flex items-center gap-5">

                    {navLinks.map((item) => (

                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`relative pb-2 transition ${pathname === item.href
                                        ? "text-indigo-500"
                                        : "text-slate-700 hover:text-indigo-600"
                                    }`}
                            >
                                {item.title}

                                {pathname === item.href && (
                                    <span className="absolute left-0 bottom-0 h-[2px] w-full rounded bg-indigo-600"></span>
                                )}
                            </Link>
                        </li>
                    ))}

                    {isLoggedIn && user?.plan === "premium" && (
                        <li>
                            <Link href="/dashboard/profile">
                                <PremiumBadge />
                            </Link>
                        </li>
                    )}

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

                            <div className="flex justify-center items-center gap-1.5">
                                {/* <p className="font-semibold">{user?.name}</p> */}
                                <p className="text-sm font-medium text-foreground">
                                    Hi, {user?.name
                                        ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                                        : ""}
                                </p>
                                <Avatar>
                                    <Avatar.Image alt={user?.name} src={user?.image} />
                                    <Avatar.Fallback>{user?.name.charAt(0).toUpperCase()}</Avatar.Fallback>
                                </Avatar>
                            </div>

                            <div>
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
                        {isLoggedIn && user?.plan === "premium" && (
                            <li>
                                <Link
                                    href="/dashboard/profile"
                                    onClick={() => setOpen(false)}
                                >
                                    <PremiumBadge />
                                </Link>
                            </li>
                        )}

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
                            )}
                        </div>
                    </ul>
                </div>
            )}
        </header>
    );
}

