"use client";

import { useMemo, useState } from "react";
import { FadeUp } from "@/components/structured/fade-up";
import {
    FilterPills,
    type FilterOption,
} from "@/components/structured/filter-pills";
import { Typography } from "@/components/ui/typography";
import type { LaboratoryCardType } from "@/types/global";
import { cn } from "@/utils";
import { LaboratoryCard } from "./card";

type LaboratoryGridProps = Readonly<{
    items: LaboratoryCardType[];
}>;

const ACTIVE_KEY = "active";
const ARCHIVED_KEY = "archived";

export function LaboratoryGrid({ items }: LaboratoryGridProps) {
    const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());

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

    const visible = items.filter((item) => {
        if (selected.size === 0) {
            return true;
        }

        return selected.has(ARCHIVED_KEY) ? item.is_archive : !item.is_archive;
    });

    const handleSelect = (key: string) => {
        setSelected(key === "all" ? new Set() : new Set([key]));
    };

    return (
        <div className={cn("space-y-8")}>
            <FilterPills
                ariaLabel="Filter experiments"
                options={options}
                selected={selected}
                onSelect={handleSelect}
                total={items.length}
            />

            {visible.length === 0 ? (
                <Typography as="p" size="sm" className={cn("text-neutral-500")}>
                    No experiments in this category.
                </Typography>
            ) : (
                <div
                    className={cn(
                        "grid",
                        "grid-cols-1",
                        "gap-6",
                        "md:grid-cols-2",
                        "lg:grid-cols-3",
                    )}
                >
                    {visible.map((data, index) => (
                        <FadeUp key={data.id} delay={0.05 * index}>
                            <LaboratoryCard data={data} />
                        </FadeUp>
                    ))}
                </div>
            )}
        </div>
    );
}
