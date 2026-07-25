"use client";
import { AppConfigType } from "@/lib/config";
import React from "react";
import { Navbar } from "../structured/navbar";
import { Footer } from "../structured/footer";
import { Sidebar } from "../structured/sidebar";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/utils";

type MainLayoutProps = {
    config: AppConfigType;
    children: React.ReactNode;
};

export function MainLayout({ config, children }: MainLayoutProps) {
    const sidebarState = useSidebarStore((state) => state.open);

    const items = [
        {
            href: "/",
            label: "Home",
        },
        {
            href: "/showcase",
            label: "Showcase",
        },
        {
            href: "/writeups",
            label: "Writeups",
        },
        {
            href: "/lab",
            label: "Laboratory",
        },
        {
            href: "/about",
            label: "About",
        },
        {
            href: "/contact",
            label: "Contact",
        },
    ];

    return (
        <React.Fragment>
            <Sidebar
                value={{
                    items,
                }}
            />
            <div
                id="app"
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
                        items,
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
                        items,
                    }}
                />
            </div>
        </React.Fragment>
    );
}
