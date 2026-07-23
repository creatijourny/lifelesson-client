"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const SidebarItem = ({ item }) => {
    const pathname = usePathname();

    const Icon = item.icon;

    // Active for nested routes too
    const isActive =
        pathname === item.href ||
        (item.href !== "/dashboard" && pathname.startsWith(item.href));

    return (
        <Link
            href={item.href}
            className={clsx(
                "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-default-700 hover:bg-default-100"
                //   ? "bg-primary/10 text-primary shadow-md"
                //   : "text-default-700 hover:bg-default-100 hover:text-primary"
            )}
        >
            {Icon && (
                <Icon
                    className={clsx(
                        "h-5 w-5 transition-colors",
                        isActive                            
                        ? "text-primary-foreground"
                        : "text-default-500 group-hover:text-primary"
                    )}
                />
            )}

            <span>{item.title}</span>
        </Link>
    );
};

export default SidebarItem;