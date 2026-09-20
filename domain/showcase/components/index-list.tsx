"use client";

import { ArrowUpRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { FadeUp } from "@/components/structured/fade-up";
import {
    FilterPills,
    type FilterOption,
} from "@/components/structured/filter-pills";
import { Typography } from "@/components/ui/typography";
import { ShowcaseCard } from "@/domain/showcase/components/card";
import type { ShowcaseCardType } from "@/types/global";
import { cn } from "@/utils";

type ShowcaseIndexProps = Readonly<{
    items: ShowcaseCardType[];
}>;

const ACTIVE_KEY = "active";
const ARCHIVED_KEY = "archived";

export function ShowcaseIndex({ items }: ShowcaseIndexProps) {
    const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
    const [query, setQuery] = useState("");
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);

    const options = useMemo<FilterOption[]>(
        () => [
            {
                key: ACTIVE_KEY,
                label: "Active",
                count: items.filter((item) => !item.is_archive).length,
            },
            {
                key: ARCHIVED_KEY,
                label: "Unmaintained",
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

    const active =
        visible.find(({ id }) => id === hoveredId) ??
        visible.find(({ id }) => id === activeId) ??
        visible[0] ??
        null;

    const handleSelect = (key: string) => {
        if (key === "all") {
            setSelected(new Set());
            return;
        }

        setSelected((prev) => (prev.has(key) ? new Set() : new Set([key])));
    };

    if (!active) {
        return (
            <div className={cn("space-y-8")}>
                <FadeUp>
                    <FilterBar
                        options={options}
                        selected={selected}
                        onSelect={handleSelect}
                        query={query}
                        onQueryChange={setQuery}
                        total={items.length}
                    />
                </FadeUp>

                <Typography as="p" size="sm" className={cn("text-neutral-500")}>
                    No projects match your search or filter.
                </Typography>
            </div>
        );
    }

    return (
        <div className={cn("space-y-8")}>
            <FadeUp>
                <FilterBar
                    options={options}
                    selected={selected}
                    onSelect={handleSelect}
                    query={query}
                    onQueryChange={setQuery}
                    total={items.length}
                />
            </FadeUp>

            <div
                className={cn(
                    "grid",
                    "grid-cols-1",
                    "gap-10",
                    "lg:grid-cols-[26rem_minmax(0,1fr)]",
                    "lg:gap-14",
                )}
            >
                {}
                <aside
                    aria-label="Project preview"
                    className={cn("lg:sticky", "lg:top-24", "lg:self-start")}
                >
                    {}
                    <FadeUp key={active.id} duration={0.3}>
                        <ShowcaseCard
                            data={active}
                            showShape={false}
                            showThumbnail
                            featured
                        />
                    </FadeUp>
                </aside>

                {}
                <ul
                    className={cn(
                        "border-t",
                        "border-smooth-border",
                        "lg:border-t-0",
                    )}
                >
                    {visible.map((item, index) => {
                        const isActive = item.id === active.id;

                        return (
                            <li
                                key={item.id}
                                className={cn(
                                    "border-b",
                                    "border-smooth-border",
                                )}
                            >
                                <FadeUp delay={0.04 * index}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveId(item.id)}
                                        onMouseEnter={() => {
                                            setHoveredId(item.id);
                                            setActiveId(item.id);
                                        }}
                                        onMouseLeave={() => setHoveredId(null)}
                                        onFocus={() => {
                                            setHoveredId(item.id);
                                            setActiveId(item.id);
                                        }}
                                        onBlur={() => setHoveredId(null)}
                                        aria-pressed={isActive}
                                        className={cn(
                                            "group/row",
                                            "flex",
                                            "w-full",
                                            "items-baseline",
                                            "cursor-pointer",
                                            "gap-4",
                                            "py-5",
                                            "text-left",
                                            "md:gap-6",
                                            "md:py-6",
                                        )}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                "font-mono",
                                                "text-xs",
                                                "transition-colors",
                                                "duration-100",
                                                "text-neutral-400",
                                                "dark:text-neutral-600",
                                                isActive &&
                                                    "text-journal-accent-text",
                                                "motion-reduce:transition-none",
                                            )}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span
                                            className={cn(
                                                "flex-1",
                                                "text-xl",
                                                "font-semibold",
                                                "leading-tight",
                                                "tracking-tight",
                                                "transition-colors",
                                                "duration-100",
                                                "motion-reduce:transition-none",
                                                isActive
                                                    ? "text-zinc-950 dark:text-zinc-50"
                                                    : cn(
                                                          "text-neutral-400",
                                                          "dark:text-neutral-500",
                                                          "group-hover/row:text-zinc-950",
                                                          "dark:group-hover/row:text-zinc-50",
                                                      ),
                                            )}
                                        >
                                            {item.title}
                                        </span>

                                        {item.is_archive && (
                                            <span
                                                className={cn(
                                                    "shrink-0",
                                                    "rounded-full",
                                                    "border",
                                                    "border-warning-border",
                                                    "bg-warning-bg",
                                                    "px-2.5",
                                                    "py-0.5",
                                                    "font-mono",
                                                    "text-xs",
                                                    "text-warning-text",
                                                )}
                                            >
                                                unmaintained
                                            </span>
                                        )}

                                        <span
                                            className={cn(
                                                "hidden",
                                                "truncate",
                                                "font-mono",
                                                "text-xs",
                                                "text-neutral-500",
                                                "md:block",
                                                "md:max-w-40",
                                            )}
                                        >
                                            {item.techstack[0] ?? "General"}
                                        </span>

                                        <ArrowUpRight
                                            aria-hidden="true"
                                            className={cn(
                                                "size-4",
                                                "shrink-0",
                                                "self-center",
                                                "text-neutral-400",
                                                "transition-all",
                                                "duration-100",
                                                "group-hover/row:-translate-y-0.5",
                                                "group-hover/row:translate-x-0.5",
                                                "group-hover/row:text-journal-accent-text",
                                                "motion-reduce:transition-none",
                                                "motion-reduce:group-hover/row:translate-x-0",
                                                "motion-reduce:group-hover/row:translate-y-0",
                                            )}
                                        />
                                    </button>
                                </FadeUp>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

type FilterBarProps = Readonly<{
    options: FilterOption[];
    selected: ReadonlySet<string>;
    onSelect: (key: string) => void;
    query: string;
    onQueryChange: (value: string) => void;
    total: number;
}>;

function FilterBar({
    options,
    selected,
    onSelect,
    query,
    onQueryChange,
    total,
}: FilterBarProps) {
    return (
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
                ariaLabel="Filter projects"
                options={options}
                selected={selected}
                onSelect={onSelect}
                total={total}
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
                            type="search"
                            value={query}
                            onChange={(event) =>
                                onQueryChange(event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Escape") {
                                    onQueryChange("");
                                }
                            }}
                            placeholder="search projects..."
                            aria-label="Search projects"
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
                                onClick={() => onQueryChange("")}
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
                                <X aria-hidden="true" className="size-3" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
