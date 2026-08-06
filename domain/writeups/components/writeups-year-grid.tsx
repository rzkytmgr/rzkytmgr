import type { WriteupsCardType } from "@/types/global";
import { cn } from "@/utils";
import { WriteupCard } from "./writeup-card";

type WriteupsYearGroup = {
    year: number;
    items: WriteupsCardType[];
};

type WriteupsYearGridProps = Readonly<{
    items: WriteupsCardType[];
}>;

export function groupWriteupsByYear(
    items: WriteupsCardType[],
): WriteupsYearGroup[] {
    const byYear = new Map<number, WriteupsCardType[]>();

    for (const item of items) {
        const year = new Date(item.date).getFullYear();
        const group = byYear.get(year) ?? [];
        group.push(item);
        byYear.set(year, group);
    }

    return [...byYear.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(([year, groupItems]) => ({ year, items: groupItems }));
}

export function WriteupsYearGrid({ items }: WriteupsYearGridProps) {
    const groups = groupWriteupsByYear(items);

    if (groups.length === 0) {
        return null;
    }

    return (
        <div className={cn("space-y-16")}>
            {groups.map(({ year, items: groupItems }) => (
                <div
                    key={year}
                    className={cn(
                        "flex",
                        "flex-col",
                        "gap-4",
                        "sm:flex-row",
                        "sm:gap-6",
                        "lg:gap-10",
                    )}
                >
                    {}
                    <span
                        aria-hidden="true"
                        className={cn(
                            "pointer-events-none",
                            "select-none",
                            "shrink-0",
                            "font-mono",
                            "font-bold",
                            "leading-[0.8]",
                            "tracking-tighter",
                            "text-3xl",
                            "text-neutral-300/80",
                            "dark:text-neutral-800/20",
                            "sm:text-[5rem]",
                            "sm:[writing-mode:vertical-rl]",
                            "lg:text-[6.5rem]",
                        )}
                    >
                        {year}
                    </span>

                    <div
                        className={cn(
                            "relative",
                            "z-10",
                            "flex-1",
                            "grid",
                            "grid-cols-1",
                            "gap-6",
                            "md:grid-cols-2",
                            "lg:grid-cols-3",
                        )}
                    >
                        {groupItems.map((data) => (
                            <WriteupCard key={data.id} data={data} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
