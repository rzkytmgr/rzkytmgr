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
    const sidebarState = useSidebarStore((state) => state.open);
    const pathname = usePathname();
    const prevPathname = useRef(pathname);

    useEffect(() => {
        if (prevPathname.current !== pathname) {
            closeSidebar();
            prevPathname.current = pathname;
        }
    }, [pathname, closeSidebar]);

    return (
        <React.Fragment>
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
                        ? "translate-x-[288px] lg:translate-x-[0]"
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
                            copyright: `${config.author.name}. ${config.ui.footer.copyright}`,
                        },
                        items: NAV_ITEMS,
                    }}
                />
            </div>
        </React.Fragment>
    );
}
