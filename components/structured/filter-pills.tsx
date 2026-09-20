"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const tabBase = cn(
    "relative",
    "px-0.5",
    "py-1",
    "font-mono",
    "text-xs",
    "transition-colors",
    "duration-100",
    "shrink-0",
    "cursor-pointer",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-4",
    "focus-visible:outline-journal-accent",
);

const tabActive = cn("text-zinc-950", "dark:text-zinc-50");

const tabIdle = cn(
    "text-zinc-700",
    "dark:text-zinc-300",
    "hover:text-zinc-950",
    "dark:hover:text-zinc-50",
    "focus-visible:text-zinc-950",
    "dark:focus-visible:text-zinc-50",
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

    const activeKey = selected.size === 0 ? "all" : [...selected][0];

    const buttonsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
    const [indicator, setIndicator] = useState<{
        x: number;
        w: number;
    } | null>(null);

    const measure = useCallback(() => {
        const btn = buttonsRef.current.get(activeKey);
        if (!btn) return;

        setIndicator({ x: btn.offsetLeft, w: btn.offsetWidth });
    }, [activeKey]);

    useEffect(() => {
        measure();
    }, [measure]);

    useEffect(() => {
        const onResize = () => measure();

        window.addEventListener("resize", onResize);
        document.fonts?.ready?.then(() => measure());

        return () => window.removeEventListener("resize", onResize);
    }, [measure]);

    return (
        <div
            role="group"
            aria-label={ariaLabel}
            className={cn(
                "relative",
                "flex",
                "flex-nowrap",
                "items-center",
                "gap-x-6",
                "gap-y-2",
                "border-b",
                "border-smooth-border",
                "pb-3",
                "overflow-x-auto",
                "overscroll-x-contain",
                "[-ms-overflow-style:none]",
                "[scrollbar-width:none]",
                "[&::-webkit-scrollbar]:hidden",
                className,
            )}
        >
            <button
                ref={(el) => {
                    if (el) buttonsRef.current.set("all", el);
                }}
                type="button"
                aria-pressed={activeKey === "all"}
                onClick={() => onSelect("all")}
                className={cn(
                    tabBase,
                    activeKey === "all" ? tabActive : tabIdle,
                )}
            >
                {allLabel} <span className={cn("opacity-60")}>{allTotal}</span>
            </button>

            {options.map(({ key, label, count }) => {
                const active = key === activeKey;

                return (
                    <button
                        key={key}
                        ref={(el) => {
                            if (el) buttonsRef.current.set(key, el);
                        }}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onSelect(key)}
                        className={cn(tabBase, active ? tabActive : tabIdle)}
                    >
                        {label}{" "}
                        <span className={cn("opacity-60")}>{count}</span>
                    </button>
                );
            })}

            {indicator && (
                <span
                    aria-hidden="true"
                    className={cn(
                        "absolute",
                        "bottom-0",
                        "h-0.5",
                        "bg-journal-accent",
                        "transition-all",
                        "duration-300",
                        "ease-out",
                        "motion-reduce:transition-none",
                    )}
                    style={{
                        transform: `translateX(${indicator.x}px)`,
                        width: indicator.w,
                    }}
                />
            )}
        </div>
    );
}
