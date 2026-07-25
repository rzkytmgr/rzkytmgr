"use client";

import Link from "next/link";
import { Moon, PanelLeft, Sun } from "lucide-react";
import type { NavbarItemType } from "@/types/global";
import { NavbarItem } from "./navbar-item";
import { cn } from "@/utils";
import { sansMontserrat } from "@/lib/fonts";
import { useSidebarStore } from "@/store/sidebar-store";

type NavbarProps = {
    value: {
        title: string;
        items: NavbarItemType[];
    };
};

export function Navbar({ value }: NavbarProps) {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const sidebarState = useSidebarStore((state) => state.open);
    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full",
                "border-b border-smooth-border/70 dark:border-smooth-border/70",
                "bg-background/80 dark:bg-background/80 backdrop-blur-md",
            )}
        >
            <div className="max-w-6xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between">
                <div className="flex-1 flex justify-start block lg:hidden">
                    <button
                        id="sidebar-toggle"
                        className={cn(
                            "p-2 rounded-md text-journal-light-muted dark:text-journal-dark-muted",
                            "hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer",
                            "active:bg-neutral-100",
                            sidebarState ? "bg-neutral-100" : "",
                        )}
                        aria-label="Sidebar toggle button"
                        onClick={toggleSidebar}
                    >
                        <PanelLeft className="w-5 h-5 block" />
                    </button>
                </div>

                <Link
                    href={"/"}
                    className={cn(
                        "font-sans text-sm font-bold tracking-tight flex-none lg:flex-1",
                        "hover:text-journal-accent transition-colors flex items-center gap-1",
                        sansMontserrat.className,
                    )}
                    aria-label="Brand Title"
                >
                    {value.title}
                </Link>

                <nav
                    className="hidden lg:flex flex-none items-center gap-7 shrink-0 grow-0"
                    aria-label="Navigation Bar"
                >
                    {value.items.map(({ href, label }) => (
                        <NavbarItem key={label} href={href} aria-label={label}>
                            {label}
                        </NavbarItem>
                    ))}
                </nav>

                <div className="flex-1 flex justify-end">
                    <button
                        id="theme-toggle"
                        className={cn(
                            "p-2 rounded-md text-journal-light-muted dark:text-journal-dark-muted",
                            "hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer",
                        )}
                        aria-label="Toggle interface theme button"
                    >
                        <Sun className="w-5 h-5 dark:block hidden" />
                        <Moon className="w-5 h-5 block dark:hidden" />
                    </button>
                </div>
            </div>
        </header>
    );
}
