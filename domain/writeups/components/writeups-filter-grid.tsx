"use client";

import { Rss, Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FadeUp } from "@/components/structured/fade-up";
import {
    FilterPills,
    type FilterOption,
} from "@/components/structured/filter-pills";
import { Typography } from "@/components/ui/typography";
import type { WriteupsCardType } from "@/types/global";
import { cn } from "@/utils";
import { WriteupsYearGrid } from "./writeups-year-grid";

type WriteupsFilterGridProps = Readonly<{
    items: WriteupsCardType[];
    rssHref: string;
}>;

export function WriteupsFilterGrid({
    items,
    rssHref,
}: WriteupsFilterGridProps) {
    const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
    const [query, setQuery] = useState("");

    const options = useMemo<FilterOption[]>(() => {
        const counts = new Map<string, number>();

        for (const item of items) {
            counts.set(item.tag, (counts.get(item.tag) ?? 0) + 1);
        }

        return [...counts.entries()]
            .map(([label, count]) => ({ key: label, label, count }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [items]);

    const normalizedQuery = query.trim().toLowerCase();

    const visible = useMemo(() => {
        const byCategory =
            selected.size === 0
                ? items
                : items.filter((item) => selected.has(item.tag));

        if (!normalizedQuery) {
            return byCategory;
        }

        return byCategory.filter(
            (item) =>
                item.title.toLowerCase().includes(normalizedQuery) ||
                item.description.toLowerCase().includes(normalizedQuery),
        );
    }, [items, selected, normalizedQuery]);

    const handleSelect = (key: string) => {
        if (key === "all") {
            setSelected(new Set());
            return;
        }

        setSelected((prev) => (prev.has(key) ? new Set() : new Set([key])));
    };

    return (
        <div className={cn("space-y-8")}>
            <FadeUp>
                <div
                    className={cn(
                        "sticky",
                        "top-16",
                        "z-40",
                        "flex",
                        "flex-wrap",
                        "items-center",
                        "gap-x-6",
                        "gap-y-3",
                        "bg-background/80",
                        "py-2",
                        "backdrop-blur-md",
                        "border-b",
                        "border-smooth-border",
                    )}
                >
                    <FilterPills
                        ariaLabel="Filter writeups by category"
                        options={options}
                        selected={selected}
                        onSelect={handleSelect}
                        total={items.length}
                        className={cn(
                            "min-w-0",
                            "flex-1",
                            "self-stretch",
                            "-mb-2",
                            "border-b-0",
                            "pb-0",
                        )}
                    />

                    <div
                        className={cn(
                            "flex",
                            "w-full",
                            "shrink-0",
                            "items-center",
                            "gap-2",
                            "sm:w-auto",
                        )}
                    >
                        <div className={cn("w-full", "sm:w-64")}>
                            <div
                                className={cn(
                                    "flex",
                                    "items-center",
                                    "gap-2",
                                    "rounded-full",
                                    "border",
                                    "border-smooth-border",
                                    "bg-neutral-100/60",
                                    "py-1.5",
                                    "pl-3",
                                    "pr-1.5",
                                    "transition-colors",
                                    "duration-150",
                                    "hover:border-neutral-400/60",
                                    "focus-within:border-journal-accent/60",
                                    "motion-reduce:transition-none",
                                )}
                            >
                                <Search
                                    aria-hidden="true"
                                    className={cn(
                                        "size-3.5",
                                        "shrink-0",
                                        "text-neutral-500",
                                    )}
                                />

                                <input
                                    id="writeups-search"
                                    type="search"
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                    onKeyDown={(event) => {
                                        if (event.key === "Escape") {
                                            setQuery("");
                                        }
                                    }}
                                    placeholder="search writeups..."
                                    aria-label="Search writeups"
                                    className={cn(
                                        "w-full",
                                        "min-w-0",
                                        "bg-transparent",
                                        "font-mono",
                                        "text-xs",
                                        "text-zinc-950",
                                        "dark:text-zinc-50",
                                        "placeholder:text-neutral-500",
                                        "outline-none",
                                        "[&::-webkit-search-cancel-button]:hidden",
                                    )}
                                />

                                {query && (
                                    <button
                                        type="button"
                                        aria-label="Clear search"
                                        onClick={() => setQuery("")}
                                        className={cn(
                                            "-my-0.5",
                                            "shrink-0",
                                            "cursor-pointer",
                                            "rounded-full",
                                            "p-1",
                                            "text-neutral-500",
                                            "transition-colors",
                                            "duration-100",
                                            "hover:text-zinc-950",
                                            "dark:hover:text-zinc-50",
                                            "focus-visible:outline-2",
                                            "focus-visible:outline-offset-2",
                                            "focus-visible:outline-journal-accent",
                                        )}
                                    >
                                        <X
                                            aria-hidden="true"
                                            className="size-3"
                                        />
                                    </button>
                                )}
                            </div>
                        </div>

                        <Link
                            href={rssHref}
                            aria-label="Subscribe RSS"
                            title="Subscribe RSS"
                            className={cn(
                                "inline-flex",
                                "size-8",
                                "shrink-0",
                                "items-center",
                                "justify-center",
                                "rounded-full",
                                "border",
                                "border-smooth-border",
                                "bg-neutral-100/60",
                                "text-neutral-500",
                                "transition-colors",
                                "duration-150",
                                "hover:border-journal-accent/60",
                                "hover:text-journal-accent-text",
                                "focus-visible:outline-2",
                                "focus-visible:outline-offset-2",
                                "focus-visible:outline-journal-accent",
                                "motion-reduce:transition-none",
                            )}
                        >
                            <Rss
                                aria-hidden="true"
                                className={cn("size-3.5")}
                            />
                        </Link>
                    </div>
                </div>
            </FadeUp>

            {visible.length === 0 ? (
                <Typography as="p" size="sm" className={cn("text-neutral-500")}>
                    No writeups match your search or filter.
                </Typography>
            ) : (
                <WriteupsYearGrid items={visible} />
            )}
        </div>
    );
}
