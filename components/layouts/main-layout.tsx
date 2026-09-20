"use client";
import type { AppConfigType } from "@/lib/config";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { Navbar } from "../structured/navbar";
import { Footer } from "../structured/footer";
import { Sidebar } from "../structured/sidebar";
import { NAV_ITEMS } from "@/lib/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/utils";

type MainLayoutProps = {
    config: AppConfigType;
    children: React.ReactNode;
};

export function MainLayout({ config, children }: MainLayoutProps) {
    const closeSidebar = useSidebarStore((state) => state.closeSidebar);
    const openSidebar = useSidebarStore((state) => state.openSidebar);
    const sidebarState = useSidebarStore((state) => state.open);
    const pathname = usePathname();
    const prevPathname = useRef(pathname);

    useEffect(() => {
        if (prevPathname.current !== pathname) {
            closeSidebar();
            prevPathname.current = pathname;
        }
    }, [pathname, closeSidebar, openSidebar]);

    return (
        <React.Fragment>
            <a
                href="#main-content"
                className={cn(
                    "fixed",
                    "left-4",
                    "top-4",
                    "z-[100]",
                    "-translate-y-20",
                    "rounded-md",
                    "border",
                    "border-smooth-border",
                    "bg-surface",
                    "px-4",
                    "py-2",
                    "font-mono",
                    "text-xs",
                    "text-journal-accent-text",
                    "shadow-lg",
                    "transition-transform",
                    "duration-150",
                    "focus-visible:translate-y-0",
                )}
            >
                Skip to content
            </a>
            <Sidebar
                value={{
                    items: NAV_ITEMS,
                }}
            />
            <div
                id="app"
                onClick={closeSidebar}
                className={cn(
                    "transition-transform duration-300 ease-out",
                    sidebarState
                        ? "translate-x-[288px] md:translate-x-[0]"
                        : "",
                )}
            >
                <Navbar
                    value={{
                        title: config.title,
                        items: NAV_ITEMS,
                    }}
                />
                {children}
                <Footer
                    value={{
                        title: config.title,
                        social: [
                            ...config.author.social,
                            {
                                name: "Email",
                                href: `mailto:${config.author.email}`,
                            },
                            {
                                name: "RSS",
                                href: config.rss,
                            },
                        ],
                        static: {
                            description: config.ui.footer.description,
                            copyright: config.author.name,
                        },
                    }}
                />
            </div>
        </React.Fragment>
    );
}
