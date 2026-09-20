"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { FadeUp } from "@/components/structured/fade-up";
import {
    FilterPills,
    type FilterOption,
} from "@/components/structured/filter-pills";
import { Typography } from "@/components/ui/typography";
import type { LaboratoryCardType } from "@/types/global";
import { cn } from "@/utils";
import { LaboratoryRow } from "./row";

type LaboratoryGridProps = Readonly<{
    items: LaboratoryCardType[];
}>;

const ACTIVE_KEY = "active";
const ARCHIVED_KEY = "archived";

export function LaboratoryGrid({ items }: LaboratoryGridProps) {
    const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
    const [query, setQuery] = useState("");

    const options = useMemo<FilterOption[]>(
        () => [
            {
                key: ACTIVE_KEY,
                label: "Active",
                count: items.filter((item) => !item.is_archive).length,
            },
            {
                key: ARCHIVED_KEY,
                label: "Archived",
                count: items.filter((item) => item.is_archive).length,
            },
        ],
        [items],
    );

    const normalizedQuery = query.trim().toLowerCase();

    const visible = useMemo(() => {
        const byStatus = items.filter((item) => {
            if (selected.size === 0) {
                return true;
            }

            return selected.has(ARCHIVED_KEY)
                ? item.is_archive
                : !item.is_archive;
        });

        if (!normalizedQuery) {
            return byStatus;
        }

        return byStatus.filter(
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
                        ariaLabel="Filter experiments"
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
                                    id="laboratory-search"
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
                                    placeholder="search experiments..."
                                    aria-label="Search experiments"
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
                    </div>
                </div>
            </FadeUp>

            {visible.length === 0 ? (
                <Typography as="p" size="sm" className={cn("text-neutral-500")}>
                    No experiments match your search or filter.
                </Typography>
            ) : (
                <div className={cn("border-t", "border-smooth-border")}>
                    {visible.map((data, index) => (
                        <FadeUp key={data.id} delay={0.04 * index}>
                            <LaboratoryRow data={data} index={index} />
                        </FadeUp>
                    ))}
                </div>
            )}
        </div>
    );
}
