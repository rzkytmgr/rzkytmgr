"use client";

import { useMemo, useState } from "react";
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
}>;

export function WriteupsFilterGrid({ items }: WriteupsFilterGridProps) {
    const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());

    const options = useMemo<FilterOption[]>(() => {
        const counts = new Map<string, number>();

        for (const item of items) {
            counts.set(item.tag, (counts.get(item.tag) ?? 0) + 1);
        }

        return [...counts.entries()]
            .map(([label, count]) => ({ key: label, label, count }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [items]);

    const visible =
        selected.size === 0
            ? items
            : items.filter((item) => selected.has(item.tag));

    const handleSelect = (key: string) => {
        if (key === "all") {
            setSelected(new Set());
            return;
        }

        setSelected((prev) => {
            const next = new Set(prev);

            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }

            return next;
        });
    };

    return (
        <div className={cn("space-y-8")}>
            <FilterPills
                ariaLabel="Filter writeups by category"
                options={options}
                selected={selected}
                onSelect={handleSelect}
                total={items.length}
            />

            {visible.length === 0 ? (
                <Typography as="p" size="sm" className={cn("text-neutral-500")}>
                    No writeups in this category.
                </Typography>
            ) : (
                <WriteupsYearGrid items={visible} />
            )}
        </div>
    );
}
