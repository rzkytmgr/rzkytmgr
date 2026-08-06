"use client";

import { useMemo, useState } from "react";
import { FadeUp } from "@/components/structured/fade-up";
import {
    FilterPills,
    type FilterOption,
} from "@/components/structured/filter-pills";
import { Typography } from "@/components/ui/typography";
import type { ShowcaseCardType } from "@/types/global";
import { cn } from "@/utils";
import { ShowcaseCard } from "./card";

type ShowcaseGridProps = Readonly<{
    items: ShowcaseCardType[];
}>;

const OPEN_SOURCE_KEY = "opensource";
const UNMAINTAINED_KEY = "unmaintained";

const isOpenSource = (item: ShowcaseCardType) =>
    Boolean(item.link.repository && item.link.repository.trim() !== "");

export function ShowcaseGrid({ items }: ShowcaseGridProps) {
    const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());

    const options = useMemo<FilterOption[]>(
        () => [
            {
                key: OPEN_SOURCE_KEY,
                label: "Open Source",
                count: items.filter(isOpenSource).length,
            },
            {
                key: UNMAINTAINED_KEY,
                label: "Unmaintained",
                count: items.filter((item) => item.is_archive).length,
            },
        ],
        [items],
    );

    const visible = items.filter((item) => {
        if (selected.size === 0) {
            return true;
        }

        return (
            (!selected.has(OPEN_SOURCE_KEY) || isOpenSource(item)) &&
            (!selected.has(UNMAINTAINED_KEY) || item.is_archive)
        );
    });

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
                ariaLabel="Filter projects"
                options={options}
                selected={selected}
                onSelect={handleSelect}
                total={items.length}
            />

            {visible.length === 0 ? (
                <Typography as="p" size="sm" className={cn("text-neutral-500")}>
                    No projects match the selected filters.
                </Typography>
            ) : (
                <div
                    className={cn(
                        "grid",
                        "grid-cols-1",
                        "gap-2",
                        "md:grid-cols-2",
                        "lg:grid-cols-3",
                    )}
                >
                    {visible.map((data, index) => (
                        <FadeUp key={data.id} delay={0.05 * index}>
                            <ShowcaseCard data={data} />
                        </FadeUp>
                    ))}
                </div>
            )}
        </div>
    );
}
