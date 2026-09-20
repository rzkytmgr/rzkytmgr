"use client";

import type { NavbarItemType } from "@/types/global";
import { isNavItemActive } from "@/lib/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/utils";
import { Typography } from "../ui/typography";
import { NavbarItem } from "./navbar-item";

type SidebarProps = Readonly<{
    value: {
        items: NavbarItemType[];
    };
}>;

export function Sidebar({ value }: SidebarProps) {
    const sidebarState = useSidebarStore((state) => state.open);
    const closeSidebar = useSidebarStore((state) => state.closeSidebar);
    const pathname = usePathname();

    useEffect(() => {
        if (!sidebarState) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeSidebar();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [sidebarState, closeSidebar]);

    return (
        <aside
            id="sidebar"
            aria-hidden={!sidebarState}
            {...(sidebarState ? {} : { inert: true })}
            className={cn(
                "fixed",
                "top-0",
                "left-0",
                "z-40",
                "min-h-screen",
                "w-72",
                "border-r",
                "border-smooth-border",
                "bg-background",
                "shadow-2xl",
                "transition-transform",
                "duration-300",
                "ease-out",
                "md:hidden",
                sidebarState ? "translate-x-0" : "-translate-x-full",
            )}
        >
            <div className={cn("p-6")}>
                <Typography
                    as="h2"
                    size="xs"
                    className={cn(
                        "font-mono",
                        "uppercase",
                        "tracking-wider",
                        "text-neutral-500",
                    )}
                >
                    Navigation
                </Typography>

                <nav
                    aria-label="Mobile navigation"
                    className={cn("mt-8", "flex", "flex-col", "gap-3")}
                >
                    {value.items.map(({ href, label }) => (
                        <NavbarItem
                            key={label}
                            href={href}
                            active={isNavItemActive(pathname, href)}
                            onClick={closeSidebar}
                        >
                            {label}
                        </NavbarItem>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
