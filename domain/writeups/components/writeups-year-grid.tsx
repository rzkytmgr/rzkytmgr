import { FadeUp } from "@/components/structured/fade-up";
import type { WriteupsCardType } from "@/types/global";
import { cn } from "@/utils";
import { WriteupCard } from "./writeup-card";

type WriteupsYearGridProps = Readonly<{
    items: WriteupsCardType[];
}>;

export function WriteupsYearGrid({ items }: WriteupsYearGridProps) {
    if (items.length === 0) {
        return null;
    }

    return (
        <div
            className={cn(
                "grid",
                "grid-cols-1",
                "gap-6",
                "md:grid-cols-2",
                "lg:grid-cols-3",
            )}
        >
            {items.map((data, index) => (
                <FadeUp key={data.id} delay={0.04 * index}>
                    <WriteupCard data={data} />
                </FadeUp>
            ))}
        </div>
    );
}
