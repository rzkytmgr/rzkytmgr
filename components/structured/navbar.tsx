"use client";

import { Ghost, PaintbrushVertical, PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type MouseEventHandler } from "react";
import { montserrat } from "@/lib/fonts";
import { isNavItemActive } from "@/lib/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import type { NavbarItemType } from "@/types/global";
import { cn } from "@/utils";
import { NavbarItem } from "./navbar-item";
import { ThemeModal } from "./theme-modal";

type NavbarProps = Readonly<{
    value: {
        title: string;
        items: NavbarItemType[];
    };
}>;

export function Navbar({ value }: NavbarProps) {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

    const sidebarState = useSidebarStore((state) => state.open);

    const pathname = usePathname();
    const [themeModalOpen, setThemeModalOpen] = useState(false);

    const isActive = (href: string) => isNavItemActive(pathname, href);

    const handleOpenSidebar: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        toggleSidebar();
    };

    return (
        <header
            className={cn(
                "group/nav",
                "sticky",
                "top-0",
                "z-50",
                "w-full",
                "bg-background/80",
                "backdrop-blur-md",
            )}
        >
            <div
                aria-hidden="true"
                className={cn(
                    "absolute",
                    "inset-x-0",
                    "bottom-0",
                    "h-px",
                    "bg-gradient-to-r",
                    "from-transparent",
                    "via-smooth-border",
                    "to-transparent",
                )}
            />
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
                    "sm:px-6",
                )}
            >
                <div
                    className={cn(
                        "flex",
                        "flex-1",
                        "justify-start",
                        "md:hidden",
                    )}
                >
                    <button
                        id="sidebar-toggle"
                        type="button"
                        aria-label={
                            sidebarState ? "Close sidebar" : "Open sidebar"
                        }
                        aria-expanded={sidebarState}
                        aria-controls="sidebar"
                        onClick={handleOpenSidebar}
                        className={cn(
                            "cursor-pointer",
                            "rounded-md",
                            "p-2",
                            "text-journal-light-muted",
                            "transition-colors",
                            "hover:bg-journal-accent/10",
                            "active:bg-journal-accent/10",
                            "dark:text-journal-dark-muted",
                            "dark:hover:bg-journal-accent/20",
                            sidebarState && "bg-journal-accent/10",
                        )}
                    >
                        <PanelLeft
                            aria-hidden="true"
                            className={cn("size-4")}
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
                        "hover:text-journal-accent-text",
                        montserrat.className,
                    )}
                >
                    <Ghost aria-hidden="true" className={cn("size-4")} />
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
                        "gap-1",
                        "md:flex",
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
                        "items-center",
                        "justify-end",
                        "gap-3",
                        "md:flex-none",
                    )}
                >
                    <button
                        id="theme-toggle"
                        type="button"
                        suppressHydrationWarning
                        aria-label="Choose theme"
                        aria-haspopup="dialog"
                        aria-expanded={themeModalOpen}
                        onClick={() => setThemeModalOpen(true)}
                        className={cn(
                            "cursor-pointer",
                            "rounded-md",
                            "p-2",
                            "text-journal-light-muted",
                            "transition-colors",
                            "duration-100",
                            "hover:bg-journal-accent/10",
                            "hover:text-journal-accent-text",
                            "dark:text-journal-dark-muted",
                            "dark:hover:bg-journal-accent/20",
                            themeModalOpen && "bg-journal-accent/10",
                        )}
                    >
                        <PaintbrushVertical
                            aria-hidden="true"
                            className={cn(
                                "size-4",
                                "transition-transform",
                                "duration-300",
                                "group-hover/nav:rotate-12",
                            )}
                        />
                    </button>
                </div>
            </div>

            <ThemeModal
                open={themeModalOpen}
                onClose={() => setThemeModalOpen(false)}
            />
        </header>
    );
}
