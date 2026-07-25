"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { NavbarItemType } from "@/types/global";
import { cn } from "@/utils";
import { Typography } from "../ui/typography";
import { NavbarItem } from "./navbar-item";

type SidebarProps = {
    value: {
        items: NavbarItemType[];
    };
};

export function Sidebar({ value }: SidebarProps) {
    const sidebarState = useSidebarStore((state) => state.open);
    return (
        <aside
            id="sidebar"
            className={cn(
                "fixed lg:hidden top-0 left-0 z-40 min-h-screen w-72 border-r border-smooth-border/70",
                "transition-transform duration-300 ease-out",
                sidebarState ? "" : "-translate-x-full",
            )}
        >
            <div className="p-6">
                <Typography
                    as="h3"
                    size="xs"
                    className="font-mono uppercase text-neutral-500 tracking-wider"
                >
                    Navigation
                </Typography>

                <nav
                    className="flex flex-col gap-3 mt-8"
                    aria-label="Navigation Bar"
                >
                    {value.items.map(({ href, label }) => (
                        <NavbarItem key={label} href={href} aria-label={label}>
                            {label}
                        </NavbarItem>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
