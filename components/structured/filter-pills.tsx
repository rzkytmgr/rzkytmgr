"use client";

import { cn } from "@/utils";

export type FilterOption = {
    key: string;
    label: string;
    count: number;
};

type FilterPillsProps = Readonly<{
    options: FilterOption[];
    selected: ReadonlySet<string>;
    onSelect: (key: string) => void;
    ariaLabel: string;
    allLabel?: string;
    total?: number;
    className?: string;
}>;

const pillBase = cn(
    "rounded-full",
    "border",
    "px-3",
    "py-1.5",
    "font-mono",
    "text-xs",
    "transition-colors",
    "shrink-0",
);

const pillActive = cn(
    "border-zinc-900",
    "bg-zinc-900",
    "text-zinc-50",
    "dark:border-zinc-100",
    "dark:bg-zinc-100",
    "dark:text-zinc-900",
);

const pillIdle = cn(
    "border-smooth-border/70",
    "bg-transparent",
    "text-neutral-500",
    "hover:border-journal-accent/60",
    "hover:text-journal-accent",
    "dark:hover:border-journal-accent/50",
    "dark:hover:text-journal-accent",
);

export function FilterPills({
    options,
    selected,
    onSelect,
    ariaLabel,
    allLabel = "All",
    total,
    className,
}: FilterPillsProps) {
    const allTotal =
        total ?? options.reduce((sum, option) => sum + option.count, 0);
    const allActive = selected.size === 0;

    return (
        <div
            role="group"
            aria-label={ariaLabel}
            className={cn(
                "flex",
                "flex-nowrap",
                "items-center",
                "gap-2",
                "overflow-x-auto",
                "overscroll-x-contain",
                "[-ms-overflow-style:none]",
                "[scrollbar-width:none]",
                "[&::-webkit-scrollbar]:hidden",
                className,
            )}
        >
            <button
                type="button"
                aria-pressed={allActive}
                onClick={() => onSelect("all")}
                className={cn(pillBase, allActive ? pillActive : pillIdle)}
            >
                {allLabel} ({allTotal})
            </button>

            {options.map(({ key, label, count }) => {
                const active = selected.has(key);

                return (
                    <button
                        key={key}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onSelect(key)}
                        className={cn(pillBase, active ? pillActive : pillIdle)}
                    >
                        {label} ({count})
                    </button>
                );
            })}
        </div>
    );
}
