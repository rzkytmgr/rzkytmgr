"use client";

import { useEffect, useState } from "react";
import { Typography } from "../ui/typography";
import type { MarkdownHeading } from "@/utils/markdown";
import { cn } from "@/utils";

type TableOfContentsProps = Readonly<{
    headings: MarkdownHeading[];
}>;

const SCROLL_OFFSET = 96;

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (headings.length === 0) {
            return;
        }

        const elements = headings
            .map((heading) => document.getElementById(heading.id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) {
            return;
        }

        let ticking = false;

        const update = () => {
            ticking = false;

            let current: string | null = null;

            for (const element of elements) {
                if (element.getBoundingClientRect().top <= SCROLL_OFFSET) {
                    current = element.id;
                }
            }

            setActiveId(current);
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [headings]);

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav
            aria-label="Table of contents"
            className={cn(
                "flex",
                "min-h-0",
                "flex-1",
                "max-h-[calc(100vh-7rem)]",
                "flex-col",
                "gap-4",
            )}
        >
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
                On this page
            </Typography>

            <ul
                className={cn(
                    "min-h-0",
                    "space-y-2.5",
                    "overflow-y-auto",
                    "overscroll-contain",
                    "[scrollbar-width:thin]",
                    "[scrollbar-color:var(--color-smooth-border)_transparent]",
                    "dark:[scrollbar-color:var(--color-neutral-400)_transparent]",
                    "[&::-webkit-scrollbar]:w-1",
                    "[&::-webkit-scrollbar-thumb]:rounded-full",
                    "[&::-webkit-scrollbar-thumb]:bg-smooth-border",
                    "dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400",
                    "[&::-webkit-scrollbar-track]:bg-transparent",
                    "border-l",
                    "border-smooth-border/70",
                    "pl-4",
                )}
            >
                {headings.map((heading) => {
                    const isActive = heading.id === activeId;

                    return (
                        <li key={heading.id}>
                            <a
                                href={`#${heading.id}`}
                                aria-current={isActive ? "location" : undefined}
                                className={cn(
                                    "relative",
                                    "block",
                                    "text-sm",
                                    "leading-snug",
                                    "text-zinc-600",
                                    "transition-colors",
                                    "hover:text-journal-accent",
                                    "dark:text-zinc-400",
                                    heading.level === 3 && "pl-4",
                                    heading.level === 4 && "pl-8",
                                    isActive &&
                                        "text-journal-accent dark:text-journal-accent",
                                )}
                            >
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        "absolute",
                                        "-left-4",
                                        "top-1/2",
                                        "h-4",
                                        "w-0.5",
                                        "-translate-y-1/2",
                                        "rounded-full",
                                        "bg-journal-accent",
                                        "transition-opacity",
                                        isActive ? "opacity-100" : "opacity-0",
                                    )}
                                />
                                {heading.text}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
