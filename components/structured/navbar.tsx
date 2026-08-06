"use client";

import { Moon, PanelLeft, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { MouseEventHandler } from "react";
import { montserrat } from "@/lib/fonts";
import { useSidebarStore } from "@/store/sidebar-store";
import type { NavbarItemType } from "@/types/global";
import { cn } from "@/utils";
import { NavbarItem } from "./navbar-item";

type NavbarProps = Readonly<{
    value: {
        title: string;
        items: NavbarItemType[];
    };
}>;

export function Navbar({ value }: NavbarProps) {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

    const sidebarState = useSidebarStore((state) => state.open);

    const { resolvedTheme, setTheme } = useTheme();
    const pathname = usePathname();

    const handleToggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const handleOpenSidebar: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        toggleSidebar();
    };

    return (
        <header
            className={cn(
                "sticky",
                "top-0",
                "z-50",
                "w-full",
                "border-b",
                "border-smooth-border/70",
                "bg-background/80",
                "backdrop-blur-md",
            )}
        >
            <div
                className={cn(
                    "mx-auto",
                    "flex",
                    "h-16",
                    "w-full",
                    "max-w-6xl",
                    "items-center",
                    "justify-between",
                    "px-5",
                    "md:px-6",
                )}
            >
                <div
                    className={cn(
                        "flex",
                        "flex-1",
                        "justify-start",
                        "lg:hidden",
                    )}
                >
                    <button
                        id="sidebar-toggle"
                        type="button"
                        aria-label="Open sidebar"
                        aria-expanded={sidebarState}
                        aria-controls="sidebar"
                        onClick={handleOpenSidebar}
                        className={cn(
                            "cursor-pointer",
                            "rounded-md",
                            "p-2",
                            "text-journal-light-muted",
                            "transition-colors",
                            "hover:bg-neutral-100",
                            "active:bg-neutral-100",
                            "dark:text-journal-dark-muted",
                            "dark:hover:bg-neutral-100",
                            sidebarState && "bg-neutral-100",
                        )}
                    >
                        <PanelLeft
                            aria-hidden="true"
                            className={cn("size-5")}
                        />
                    </button>
                </div>

                <Link
                    href="/"
                    className={cn(
                        "flex",
                        "flex-none",
                        "shrink-0",
                        "w-fit",
                        "items-center",
                        "gap-1",
                        "font-sans",
                        "text-sm",
                        "font-bold",
                        "tracking-tight",
                        "transition-colors",
                        "hover:text-journal-accent",
                        montserrat.className,
                    )}
                >
                    {value.title}
                </Link>

                <nav
                    aria-label="Primary navigation"
                    className={cn(
                        "hidden",
                        "flex-1",
                        "shrink-0",
                        "grow-0",
                        "items-center",
                        "justify-center",
                        "gap-7",
                        "lg:flex",
                    )}
                >
                    {value.items.map(({ href, label }) => (
                        <NavbarItem
                            key={label}
                            href={href}
                            active={isActive(href)}
                        >
                            {label}
                        </NavbarItem>
                    ))}
                </nav>

                <div
                    className={cn(
                        "flex",
                        "flex-1",
                        "justify-end",
                        "lg:flex-none",
                    )}
                >
                    <button
                        id="theme-toggle"
                        type="button"
                        aria-label="Toggle interface theme"
                        onClick={handleToggleTheme}
                        className={cn(
                            "cursor-pointer",
                            "rounded-md",
                            "p-2",
                            "text-journal-light-muted",
                            "transition-colors",
                            "hover:bg-neutral-100",
                            "dark:text-journal-dark-muted",
                            "dark:hover:bg-neutral-100",
                        )}
                    >
                        <Sun
                            aria-hidden="true"
                            className={cn("hidden", "size-5", "dark:block")}
                        />

                        <Moon
                            aria-hidden="true"
                            className={cn("block", "size-5", "dark:hidden")}
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}
